import { I_ApiResponse } from '../models/api';
import { I_Auth } from '../models/auth';
import { I_Owner } from '../models/owner';
import { I_Sitter } from '../models/sitter';
import { I_UserCreate, I_UserUpdate } from '../models/user';
import { callApi } from './apiClient';

interface I_CallApiWrapper {
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  url: string;
  token?: string;
  datas?: I_Sitter | I_Owner | I_UserCreate | I_UserUpdate | I_Auth;
  datasType?: 'formData' | 'object';
}

interface I_WithProfilePicture {
  profilePicture?: FileList;
}

const hasProfilePicture = (data: unknown): data is I_WithProfilePicture => {
  return typeof data === 'object' && data !== null && 'profilePicture' in data;
};

export const callApiWrapper = async <T>({
  method,
  url,
  token,
  datas,
  datasType,
}: I_CallApiWrapper): Promise<I_ApiResponse<T>> => {
  try {
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (datas && datasType === 'formData') {
      headers['Content-Type'] = 'multipart/form-data';
      const formData = new FormData();
      for (const key in datas) {
        const value = datas[key as keyof typeof datas];
        if (key !== 'profilePicture') {
          formData.append(key, value as string);
        }
      }
      if (
        hasProfilePicture(datas) &&
        datas.profilePicture &&
        datas.profilePicture.length > 0
      ) {
        formData.append('profilePicture', datas.profilePicture[0]);
      }
    }

    return await callApi<T>({
      method,
      url,
      data: datas,
      headers,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
