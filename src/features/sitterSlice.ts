import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/slicerFunctions';
import { getAllSitters, getSitter, updateSitter } from '../services/sitterApi';
import { I_Sitter, I_SitterDocument } from '../models/sitter';

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
  sitters: I_SitterDocument[];
  sitter: I_SitterDocument | null;
  status: string;
  error: string | null;
}

const storedSitters = sessionStorage.getItem('sitters');
const storedSitter = sessionStorage.getItem('sitter');

const initialState: I_SitterState = {
  sitters: storedSitters ? JSON.parse(storedSitters) : [],
  sitter: storedSitter ? JSON.parse(storedSitter) : null,
  status: 'idle',
  error: null,
};

// Redux slice for user state management
export const sitterSlice = createSlice({
  name: 'sitter',
  initialState,
  reducers: {
    resetSitterStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearSitters: (state) => {
      state.sitters = [];
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('sitters');
    },
    clearSitter: (state) => {
      state.sitter = null;
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('sitter');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, getAllSittersAsync, 'sitters');
    handleAsyncActions(builder, getSitterAsync, 'sitter');
    handleAsyncActions(builder, updateSitterAsync, 'sitter');
  },
  selectors: {
    selectSitters: (state) => state.sitters,
    selectSitter: (state) => state.sitter,
    selectSitterStatus: (state) => state.status,
    selectSitterError: (state) => state.error,
  },
});

export const { resetSitterStatus, clearSitters, clearSitter } =
  sitterSlice.actions;

export const {
  selectSitters,
  selectSitter,
  selectSitterStatus,
  selectSitterError,
} = sitterSlice.selectors;

export default sitterSlice.reducer;
