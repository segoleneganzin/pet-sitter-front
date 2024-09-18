import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/slicerFunctions';
import { getAllOwners, getOwner, updateOwner } from '../services/ownerApi';
import { I_Owner, I_OwnerDocument } from '../models/owner';

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
  owners: I_OwnerDocument[];
  owner: I_OwnerDocument | null;
  status: string;
  error: string | null;
}

const storedOwners = sessionStorage.getItem('owners');
const storedOwner = sessionStorage.getItem('owner');

const initialState: I_OwnerState = {
  owners: storedOwners ? JSON.parse(storedOwners) : [],
  owner: storedOwner ? JSON.parse(storedOwner) : null,
  status: 'idle',
  error: null,
};

// Redux slice for user state management
export const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    resetOwnerStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearOwners: (state) => {
      state.owners = [];
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('owners');
    },
    clearOwner: (state) => {
      state.owner = null;
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('owner');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, getAllOwnersAsync, 'owners');
    handleAsyncActions(builder, getOwnerAsync, 'owner');
    handleAsyncActions(builder, updateOwnerAsync, 'owner');
  },
  selectors: {
    selectOwners: (state) => state.owners,
    selectOwner: (state) => state.owner,
    selectOwnerStatus: (state) => state.status,
    selectOwnerError: (state) => state.error,
  },
});

export const { resetOwnerStatus, clearOwners, clearOwner } = ownerSlice.actions;

export const {
  selectOwners,
  selectOwner,
  selectOwnerStatus,
  selectOwnerError,
} = ownerSlice.selectors;

export default ownerSlice.reducer;
