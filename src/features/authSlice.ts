import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../services/authApi';
import { handleAsyncActions } from '../utils/redux/slicerFunctions';
import { I_Auth } from '../interfaces/auth.interface';

const POST_LOGIN = 'auth/login';

export const loginAsync = createAsyncThunk(
  POST_LOGIN,
  async (loginDatas: I_Auth) => {
    const response = await login(loginDatas);
    return response;
  }
);

interface I_AuthState {
  login: { token: string } | null;
  status: string;
  error: string | null;
}

const storedLogin = sessionStorage.getItem('login');

const initialState: I_AuthState = {
  login: storedLogin ? JSON.parse(storedLogin) : null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.login = null;
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('login');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, loginAsync, 'login', 'status');
  },
  selectors: {
    selectLogin: (state) => state.login,
    selectAuthStatus: (state) => state.status,
    selectAuthError: (state) => state.error,
  },
});

export const { logout } = authSlice.actions;
export const { selectLogin, selectAuthStatus, selectAuthError } =
  authSlice.selectors;

export default authSlice.reducer;
