import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance with a base URL for the API
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface CallApiParams {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: object; // Optional data to send with the request
  token?: string; // Optional authentication token
  headers?: Record<string, string>; // Optional additional headers
}

type ApiResponse<T> = Promise<T>;

/**
 * Function to make an API call using Axios.
 * @returns {Promise<object>} - Promise resolving to response data from the API
 * @throws {Error} - Throws an error if the API call fails
 */
export const callApi = async <T>({
  method,
  url,
  data = {},
  token,
  headers = {},
}: CallApiParams): ApiResponse<T> => {
  try {
    // Add Authorization header if token is provided
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Set up request config
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers,
    };

    // Make the API call
    const response: AxiosResponse<T> = await apiClient(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
