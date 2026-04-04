import { AcWebRequest } from '../models/ac-web-request.model';
import { AcWebResponse } from '../models/ac-web-response.model';

export abstract class AcWebInterceptor {
  name: string = this.constructor.name;

  async onRequest({ request }: { request: AcWebRequest }): Promise<AcWebResponse | null> {
    return null; // Return an AcWebResponse to short-circuit, or null to continue
  }

  async onResponse({ request, response }: { request: AcWebRequest; response: AcWebResponse }): Promise<AcWebResponse> {
    return response; // Return the response or a modified one
  }
}
