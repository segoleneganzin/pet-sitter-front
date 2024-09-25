import { I_ApiResponse } from '../interfaces/api.interface.';
import { I_Sitter, I_SitterDocument } from '../interfaces/sitter.interface';
import { callApiWrapper } from './api';

export const getAllSitters = async (): Promise<
  I_ApiResponse<I_SitterDocument[]>
> => {
  return await callApiWrapper<I_SitterDocument[]>({
    method: 'GET',
    url: '/sitters',
  });
};

export const getSitterById = async (
  id: string
): Promise<I_ApiResponse<I_SitterDocument>> => {
  return await callApiWrapper<I_SitterDocument>({
    method: 'GET',
    url: `/sitters/${id}`,
  });
};

export const getSitterByUserId = async (
  userId: string
): Promise<I_ApiResponse<I_SitterDocument>> => {
  return await callApiWrapper<I_SitterDocument>({
    method: 'GET',
    url: `/sitters/user/${userId}`,
  });
};

export const updateSitter = async ({
  id,
  datas,
  token,
}: {
  id: string;
  datas: I_Sitter;
  token: string;
}): Promise<I_ApiResponse<I_SitterDocument>> => {
  return await callApiWrapper<I_SitterDocument, I_Sitter>({
    method: 'PATCH',
    url: `/sitters/${id}`,
    token,
    datas,
    datasType: 'formData',
  });
};
