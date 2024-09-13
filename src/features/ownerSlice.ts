import { createSlice } from '@reduxjs/toolkit';
import {
  createThunkAction,
  handleAsyncActions,
} from '../utils/slicerFunctions';
import { getAllOwners, getOwner, updateOwner } from '../services/ownerApi';

const GET_ALL_OWNERS = 'user/getAllOwners';
const GET_OWNER = 'user/getOwner';
const UPDATE_OWNER = 'user/updateOwner';

export const getAllOwnersAsync = createThunkAction(
  GET_ALL_OWNERS,
  getAllOwners
);
export const getOwnerAsync = createThunkAction(GET_OWNER, getOwner);
export const updateOwnerAsync = createThunkAction(UPDATE_OWNER, updateOwner);

interface OwnerState {
  owners: object[];
  owner: object;
  status: string;
  error: string | null;
  updateStatus: string;
}

const initialState: OwnerState = {
  owners: [],
  // owners: JSON.parse(sessionStorage.getItem('owners')) || [],
  owner: {},
  status: 'idle',
  error: null,
  updateStatus: 'idle',
};

// Redux slice for user state management
export const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
      state.error = null;
    },
    clearSitters: (state) => {
      state.owners = [];
      state.owner = {};
      state.status = 'idle';
      state.error = null;
      state.updateStatus = 'idle';
      sessionStorage.removeItem('owners');
      sessionStorage.removeItem('owner');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, getAllOwnersAsync, 'owners', 'status');
    handleAsyncActions(builder, getOwnerAsync, 'owner', 'status');
    handleAsyncActions(builder, updateOwnerAsync, 'owner');
  },
  selectors: {
    selectOwners: (state) => state.owners,
    selectOwner: (state) => state.owner,
    selectOwnerStatus: (state) => state.status,
    selectOwnerError: (state) => state.error,
    selectOwnerUpdateStatus: (state) => state.updateStatus,
  },
});

export const { resetUpdateStatus, clearSitters } = ownerSlice.actions;

export const {
  selectOwners,
  selectOwner,
  selectOwnerStatus,
  selectOwnerError,
  selectOwnerUpdateStatus,
} = ownerSlice.selectors;

export default ownerSlice.reducer;
