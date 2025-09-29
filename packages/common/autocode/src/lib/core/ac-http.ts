/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-prototype-builtins */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { from, Observable } from "rxjs";
import { AcEnumHttpMethod } from "../enums/ac-enum-http-method.enum";
import { Autocode } from "./autocode";
import { blobToBase64 } from '@autocode-ts/ac-extensions';
import { AcEnumHttpResponseCode } from "../enums/ac-enum-http-response-code.enum";

export interface IAcHttpRequest{
  url:string,
  queryParams?: { [key: string]: string | number },
  data?:any,
  formData?:FormData
  headers?: { [key: string]: string }
}

export interface IAcHttpResponse{
  data?:any,
  status:AcEnumHttpResponseCode,
  details?:any,
}

export class AcHttp {
  static baseUrl: string = "";
  static requestInterceptor?: (params: IAcHttpRequest) => IAcHttpRequest;

  private static axiosInstance = axios.create();

  static convertObjectToFormData(
    formData: FormData,
    data: any,
    parentKey?: string
  ): void {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const formKey = parentKey ? `${parentKey}[${key}]` : key;
        const isFileType = data[key] instanceof File || data[key] instanceof Blob;
        if (typeof data[key] === "object" && !isFileType && data[key] !== null) {
          if (Object.keys(data[key]).length > 0) {
            this.convertObjectToFormData(formData, data[key], formKey);
          } else {
            formData.append(formKey, "");
          }
        } else {
          formData.append(
            formKey,
            Autocode.validValue(data[key]) ? data[key] : ""
          );
        }
      }
    }
  }

  private static async doAxios(request: IAcHttpRequest,method: AcEnumHttpMethod): Promise<IAcHttpResponse> {
    const response:IAcHttpResponse = {
      status:AcEnumHttpResponseCode.Unknown
    };
    if (this.requestInterceptor) {
      request = this.requestInterceptor(request);
    }
    request = this.processRequestParams(request);

    const config: AxiosRequestConfig = {
      url: request.url,
      method: method.toLowerCase() as any,
      headers: request.headers,
      data:
        method === AcEnumHttpMethod.Get || method === AcEnumHttpMethod.Delete
          ? undefined
          : request.formData,
    };

    try {
      const axiosResponse: AxiosResponse = await this.axiosInstance(config);
      response.status = axiosResponse.status;
      response.data = axiosResponse.data;
    } catch (err: any) {
      response.status = AcEnumHttpResponseCode.Error;
      response.details = err
    }
    return response;
  }

  // ========= Observable wrappers =========
  static requestObservable(
    request: IAcHttpRequest,
    method: AcEnumHttpMethod = AcEnumHttpMethod.Get
  ): Observable<IAcHttpResponse> {
    return from(this.doAxios(request, method));
  }

  static getObservable(request: IAcHttpRequest):Observable<IAcHttpResponse> {
    return this.requestObservable(request, AcEnumHttpMethod.Get);
  }

  static postObservable(request: IAcHttpRequest):Observable<IAcHttpResponse> {
    return this.requestObservable(request, AcEnumHttpMethod.Post);
  }

  static putObservable(request: IAcHttpRequest):Observable<IAcHttpResponse> {
    return this.requestObservable(request, AcEnumHttpMethod.Put);
  }

  static deleteObservable(request: IAcHttpRequest):Observable<IAcHttpResponse> {
    return this.requestObservable(request, AcEnumHttpMethod.Delete);
  }

  // ========= Promise wrappers =========
  static requestPromise(
    request: IAcHttpRequest,
    method: AcEnumHttpMethod = AcEnumHttpMethod.Get
  ): Promise<IAcHttpResponse> {
    return this.doAxios(request, method);
  }

  static getPromise(request: IAcHttpRequest): Promise<IAcHttpResponse> {
    return this.requestPromise(request, AcEnumHttpMethod.Get);
  }

  static postPromise(request: IAcHttpRequest): Promise<IAcHttpResponse> {
    return this.requestPromise(request, AcEnumHttpMethod.Post);
  }

  static putPromise(request: IAcHttpRequest): Promise<IAcHttpResponse> {
    return this.requestPromise(request, AcEnumHttpMethod.Put);
  }

  static deletePromise(request: IAcHttpRequest): Promise<IAcHttpResponse> {
    return this.requestPromise(request, AcEnumHttpMethod.Delete);
  }

  // ========= Utilities =========
  private static processRequestParams(
    request: IAcHttpRequest
  ): IAcHttpRequest {
    const params: IAcHttpRequest = { ...request };

    // Query params
    if (params.queryParams) {
      const queryParams: string[] = [];
      Object.keys(params.queryParams).forEach((key) => {
        queryParams.push(key + "=" + params.queryParams![key]);
      });

      if (queryParams.length > 0) {
        if (params.url.indexOf("?") < 0) {
          params.url += "?";
        }
        params.url += queryParams.join("&");
      }
    }

    // Convert data → FormData
    if (params.data) {
      if (params.formData == undefined || params.formData == null) {
        params.formData = new FormData();
      }
      this.convertObjectToFormData(params.formData, params.data);
    }

    // Prefix base URL
    if (this.baseUrl !== "") {
      if (params.url.indexOf("http") !== 0) {
        params.url = this.baseUrl + params.url;
      }
    }

    return params;
  }

  static async getFileContentAsBase64FromUrl(url: string) {
    try {
      const response = await this.axiosInstance.get(url, {
        responseType: "blob",
      });
      return await blobToBase64(response.data);
    } catch (error) {
      console.error("Error fetching file from URL:", error);
      throw error;
    }
  }
}
