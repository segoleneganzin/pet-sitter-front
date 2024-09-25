import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/redux/slicerFunctions';
import { getAllSitters } from '../services/sitterApi';
import { I_SitterDocument } from '../interfaces/sitter.interface';

const GET_ALL_SITTERS = 'user/getAllSitters';

export const getAllSittersAsync = createAsyncThunk(
  GET_ALL_SITTERS,
  async () => {
    const response = await getAllSitters();
    return response;
  }
);

interface I_SittersState {
  sitters: I_SitterDocument[];
  status: string;
  error: string | null;
}

const storedSitters = sessionStorage.getItem('sitters');

const initialState: I_SittersState = {
  sitters: storedSitters ? JSON.parse(storedSitters) : [],
  status: 'idle',
  error: null,
};

// Redux slice for user state management
export const sittersSlice = createSlice({
  name: 'sitters',
  initialState,
  reducers: {
    resetSittersStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearSitters: (state) => {
      state.sitters = [];
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('sitters');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, getAllSittersAsync, 'sitters');
  },
  selectors: {
    selectSitters: (state) => state.sitters,
    selectSittersStatus: (state) => state.status,
    selectSittersError: (state) => state.error,
  },
});

export const { resetSittersStatus, clearSitters } = sittersSlice.actions;

export const { selectSitters, selectSittersStatus, selectSittersError } =
  sittersSlice.selectors;

export default sittersSlice.reducer;
