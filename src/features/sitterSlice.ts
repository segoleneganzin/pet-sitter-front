import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/slicerFunctions';
import { getAllSitters, getSitter, updateSitter } from '../services/sitterApi';
import { I_Sitter } from '../models/Sitter';

const GET_ALL_SITTERS = 'user/getAllSitters';
const GET_SITTER = 'user/getSitter';
const UPDATE_SITTER = 'user/updateSitter';

export const getAllSittersAsync = createAsyncThunk(
  GET_ALL_SITTERS,
  async () => {
    const response = await getAllSitters();
    return response;
  }
);
export const getSitterAsync = createAsyncThunk(
  GET_SITTER,
  async (id: string) => {
    const response = await getSitter(id);
    return response;
  }
);
export const updateSitterAsync = createAsyncThunk(
  UPDATE_SITTER,
  async ({
    sitterId,
    datas,
    token,
  }: {
    sitterId: string;
    datas: I_Sitter;
    token: string;
  }) => {
    const response = await updateSitter({ sitterId, datas, token });
    return response;
  }
);

interface I_SitterState {
  sitters: I_Sitter[];
  sitter: I_Sitter | null;
  status: string;
  error: string | null;
  updateStatus: string;
}

const storedSitters = sessionStorage.getItem('sitters');
const storedSitter = sessionStorage.getItem('sitter');

const initialState: I_SitterState = {
  sitters: storedSitters ? JSON.parse(storedSitters) : [],
  sitter: storedSitter ? JSON.parse(storedSitter) : null,
  status: 'idle',
  error: null,
  updateStatus: 'idle',
};

// Redux slice for user state management
export const sitterSlice = createSlice({
  name: 'sitter',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
      state.error = null;
    },
    clearSitters: (state) => {
      state.sitters = [];
      state.sitter = null;
      state.status = 'idle';
      state.error = null;
      state.updateStatus = 'idle';
      sessionStorage.removeItem('sitters');
      sessionStorage.removeItem('sitter');
    },
    clearSitter: (state) => {
      state.sitter = null;
      state.status = 'idle';
      state.error = null;
      state.updateStatus = 'idle';
      sessionStorage.removeItem('sitter');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, getAllSittersAsync, 'sitters', 'status');
    handleAsyncActions(builder, getSitterAsync, 'sitter', 'status');
    handleAsyncActions(builder, updateSitterAsync, 'sitter');
  },
  selectors: {
    selectSitters: (state) => state.sitters,
    selectSitter: (state) => state.sitter,
    selectSitterStatus: (state) => state.status,
    selectSitterError: (state) => state.error,
    selectSitterUpdateStatus: (state) => state.updateStatus,
  },
});

export const { resetUpdateStatus, clearSitters, clearSitter } =
  sitterSlice.actions;

export const {
  selectSitters,
  selectSitter,
  selectSitterStatus,
  selectSitterError,
  selectSitterUpdateStatus,
} = sitterSlice.selectors;

export default sitterSlice.reducer;
