import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import sitterReducer from '../features/sitterSlice';
import ownerReducer from '../features/ownerSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sitter: sitterReducer,
    owner: ownerReducer,
    auth: authReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
