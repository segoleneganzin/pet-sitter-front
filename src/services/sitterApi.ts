import { I_ApiResponse } from '../models/api';
import { I_Sitter, I_SitterDocument } from '../models/sitter';
import { callApiWrapper } from '../utils/apiCalls';

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
  return await callApiWrapper<I_SitterDocument>({
    method: 'PATCH',
    url: `/sitters/${id}`,
    token,
    datas,
    datasType: 'formData',
  });
};
