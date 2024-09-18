import { I_ApiResponse } from '../models/api';
import { I_Owner, I_OwnerDocument } from '../models/owner';
import { callApi } from './apiClient';

export const getAllOwners = async (): Promise<
  I_ApiResponse<I_OwnerDocument[]>
> => {
  try {
    return await callApi({
      method: 'GET',
      url: '/owners',
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const getOwner = async (
  ownerId: string
): Promise<I_ApiResponse<I_OwnerDocument>> => {
  try {
    return await callApi({
      method: 'GET',
      url: `/owners/${ownerId}`,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const updateOwner = async ({
  ownerId,
  datas,
  token,
}: {
  ownerId: string;
  datas: I_Owner;
  token: string;
}): Promise<I_ApiResponse<I_OwnerDocument>> => {
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
    return await callApi({
      method: 'PATCH',
      url: `/owners/${ownerId}`,
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
