import { callApi } from './apiClient';

interface I_Owner {
  profilePicture: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  pets: string[];
}

interface I_OwnerDocument extends I_Owner {
  id: string;
}

export const getAllOwners = async (): Promise<I_OwnerDocument[]> => {
  try {
    return await callApi({
      method: 'GET',
      url: '/Owners',
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const getOwner = async (ownerId: string): Promise<I_OwnerDocument> => {
  try {
    return await callApi({
      method: 'GET',
      url: `/Owners/${ownerId}`,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const updateOwner = async ({
  ownerId,
  datas,
  token,
}: {
  ownerId: string;
  datas: I_Owner;
  token: string;
}): Promise<I_OwnerDocument> => {
  try {
    if (!token) {
      throw new Error('Token is required');
    }
    return await callApi({
      method: 'PATCH',
      url: `/Owners/${ownerId}`,
      data: datas,
      token: token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
