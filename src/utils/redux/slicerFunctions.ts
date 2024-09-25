/* eslint-disable @typescript-eslint/no-explicit-any */

import { translateMessage } from '../responseTranslate';

// Handle async actions and update the state accordingly
export const handleAsyncActions = (
  builder: any,
  thunk: any,
  slicer: string,
  statusKey = 'status'
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
        state[slicer] = action.payload.body || action.payload.file || null;
        state.error = null;
        if (slicer !== 'auth') {
          sessionStorage.setItem(slicer, JSON.stringify(action.payload.body));
        }
      }
    )
    .addCase(
      thunk.rejected,
      (state: any, action: { error: { message: string } }) => {
        state[statusKey] = 'failed';
        state.error =
          translateMessage(action.error.message) ||
          "Une erreur s'est produite, veuillez réessayer plus tard";
      }
    );
};
