import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/slicerFunctions';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../services/userApi';
import { I_UserUpdate, I_UserCreate, I_UserDocument } from '../models/user';

const CREATE_USER = 'user/createUser';
const GET_USER = 'user/getUser';
const UPDATE_USER = 'user/updateUser';
const DELETE_USER = 'user/deleteUser';

export const createUserAsync = createAsyncThunk(
  CREATE_USER,
  async (datas: I_UserCreate) => {
    const response = await createUser(datas);
    return response;
  }
);
export const getUserAsync = createAsyncThunk(
  GET_USER,
  async (token: string) => {
    const response = await getUser(token);
    return response;
  }
);
export const updateUserAsync = createAsyncThunk(
  UPDATE_USER,
  async ({ datas, token }: { datas: I_UserUpdate; token: string }) => {
    const response = await updateUser({ datas, token });
    return response;
  }
);
export const deleteUserAsync = createAsyncThunk(
  DELETE_USER,
  async (token: string) => {
    const response = await deleteUser(token);
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
      state.user = null;
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, createUserAsync, 'user');
    handleAsyncActions(builder, getUserAsync, 'user');
    handleAsyncActions(builder, updateUserAsync, 'user');
    handleAsyncActions(builder, deleteUserAsync, 'user');
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserStatus: (state) => state.status,
    selectUserError: (state) => state.error,
  },
});

export const {
  resetUserStatus,
  // resetNewUserStatus,
  // resetDeleteStatus,
  clearUser,
} = userSlice.actions;

export const {
  selectUser,
  selectUserStatus,
  selectUserError,
  // selectNewUserStatus,
  // selectDeleteStatus,
} = userSlice.selectors;

export default userSlice.reducer;
