// ac-http.ts
export interface IAcHttpOptions {
  url: string;
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string | number | boolean>;
  timeoutMs?: number;
  responseType?: "json" | "text" | "blob" | "arrayBuffer";
}

export interface IAcHttpDownloadOptions {
  url: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | boolean>;
  timeoutMs?: number;
  onProgress?: (loaded: number, total?: number) => void; // progress callback
}

export class AcHttp {
  private static async request<T>(method: string, options: IAcHttpOptions): Promise<T> {
    const { url, headers = {}, body, queryParams, timeoutMs, responseType = "json" } = options;

    let finalUrl = url;
    if (queryParams) {
      const queryString = new URLSearchParams(
        Object.entries(queryParams).map(([k, v]) => [k, String(v)])
      ).toString();
      finalUrl += (url.includes("?") ? "&" : "?") + queryString;
    }

    const fetchOptions: RequestInit = { method, headers: { ...headers } };
    if (body) {
      if (typeof body === "object" && !(body instanceof FormData)) {
        fetchOptions.body = JSON.stringify(body);
        fetchOptions.headers["Content-Type"] = "application/json";
      } else {
        fetchOptions.body = body;
      }
    }

    let fetchFn: typeof fetch;
    if (typeof fetch !== "undefined") {
      fetchFn = fetch;
    } else {
      const nodeFetch = await import("node-fetch");
      fetchFn = nodeFetch.default as unknown as typeof fetch;
    }

    const fetchPromise = fetchFn(finalUrl, fetchOptions).then(async (res) => {
      if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
      switch (responseType) {
        case "json":
          return res.json() as Promise<T>;
        case "text":
          return res.text() as unknown as T;
        case "blob":
          return res.blob() as unknown as T;
        case "arrayBuffer":
          return res.arrayBuffer() as unknown as T;
      }
    });

    if (timeoutMs) {
      return Promise.race([
        fetchPromise,
        new Promise<T>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
        ),
      ]);
    }

    return fetchPromise;
  }

  static get<T>(options: IAcHttpOptions): Promise<T> {
    return this.request<T>("GET", options);
  }

  static post<T>(options: IAcHttpOptions): Promise<T> {
    return this.request<T>("POST", options);
  }

  static put<T>(options: IAcHttpOptions): Promise<T> {
    return this.request<T>("PUT", options);
  }

  static patch<T>(options: IAcHttpOptions): Promise<T> {
    return this.request<T>("PATCH", options);
  }

  static delete<T>(options: IAcHttpOptions): Promise<T> {
    return this.request<T>("DELETE", options);
  }

  static head<T>(options: IAcHttpOptions): Promise<T> {
    return this.request<T>("HEAD", options);
  }

  static options<T>(options: IAcHttpOptions): Promise<T> {
    return this.request<T>("OPTIONS", options);
  }

  /**
   * Download a file with progress callback
   */
  static async download(options: IAcHttpDownloadOptions): Promise<Blob | Buffer> {
    const { url, headers = {}, queryParams, timeoutMs, onProgress } = options;

    let finalUrl = url;
    if (queryParams) {
      const queryString = new URLSearchParams(
        Object.entries(queryParams).map(([k, v]) => [k, String(v)])
      ).toString();
      finalUrl += (url.includes("?") ? "&" : "?") + queryString;
    }

    if (typeof window !== "undefined") {
      // Browser
      const res = await fetch(finalUrl, { headers });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);

      if (!res.body || !onProgress) {
        return res.blob(); // fallback if no progress
      }

      const reader = res.body.getReader();
      const contentLength = res.headers.get("Content-Length") ? parseInt(res.headers.get("Content-Length")!) : undefined;
      const chunks: Uint8Array[] = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          loaded += value.length;
          onProgress(loaded, contentLength);
        }
      }

      return new Blob(chunks);
    } else {
      // Node
      const nodeFetch = await import("node-fetch");
      const res = await nodeFetch.default(finalUrl, { headers });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);

      const contentLength = res.headers.get("content-length") ? parseInt(res.headers.get("content-length")!) : undefined;
      const reader = res.body;
      const chunks: Buffer[] = [];
      let loaded = 0;

      return new Promise<Buffer>((resolve, reject) => {
        reader.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
          loaded += chunk.length;
          if (onProgress) onProgress(loaded, contentLength);
        });
        reader.on("end", () => resolve(Buffer.concat(chunks)));
        reader.on("error", reject);
      });
    }
  }
}
