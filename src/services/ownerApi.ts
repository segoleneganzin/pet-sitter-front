import { I_ApiResponse } from '../interfaces/api.interface.';
import { I_Owner, I_OwnerDocument } from '../interfaces/owner.interface';
import { callApiWrapper } from './api';

export const getAllOwners = async (): Promise<
  I_ApiResponse<I_OwnerDocument[]>
> => {
  return await callApiWrapper<I_OwnerDocument[]>({
    method: 'GET',
    url: '/owners',
  });
};

export const getOwnerById = async (
  id: string
): Promise<I_ApiResponse<I_OwnerDocument>> => {
  return await callApiWrapper<I_OwnerDocument>({
    method: 'GET',
    url: `/owners/${id}`,
  });
};

export const getOwnerByUserId = async (
  userId: string
): Promise<I_ApiResponse<I_OwnerDocument>> => {
  return await callApiWrapper<I_OwnerDocument>({
    method: 'GET',
    url: `/owners/user/${userId}`,
  });
};

export const updateOwner = async ({
  id,
  datas,
  token,
}: {
  id: string;
  datas: I_Owner;
  token: string;
}): Promise<I_ApiResponse<I_OwnerDocument>> => {
  return await callApiWrapper<I_OwnerDocument, I_Owner>({
    method: 'PATCH',
    url: `/owners/${id}`,
    token,
    datas,
    datasType: 'formData',
  });
};
