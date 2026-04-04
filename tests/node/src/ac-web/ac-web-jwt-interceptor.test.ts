import { AcWebOnExpress } from '@autocode-ts/ac-web-on-express';
import { AcWebRoute, AcWebController, AcWebRequest, AcWebResponse, AcWebJwtInterceptor } from '@autocode-ts/ac-web';
import axios from 'axios';
import * as crypto from 'crypto';



@AcWebController()
@AcWebRoute({path: '/api/jwt'})
export class JwtController {
  @AcWebRoute({path: '/validate', method: 'GET'})
  async validateToken(request: AcWebRequest) {
    const claims = request.internalParams?.[AcWebJwtInterceptor.claimsKey];
    return AcWebResponse.json({ data: { success: true, claims }});
  }

  @AcWebRoute({path: '/public', method: 'GET'})
  async publicRoute() {
    return AcWebResponse.json({ data: { success: true }});
  }
}

export async function testAcWebJwtInterceptor(): Promise<void> {
  console.log("Testing AcWebJwtInterceptor...");
  const acWeb = new AcWebOnExpress();
  acWeb.port = 3003;

  const secret = 'super-secret-test-key';

  // Initialize JWT Interceptor without secret first
  const jwtInterceptor = new AcWebJwtInterceptor({
    excludePaths: ['/api/jwt/public'],
  });

  // Set secret later to test setSecretKey
  jwtInterceptor.setSecretKey(secret);

  acWeb.addInterceptor({
    interceptor: jwtInterceptor
  });

  acWeb.registerController({ controllerClass: JwtController });

  const startResult = await acWeb.start();
  if (!startResult.isSuccess()) {
    console.error("Server failed to start:", startResult.message);
    return;
  }

  try {
    // 1. Should block request without auth header
    try {
      await axios.get('http://localhost:3003/api/jwt/validate');
      console.error('Test Failed: Missing authorization header was allowed.');
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        console.log('Test Passed: Missing token rejected as 401 Unauthorized.');
      } else {
        console.error('Test Failed: Unexpected response for missing token:', err.message);
      }
    }

    // 2. Should allow request to excluded path
    const publicResponse = await axios.get('http://localhost:3003/api/jwt/public');
    const pData = publicResponse.data?.data || publicResponse.data;
    if (pData?.success) {
      console.log('Test Passed: Excluded path accessed without token successfully.');
    } else {
      console.error('Test Failed: Excluded path failed.');
    }

    // 3. Should reject invalid token
    try {
      await axios.get('http://localhost:3003/api/jwt/validate', {
        headers: { Authorization: 'Bearer this.is.invalid' }
      });
      console.error('Test Failed: Invalid token was allowed.');
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        console.log('Test Passed: Invalid token rejected as 401 Unauthorized.');
      } else {
        console.error('Test Failed: Unexpected response for invalid token:', err.message);
      }
    }

    // 4. Should accept valid token and expose claims
    const validToken = AcWebJwtInterceptor.generateToken({ userId: 123, role: 'admin' }, secret);
    const validResponse = await axios.get('http://localhost:3003/api/jwt/validate', {
      headers: { Authorization: `Bearer ${validToken}` }
    });

    if (validResponse.data?.data?.success || validResponse.data?.success) {
      const claimsStr = validResponse.data?.data?.claims?.userId || validResponse.data?.claims?.userId;
      if (claimsStr === 123) {
        console.log('Test Passed: Valid JWT authenticated and claims successfully injected.');
      } else {
        console.error('Test Failed: Claims were missing or incorrect.', validResponse.data);
      }
    } else {
      console.error('Test Failed: Claims were missing or incorrect.', validResponse.data);
    }

  } catch (err: any) {
    if (err.response) {
      console.error('Test Failed: Axios Error', err.response.status, err.response.data);
    } else {
      console.error('Test Failed: Axios Error', err.message);
    }
  } finally {
    await acWeb.stop();
  }
}
