import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/redux/slicerFunctions';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/userApi';
import {
  I_UserUpdate,
  I_User,
  I_UserDocument,
} from '../interfaces/user.interface';
import { updateLog } from '../services/authApi';
import { I_Auth } from '../interfaces/auth.interface';

const CREATE_USER = 'user/createUser';
const GET_USER = 'user/getUserById';
const UPDATE_USER = 'user/updateUser';
const UPDATE_LOG = 'user/updateLog';
const DELETE_USER = 'user/deleteUser';

export const createUserAsync = createAsyncThunk(
  CREATE_USER,
  async (datas: I_User) => {
    const response = await createUser(datas);
    return response;
  }
);
export const getUserByIdAsync = createAsyncThunk(
  GET_USER,
  async (id: string) => {
    const response = await getUserById(id);
    return response;
  }
);
export const updateUserAsync = createAsyncThunk(
  UPDATE_LOG,
  async ({ datas, token }: { datas: I_UserUpdate; token: string }) => {
    const response = await updateUser({ datas, token });
    return response;
  }
);
export const updateUserLogAsync = createAsyncThunk(
  UPDATE_USER,
  async ({ datas, token }: { datas: I_Auth; token: string }) => {
    const response = await updateLog({ datas, token });
    return response;
  }
);
export const deleteUserAsync = createAsyncThunk(
  DELETE_USER,
  async (token: string) => {
    const response = await deleteUser(token);
    sessionStorage.clear();
    return response;
  }
);

interface I_UserState {
  user: I_UserDocument | null;
  status: string;
  error: string | null;
}

const storedUser = sessionStorage.getItem('user');

const initialState: I_UserState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  status: 'idle',
  error: null,
};

// Redux slice for user state management
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearUser: (state) => {
      sessionStorage.removeItem('user');
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, createUserAsync, 'user');
    handleAsyncActions(builder, getUserByIdAsync, 'user');
    handleAsyncActions(builder, updateUserAsync, 'user');
    handleAsyncActions(builder, updateUserLogAsync, 'user');
    handleAsyncActions(builder, deleteUserAsync, 'user');
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserStatus: (state) => state.status,
    selectUserError: (state) => state.error,
  },
});

export const { resetUserStatus, clearUser } = userSlice.actions;

export const { selectUser, selectUserStatus, selectUserError } =
  userSlice.selectors;

export default userSlice.reducer;
