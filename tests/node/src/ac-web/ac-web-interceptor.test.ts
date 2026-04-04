import { AcWebOnExpress } from '@autocode-ts/ac-web-on-express';
import { AcWebRoute, AcWebController, AcWebUseInterceptor, AcWebRequest, AcWebResponse, AcWebInterceptor, AcWebRequestHandlerArgs } from '@autocode-ts/ac-web';
import axios from 'axios';

class MockInterceptor extends AcWebInterceptor {
  readonly name: string;
  readonly shortCircuit: boolean;

  constructor(name: string, shortCircuit = false) {
    super();
    this.name = name;
    this.shortCircuit = shortCircuit;
  }

  async onRequest({ request }: { request: AcWebRequest }): Promise<AcWebResponse | null> {
    if (!request.internalParams) request.internalParams = {};
    if (!request.internalParams.order) request.internalParams.order = [];
    request.internalParams.order.push(`${this.name}:req`);

    if (this.shortCircuit) {
      return AcWebResponse.json({ data: { blocked: true, order: request.internalParams.order } });
    }
    return null;
  }

  async onResponse({ request, response }: { request: AcWebRequest; response: AcWebResponse }): Promise<AcWebResponse> {
    if (!request.internalParams) request.internalParams = {};
    if (!request.internalParams.order) request.internalParams.order = [];
    request.internalParams.order.push(`${this.name}:res`);
    
    // Inject the final execution order into the JSON response for validation
    if (response.content && typeof response.content.data === 'object') {
      response.content.data.finalOrder = request.internalParams.order;
    }
    return response;
  }
}

@AcWebController()
@AcWebRoute({path: '/api/intercepted'})
export class InterceptedController {
  
  @AcWebRoute({path: '/normal', method: 'GET'})
  async normalHandler(request: AcWebRequest) {
    return AcWebResponse.json({ data: { message: 'Normal' }});
  }

  @AcWebUseInterceptor({ names: ['MockRoute'] })
  @AcWebRoute({path: '/route-level', method: 'GET'})
  async routeHandler(request: AcWebRequest) {
    return AcWebResponse.json({ data: { message: 'Route' }});
  }
}

export async function testAcWebInterceptorFlow(): Promise<void> {
  console.log("Testing AcWeb Interceptor Flow...");
  const acWeb = new AcWebOnExpress();
  acWeb.port = 3002;

  // Global Interceptor
  acWeb.addInterceptor({ interceptor: new MockInterceptor('MockGlobal') });
  
  // Interceptor available for route injection
  acWeb.addInterceptor({ interceptor: new MockInterceptor('MockRoute') });
  
  // Short-circuiting Interceptor
  acWeb.addInterceptor({ interceptor: new MockInterceptor('MockBlocker', true) });

  // Manually register controller (Normally handled by auto discovery)
  acWeb.registerController({ controllerClass: InterceptedController });

  // Register an endpoint that natively uses the short circuit interceptor
  acWeb.get({
    url: '/api/intercepted/blocked',
    handler: (args: AcWebRequestHandlerArgs) => {
      return AcWebResponse.json({ data: { message: 'Should not reach' } });
    }
  });

  const startResult = await acWeb.start();
  if (!startResult.isSuccess()) {
    console.error("Server failed to start:", startResult.message);
    return;
  }

  try {
    // 1. Normal handler with only the global interceptor
    let response = await axios.get('http://localhost:3002/api/intercepted/normal');
    let resData = response.data?.data || response.data;
    if (resData.finalOrder?.join(',') === 'MockGlobal:req,MockGlobal:res') {
      console.log('Test Passed: Global Interceptor executed correctly.');
    } else {
      console.error('Test Failed: Global Interceptor flow incorrect.', response.data);
    }

    // 2. Route-level interceptor merging
    response = await axios.get('http://localhost:3002/api/intercepted/route-level');
    resData = response.data?.data || response.data;
    const order = resData.finalOrder?.join(',') || '';
    if (order === 'MockGlobal:req,MockRoute:req,MockRoute:res,MockGlobal:res') {
      console.log('Test Passed: Route Interceptor chain executed correctly.');
    } else {
      console.error('Test Failed: Route Interceptor flow incorrect.', order);
    }

    // 3. Short Circuit testing
    // Add blocker interceptor directly to the existing route dynamically
    acWeb.routeDefinitions['get>/api/intercepted/blocked'].interceptors = ['MockGlobal', 'MockBlocker'];
    
    response = await axios.get('http://localhost:3002/api/intercepted/blocked');
    resData = response.data?.data || response.data;
    const blocked = resData?.blocked;
    const finalOrder = resData.finalOrder?.join(',') || '';
    if (blocked && finalOrder === 'MockGlobal:req,MockBlocker:req,MockBlocker:res,MockGlobal:res') {
      console.log('Test Passed: Short-circuiting execution blocked route handler correctly.');
    } else {
      console.error('Test Failed: Short-circuit flow incorrect.', response.data);
    }

  } catch (err: any) {
    console.error('Test Failed: Axios Error', err.message);
  } finally {
    await acWeb.stop();
  }
}
