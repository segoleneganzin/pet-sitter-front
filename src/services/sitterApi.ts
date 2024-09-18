import { I_ApiResponse } from '../models/api';
import { I_Sitter, I_SitterDocument } from '../models/sitter';
import { callApi } from './apiClient';

export const getAllSitters = async (): Promise<
  I_ApiResponse<I_SitterDocument[]>
> => {
  try {
    return await callApi<I_SitterDocument[]>({
      method: 'GET',
      url: '/sitters',
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const getSitter = async (
  sitterId: string
): Promise<I_ApiResponse<I_SitterDocument>> => {
  try {
    return await callApi<I_SitterDocument>({
      method: 'GET',
      url: `/sitters/${sitterId}`,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const updateSitter = async ({
  sitterId,
  datas,
  token,
}: {
  sitterId: string;
  datas: I_Sitter;
  token: string;
}): Promise<I_ApiResponse<I_SitterDocument>> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    const formData = new FormData();
    for (const key in datas) {
      const value = datas[key as keyof typeof datas];
      if (key !== 'profilePicture') {
        formData.append(key, value as string);
      }
    }
    if (datas.profilePicture && datas.profilePicture.length > 0) {
      formData.append('profilePicture', datas.profilePicture[0]);
    }
    return await callApi<I_SitterDocument>({
      method: 'PATCH',
      url: `/sitters/${sitterId}`,
      data: formData,
      token: token,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
