import { I_ApiResponse } from '../models/api';
import { I_Owner, I_OwnerDocument } from '../models/owner';
import { callApiWrapper } from '../utils/apiCalls';

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
  return await callApiWrapper<I_OwnerDocument>({
    method: 'PATCH',
    url: `/owners/${id}`,
    token,
    datas,
    datasType: 'formData',
  });
};
