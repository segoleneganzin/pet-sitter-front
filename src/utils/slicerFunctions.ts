/* eslint-disable @typescript-eslint/no-explicit-any */

import { translateErrorMessage } from './apiResponseTranslate';

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
          sessionStorage.setItem('login', JSON.stringify(action.payload.body));
        }
        if (slicer === 'user') {
          sessionStorage.setItem('user', JSON.stringify(action.payload.body));
        }
      }
    )
    .addCase(
      thunk.rejected,
      (state: any, action: { error: { message: string } }) => {
        state[statusKey] = 'failed';
        state.error =
          translateErrorMessage(action.error.message) ||
          "Une erreur s'est produite, veuillez réessayer plus tard";
      }
    );
};
