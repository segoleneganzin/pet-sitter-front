import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/slicerFunctions';
import { getAllOwners, getOwner, updateOwner } from '../services/ownerApi';
import { I_Owner } from '../models/owner';

const GET_ALL_OWNERS = 'user/getAllOwners';
const GET_OWNER = 'user/getOwner';
const UPDATE_OWNER = 'user/updateOwner';

export const getAllOwnersAsync = createAsyncThunk(GET_ALL_OWNERS, async () => {
  const response = await getAllOwners();
  return response;
});
export const getOwnerAsync = createAsyncThunk(GET_OWNER, async (id: string) => {
  const response = await getOwner(id);
  return response;
});
export const updateOwnerAsync = createAsyncThunk(
  UPDATE_OWNER,
  async ({
    ownerId,
    datas,
    token,
  }: {
    ownerId: string;
    datas: I_Owner;
    token: string;
  }) => {
    const response = await updateOwner({ ownerId, datas, token });
    return response;
  }
);

interface I_OwnerState {
  owners: I_Owner[];
  owner: I_Owner | null;
  status: string;
  error: string | null;
  updateStatus: string;
}

const storedOwners = sessionStorage.getItem('owners');
const storedOwner = sessionStorage.getItem('owner');

const initialState: I_OwnerState = {
  owners: storedOwners ? JSON.parse(storedOwners) : [],
  owner: storedOwner ? JSON.parse(storedOwner) : {},
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
    clearOwners: (state) => {
      state.owners = [];
      state.owner = null;
      state.status = 'idle';
      state.error = null;
      state.updateStatus = 'idle';
      sessionStorage.removeItem('owners');
      sessionStorage.removeItem('owner');
    },
    clearOwner: (state) => {
      state.owner = null;
      state.status = 'idle';
      state.error = null;
      state.updateStatus = 'idle';
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

export const { resetUpdateStatus, clearOwners, clearOwner } =
  ownerSlice.actions;

export const {
  selectOwners,
  selectOwner,
  selectOwnerStatus,
  selectOwnerError,
  selectOwnerUpdateStatus,
} = ownerSlice.selectors;

export default ownerSlice.reducer;
