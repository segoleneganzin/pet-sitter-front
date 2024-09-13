import { createSlice } from '@reduxjs/toolkit';
import {
  createThunkAction,
  handleAsyncActions,
} from '../utils/slicerFunctions';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../services/userApi';

const CREATE_USER = 'user/createUser';
const GET_USER = 'user/getUser';
const UPDATE_USER = 'user/updateUser';
const DELETE_USER = 'user/deleteUser';

export const createUserAsync = createThunkAction(CREATE_USER, createUser);
export const getUserAsync = createThunkAction(GET_USER, getUser);
export const updateUserAsync = createThunkAction(UPDATE_USER, updateUser);
export const deleteUserAsync = createThunkAction(DELETE_USER, deleteUser);

interface UserState {
  user: object;
  newUser: object | null;
  status: string;
  error: string | null;
  newUserStatus: string;
  updateStatus: string;
  deleteStatus: string;
}

const initialState: UserState = {
  user: {},
  // user: JSON.parse(sessionStorage.getItem('user')) || null,
  newUser: null,
  status: 'idle',
  error: null,
  newUserStatus: 'idle',
  updateStatus: 'idle',
  deleteStatus: 'idle',
};

// Redux slice for user state management
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetNewUserStatus: (state) => {
      state.newUserStatus = 'idle';
      state.error = null;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
      state.error = null;
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = 'idle';
      state.error = null;
    },
    clearUser: (state) => {
      state.user = {};
      state.status = 'idle';
      state.error = null;
      state.updateStatus = 'idle';
      state.newUserStatus = 'idle';
      state.deleteStatus = 'idle';
      sessionStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, createUserAsync, 'newUser', 'newUserStatus');
    handleAsyncActions(builder, getUserAsync, 'user', 'status');
    handleAsyncActions(builder, updateUserAsync, 'user');
    handleAsyncActions(builder, deleteUserAsync, 'deleteUser', 'deleteStatus');
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserStatus: (state) => state.status,
    selectUserError: (state) => state.error,
    selectUserUpdateStatus: (state) => state.updateStatus,
    selectNewUserStatus: (state) => state.newUserStatus,
    selectDeleteStatus: (state) => state.deleteStatus,
  },
});

export const {
  resetNewUserStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  clearUser,
} = userSlice.actions;

export const {
  selectUser,
  selectUserStatus,
  selectUserError,
  selectUserUpdateStatus,
  selectNewUserStatus,
  selectDeleteStatus,
} = userSlice.selectors;

export default userSlice.reducer;
