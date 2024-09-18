import { I_ApiResponse } from '../models/api';
import { I_UserUpdate, I_UserCreate, I_UserDocument } from '../models/user';
import { callApi } from './apiClient';

/**
 * Asynchronous function to create a new user.
 * @param {I_UserCreate} datas - Data to create a new user.
 * @returns {Promise<I_ApiResponse>} - Promise resolving to the API response data.
 * @throws {Error} - Throws an error if user creation fails.
 */
export const createUser = async (
  datas: I_UserCreate
): Promise<I_ApiResponse<I_UserDocument>> => {
  try {
    const formData = new FormData();
    for (const key in datas) {
      const value = datas[key as keyof typeof datas];
      if (key !== 'profilePicture') {
        formData.append(key, value as string);
      }
    }
    if (datas.profilePicture && datas.profilePicture.length > 0) {
      formData.append('profilePicture', datas.profilePicture[0]);
    }
    return await callApi({
      method: 'POST',
      url: '/users',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

/**
 * Asynchronous function to get user information.
 * @param {string} token
 * @returns {Promise<I_ApiResponse>} - Promise representing the API call.
 * @throws {Error} - Throws an error if token is missing.
 */
export const getUser = async (
  token: string
): Promise<I_ApiResponse<I_UserDocument>> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'GET',
      url: '/users',
      token: token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

/**
 * Asynchronous function to update user information.
 * @param {UpdateUserData & string} param - Object containing data to update and user token.
 * @returns {Promise<I_ApiResponse>} - Promise representing the API call.
 * @throws {Error} - Throws an error if token or data is missing.
 */
export const updateUser = async ({
  datas,
  token,
}: {
  datas: I_UserUpdate;
  token: string;
}): Promise<I_ApiResponse<I_UserDocument>> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'PATCH',
      url: '/users',
      data: datas,
      token: token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

/**
 * Asynchronous function to delete a user.
 * @param {string} token
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if token or data is missing.
 */
export const deleteUser = async (
  token: string
): Promise<I_ApiResponse<void>> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'DELETE',
      url: '/users',
      token: token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const getUserEmail = async (
  profileId: string
): Promise<I_ApiResponse<{ email: string }>> => {
  try {
    return await callApi({
      method: 'GET',
      url: `/users/${profileId}`,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
