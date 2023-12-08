import { configureStore } from "@reduxjs/toolkit";

import petsReducer from "./pets.slice";

export const store = configureStore({
  reducer: {
    pets: petsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
