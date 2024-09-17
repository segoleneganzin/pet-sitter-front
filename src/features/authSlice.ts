import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../services/authApi';
import { handleAsyncActions } from '../utils/slicerFunctions';
import { I_Auth } from '../models/auth';

const POST_LOGIN = 'auth/login';

export const loginAsync = createAsyncThunk(
  POST_LOGIN,
  async (loginDatas: I_Auth) => {
    const response = await login(loginDatas);
    return response;
  }
);

interface I_AuthState {
  token: string | null;
  status: string;
  error: string | null;
}

const storedToken = sessionStorage.getItem('token');

const initialState: I_AuthState = {
  token: storedToken ? JSON.parse(storedToken) : null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, loginAsync, 'token', 'status');
  },
  selectors: {
    selectToken: (state) => state.token,
    selectAuthStatus: (state) => state.status,
    selectAuthError: (state) => state.error,
  },
});

export const { logout } = authSlice.actions;
export const { selectToken, selectAuthStatus, selectAuthError } =
  authSlice.selectors;

export default authSlice.reducer;
