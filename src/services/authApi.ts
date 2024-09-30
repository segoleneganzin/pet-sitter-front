import { I_ApiResponse } from '../interfaces/api.interface.';
import { I_Auth, I_Login } from '../interfaces/auth.interface';
import { I_UserDocument } from '../interfaces/user.interface';
import { callApiWrapper } from './api';

/**
 * Asynchronous function to perform user login via API.
 * @param {I_UserLogin} loginDatas - User's email and password.
 * @returns {Promise<object>} - Promise resolving to the API response data, return a jwt token.
 * @throws {Error} - Throws an error if email or password is missing or if login fails.
 */
export const login = async (
  loginDatas: I_Auth
): Promise<I_ApiResponse<I_Login>> => {
  try {
    return await callApiWrapper<I_Login, I_Auth>({
      method: 'POST',
      url: `/auth`,
      datas: loginDatas,
      isFormData: false,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const updateLog = async ({
  datas,
  token,
}: {
  datas: I_Auth;
  token: string;
}): Promise<I_ApiResponse<I_UserDocument>> => {
  try {
    return await callApiWrapper<I_UserDocument, I_Auth>({
      method: 'PATCH',
      url: `/auth`,
      datas,
      token,
      isFormData: false,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
