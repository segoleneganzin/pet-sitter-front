import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncActions } from '../utils/slicerFunctions';
import { getOwnerByUserId, updateOwner } from '../services/ownerApi';
import { I_Owner } from '../models/owner';
import { getSitterByUserId, updateSitter } from '../services/sitterApi';
import { I_Sitter } from '../models/sitter';
import { I_ProfileDocument } from '../models/profile';

const GET_PROFILE_BY_USER_ID = 'user/getProfileByUserId';
const UPDATE_PROFILE = 'user/updateProfile';

export const getProfileByUserIdAsync = createAsyncThunk(
  GET_PROFILE_BY_USER_ID,
  async ({ userId, role }: { userId: string; role: 'sitter' | 'owner' }) => {
    //   const response =
    //   role === 'sitter'
    //     ? await getSitterByUserId(userId)
    //     : await getOwnerByUserId(userId);
    // return response;
    const getProfileByUserId =
      role === 'sitter' ? getSitterByUserId : getOwnerByUserId;

    return await getProfileByUserId(userId);
  }
);

export const updateProfileAsync = createAsyncThunk(
  UPDATE_PROFILE,
  async ({
    id,
    datas,
    token,
    role,
  }: {
    id: string;
    datas: I_Sitter | I_Owner;
    token: string;
    role: 'sitter' | 'owner';
  }) => {
    if (role === 'sitter') {
      return await updateSitter({
        id,
        datas: datas as I_Sitter,
        token,
      });
    } else {
      return await updateOwner({
        id,
        datas: datas as I_Owner,
        token,
      });
    }
  }
);

interface I_ProfileState {
  profile: I_ProfileDocument | null;
  status: string;
  error: string | null;
}

const storedProfile = sessionStorage.getItem('profile');

const initialState: I_ProfileState = {
  profile: storedProfile ? JSON.parse(storedProfile) : null,
  status: 'idle',
  error: null,
};

// Redux slice for user state management
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('profile');
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, getProfileByUserIdAsync, 'profile');
    handleAsyncActions(builder, updateProfileAsync, 'profile');
  },
  selectors: {
    selectProfile: (state) => state.profile,
    selectProfileStatus: (state) => state.status,
    selectProfileError: (state) => state.error,
  },
});

export const { resetProfileStatus, clearProfile } = profileSlice.actions;

export const { selectProfile, selectProfileStatus, selectProfileError } =
  profileSlice.selectors;

export default profileSlice.reducer;
