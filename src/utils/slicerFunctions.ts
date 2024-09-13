/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

// Create a typed thunk action
export const createThunkAction = (type: string, apiFunction: any) => {
  return createAsyncThunk(type, async (params) => {
    const response = await apiFunction(params);
    return response;
  });
};

// Handle async actions and update the state accordingly
export const handleAsyncActions = (
  builder: any,
  thunk: any,
  slicer: string,
  statusKey = 'updateStatus'
) => {
  builder
    .addCase(thunk.pending, (state: any) => {
      state[statusKey] = 'loading';
      state.error = null;
    })
    .addCase(
      thunk.fulfilled,
      (state: any, action: { payload: { body: any; file: any } }) => {
        state[statusKey] = 'succeeded';
        state[slicer] = action.payload.body || action.payload.file;
        state.error = null;
        if (slicer === 'login') {
          sessionStorage.setItem('login', JSON.stringify(state.login));
        }
        if (slicer === 'user') {
          sessionStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    )
    .addCase(
      thunk.rejected,
      (state: any, action: { error: { message: string } }) => {
        state[statusKey] = 'failed';
        state.error = action.error.message || 'Unknown error';
      }
    );
};
