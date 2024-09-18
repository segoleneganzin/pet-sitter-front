export interface CallApiParams {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: object; // Optional data to send with the request
  token?: string; // Optional authentication token
  headers?: Record<string, string>; // Optional additional headers
}

// type ApiResponse<T> = Promise<T>;

export interface I_ApiResponse<T> {
  status: number;
  message: string;
  body: T;
}
