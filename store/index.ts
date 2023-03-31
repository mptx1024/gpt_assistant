import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import chatsReducer from './chatsSlice';
export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        chats: chatsReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
