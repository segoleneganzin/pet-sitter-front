import { I_Auth } from '../models/auth';
import { callApi } from './apiClient';

/**
 * Asynchronous function to perform user login via API.
 * @param {I_UserLogin} loginDatas - User's email and password.
 * @returns {Promise<object>} - Promise resolving to the API response data, return a jwt token.
 * @throws {Error} - Throws an error if email or password is missing or if login fails.
 */
export const login = async (loginDatas: I_Auth): Promise<object> => {
  try {
    console.log(loginDatas);
    if (!loginDatas.email || !loginDatas.password) {
      throw new Error('Email and password are required');
    }
    return await callApi({
      method: 'POST',
      url: '/auth/login',
      data: loginDatas,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
