import { createSlice } from '@reduxjs/toolkit';
import {
  createThunkAction,
  handleAsyncActions,
} from '../utils/slicerFunctions';
import { getAllSitters, getSitter, updateSitter } from '../services/sitterApi';

const GET_ALL_SITTERS = 'user/getAllSitters';
const GET_SITTER = 'user/getSitter';
const UPDATE_SITTER = 'user/updateSitter';

export const getAllSittersAsync = createThunkAction(
  GET_ALL_SITTERS,
  getAllSitters
);
export const getSitterAsync = createThunkAction(GET_SITTER, getSitter);
export const updateSitterAsync = createThunkAction(UPDATE_SITTER, updateSitter);

interface SitterState {
  sitters: object[];
  sitter: object;
  status: string;
  error: string | null;
  updateStatus: string;
}

const initialState: SitterState = {
  sitters: [],
  // sitters: JSON.parse(sessionStorage.getItem('sitters')) || [],
  sitter: {},
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
      state.sitter = {};
      state.status = 'idle';
      state.error = null;
      state.updateStatus = 'idle';
      sessionStorage.removeItem('sitters');
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

export const { resetUpdateStatus, clearSitters } = sitterSlice.actions;

export const {
  selectSitters,
  selectSitter,
  selectSitterStatus,
  selectSitterError,
  selectSitterUpdateStatus,
} = sitterSlice.selectors;

export default sitterSlice.reducer;
