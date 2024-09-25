import { I_ApiResponse } from '../interfaces/api.interface.';
import { I_Auth } from '../interfaces/auth.interface';
import {
  I_UserUpdate,
  I_UserCreate,
  I_UserDocument,
} from '../interfaces/user.interface';
import { callApiWrapper } from './api';

export const createUser = async (
  datas: I_UserCreate
): Promise<I_ApiResponse<I_UserDocument>> => {
  return await callApiWrapper<I_UserDocument, I_UserCreate>({
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
  return await callApiWrapper<I_UserDocument, I_UserUpdate>({
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
  return await callApiWrapper<void, I_Auth>({
    method: 'DELETE',
    url: `/users`,
    token,
    datas,
    datasType: 'object',
  });
};
