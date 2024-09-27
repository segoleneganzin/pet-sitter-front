import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/userSlice';
import sittersReducer from '../../features/sittersSlice';
import ownersReducer from '../../features/ownersSlice';
import authReducer from '../../features/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sitters: sittersReducer,
    owners: ownersReducer,
    auth: authReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
