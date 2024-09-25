import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/redux/slicerFunctions';
import { getAllOwners } from '../services/ownerApi';
import { I_OwnerDocument } from '../interfaces/owner.interface';

const GET_ALL_OWNERS = 'user/getAllOwners';

export const getAllOwnersAsync = createAsyncThunk(GET_ALL_OWNERS, async () => {
  const response = await getAllOwners();
  return response;
});

interface I_OwnersState {
  owners: I_OwnerDocument[];
  status: string;
  error: string | null;
}

const storedOwners = sessionStorage.getItem('owners');

const initialState: I_OwnersState = {
  owners: storedOwners ? JSON.parse(storedOwners) : [],
  status: 'idle',
  error: null,
};

// Redux slice for user state management
export const ownersSlice = createSlice({
  name: 'owners',
  initialState,
  reducers: {
    resetOwnersStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearOwners: (state) => {
      state.owners = [];
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('owners');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, getAllOwnersAsync, 'owners');
  },
  selectors: {
    selectOwners: (state) => state.owners,
    selectOwnersStatus: (state) => state.status,
    selectOwnersError: (state) => state.error,
  },
});

export const { resetOwnersStatus, clearOwners } = ownersSlice.actions;

export const { selectOwners, selectOwnersStatus, selectOwnersError } =
  ownersSlice.selectors;

export default ownersSlice.reducer;
