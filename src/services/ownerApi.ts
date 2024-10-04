import { I_ApiResponse } from '../interfaces/api.interface.';
import { I_UserDocument } from '../interfaces/user.interface';
import { callApiWrapper } from './api';

export const getAllOwners = async (): Promise<
  I_ApiResponse<I_UserDocument[]>
> => {
  return await callApiWrapper<I_UserDocument[]>({
    method: 'GET',
    url: '/users/owners',
  });
};

export const getOwnerById = async (
  id: string
): Promise<I_ApiResponse<I_UserDocument>> => {
  return await callApiWrapper<I_UserDocument>({
    method: 'GET',
    url: `/users/owners/${id}`,
  });
};
