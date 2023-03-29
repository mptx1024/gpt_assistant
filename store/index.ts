import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../components/Sidebar/sidebarSlice';
import chatReducer from '../features/Chat/chatSlice';
export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        chat: chatReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
