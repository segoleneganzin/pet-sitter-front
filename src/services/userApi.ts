import { callApi } from './apiClient';

// Define types for function parameters
interface I_User {
  email: string;
  password: string;
  role: 'sitter' | 'owner';
}

interface I_UserLogin {
  email: string;
  password: string;
}

interface I_UserDocument extends I_User {
  id: string;
}

interface I_UserCreateData extends I_User {
  profilePicture: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  tel?: string; // sitter profile
  acceptedPets?: string | string[]; // sitter profile
  presentation?: string; // sitter profile
  pets?: string | string[]; // owner profile
}

interface I_UpdateUserData {
  email?: string;
  password?: string;
}

/**
 * Asynchronous function to perform user login via API.
 * @param {I_UserLogin} loginDatas - User's email and password.
 * @returns {Promise<object>} - Promise resolving to the API response data, return a jwt token.
 * @throws {Error} - Throws an error if email or password is missing or if login fails.
 */
export const loginUser = async (loginDatas: I_UserLogin): Promise<object> => {
  try {
    if (!loginDatas.email || !loginDatas.password) {
      throw new Error('Email and password are required');
    }
    return await callApi({
      method: 'POST',
      url: '/user/login',
      data: loginDatas,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

/**
 * Asynchronous function to create a new user.
 * @param {I_UserCreateData} datas - Data to create a new user.
 * @returns {Promise<I_UserDocument>} - Promise resolving to the API response data.
 * @throws {Error} - Throws an error if user creation fails.
 */
export const createUser = async (
  datas: I_UserCreateData
): Promise<I_UserDocument> => {
  try {
    return await callApi({
      method: 'POST',
      url: '/user',
      data: datas,
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
 * @returns {Promise<I_UserDocument>} - Promise representing the API call.
 * @throws {Error} - Throws an error if token is missing.
 */
export const getUser = async (token: string): Promise<I_UserDocument> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'GET',
      url: '/user',
      token: token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const getUserEmail = async (profileId: string): Promise<string> => {
  try {
    return await callApi({
      method: 'GET',
      url: `/user/email/${profileId}`,
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
 * @returns {Promise<I_UserDocument>} - Promise representing the API call.
 * @throws {Error} - Throws an error if token or data is missing.
 */
export const updateUser = async ({
  datas,
  token,
}: {
  datas: I_UpdateUserData;
  token: string;
}): Promise<I_UserDocument> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'PATCH',
      url: '/user',
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
export const deleteUser = async (token: string): Promise<void> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'DELETE',
      url: '/user',
      token: token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
