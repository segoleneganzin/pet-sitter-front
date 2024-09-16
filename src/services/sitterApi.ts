import { I_Sitter, I_SitterDocument } from '../models/Sitter';
import { callApi } from './apiClient';

export const getAllSitters = async (): Promise<I_SitterDocument[]> => {
  try {
    return await callApi({
      method: 'GET',
      url: '/sitters',
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const getSitter = async (
  sitterId: string
): Promise<I_SitterDocument> => {
  try {
    return await callApi({
      method: 'GET',
      url: `/sitters/${sitterId}`,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const updateSitter = async ({
  sitterId,
  datas,
  token,
}: {
  sitterId: string;
  datas: I_Sitter;
  token: string;
}): Promise<I_SitterDocument> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'PATCH',
      url: `/sitters/${sitterId}`,
      data: datas,
      token: token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
