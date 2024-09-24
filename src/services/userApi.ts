import { I_ApiResponse } from '../models/api';
import { I_Auth } from '../models/auth';
import { I_UserUpdate, I_UserCreate, I_UserDocument } from '../models/user';
import { callApiWrapper } from '../utils/apiCalls';

export const createUser = async (
  datas: I_UserCreate
): Promise<I_ApiResponse<I_UserDocument>> => {
  return await callApiWrapper<I_UserDocument>({
    method: 'POST',
    url: `/users`,
    datas,
    datasType: 'formData',
  });
};

export const getUserById = async (
  id: string
): Promise<I_ApiResponse<I_UserDocument>> => {
  return await callApiWrapper<I_UserDocument>({
    method: 'GET',
    url: `/users/${id}`,
  });
};

export const updateUser = async ({
  datas,
  token,
}: {
  datas: I_UserUpdate;
  token: string;
}): Promise<I_ApiResponse<I_UserDocument>> => {
  return await callApiWrapper<I_UserDocument>({
    method: 'PATCH',
    url: `/users`,
    token,
    datas,
    datasType: 'object',
  });
};

export const deleteUser = async ({
  datas,
  token,
}: {
  datas: I_Auth;
  token: string;
}): Promise<I_ApiResponse<void>> => {
  return await callApiWrapper<void>({
    method: 'DELETE',
    url: `/users`,
    token,
    datas,
    datasType: 'object',
  });
};
