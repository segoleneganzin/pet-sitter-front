import axios, { AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { I_ApiResponse } from '../interfaces/api.interface.';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface I_CallApiWrapper<T> {
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  url: string;
  token?: string;
  datas?: T;
  isFormData?: boolean;
}

const buildFormData = <T extends { profilePicture?: FileList }>(
  datas: T
): FormData => {
  const formData = new FormData();
  for (const key in datas) {
    const value = datas[key as keyof T];

    if (key !== 'profilePicture') {
      if (Array.isArray(value)) {
        const joinedValue = value.join(', ');
        formData.append(key, joinedValue);
      } else if (typeof value === 'string') {
        formData.append(key, value);
      }
    }
  }
  if ('profilePicture' in datas && datas.profilePicture?.length) {
    formData.append('profilePicture', datas.profilePicture[0]);
  }

  return formData;
};

const buildHeaders = (
  token?: string,
  haveDatas?: boolean,
  isFormData?: boolean
): AxiosHeaders => {
  const headers = new AxiosHeaders();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (haveDatas && isFormData) {
    headers.set('Content-Type', 'multipart/form-data');
  }
  return headers;
};

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.message;
  }
  return error instanceof Error ? error.message : 'An unknown error occurred';
};

export const callApiWrapper = async <T, D = 'object'>({
  method,
  url,
  token,
  datas,
  isFormData = true,
}: I_CallApiWrapper<D>): Promise<I_ApiResponse<T>> => {
  try {
    const haveDatas = !!datas;
    const headers = buildHeaders(token, haveDatas, isFormData);
    const data = datas && (isFormData ? buildFormData(datas) : datas);
    // data.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    const config: AxiosRequestConfig = {
      method,
      url,
      data: data,
      headers,
    };

    const response: AxiosResponse<I_ApiResponse<T>> = await apiClient(config);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
