import { configureStore } from '@reduxjs/toolkit';

import alertSlice from './alertSlice';
import chatsReducer from './chatsSlice';
import { listenerMiddleware } from './listenerMiddleware';
import messagesReducer from './messagesSlice';
import rolesReducer from './rolesSlice';
import settingReducer from './settingSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        setting: settingReducer,
        chats: chatsReducer,
        messages: messagesReducer,
        roles: rolesReducer,
        alert: alertSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
