import { I_ApiResponse } from '../interfaces/api.interface.';
import { I_UserDocument } from '../interfaces/user.interface';
import { callApiWrapper } from './api';

export const getAllSitters = async (): Promise<
  I_ApiResponse<I_UserDocument[]>
> => {
  return await callApiWrapper<I_UserDocument[]>({
    method: 'GET',
    url: '/users/sitters',
  });
};

export const getSitterById = async (
  id: string
): Promise<I_ApiResponse<I_UserDocument>> => {
  return await callApiWrapper<I_UserDocument>({
    method: 'GET',
    url: `/users/sitters/${id}`,
  });
};
