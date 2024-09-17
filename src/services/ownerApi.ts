import { I_Owner, I_OwnerDocument } from '../models/owner';
import { callApi } from './apiClient';

export const getAllOwners = async (): Promise<I_OwnerDocument[]> => {
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

export const getOwner = async (ownerId: string): Promise<I_OwnerDocument> => {
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
}): Promise<I_OwnerDocument> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'PATCH',
      url: `/owners/${ownerId}`,
      data: datas,
      token: token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
