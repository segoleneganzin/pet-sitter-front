import { I_ApiResponse } from '../interfaces/api.interface.';
import {
  I_UserUpdate,
  I_User,
  I_UserDocument,
} from '../interfaces/user.interface';
import { callApiWrapper } from './api';

export const createUser = async (
  datas: I_User
): Promise<I_ApiResponse<I_UserDocument>> => {
  return await callApiWrapper<I_UserDocument, I_User>({
    method: 'POST',
    url: `/users`,
    datas,
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
  });
};

export const deleteUser = async (
  token: string
): Promise<I_ApiResponse<void>> => {
  return await callApiWrapper<void>({
    method: 'DELETE',
    url: `/users`,
    token,
  });
};
