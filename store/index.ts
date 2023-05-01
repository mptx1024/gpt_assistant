import { configureStore, isAnyOf } from '@reduxjs/toolkit';

import { Chat, SystemPrompt } from '@/types';
import * as idb from '@/utils/indexedDB';

import apiKeyReducer from './apiKeySlice';
import chatsReducer, {
    selectAllChats,
    removeOne,
    removeAll,
    addSingleMessage,
    updateSingleMessage,
    updateTitle,
    deleteMessageUpTo,
    setOne,
} from './chatsSlice';
import { listenerMiddleware, startAppListening } from './listenerMiddleware';
import rolesReducer, { setOneRole, updateOneRole, removeOneRole, removeAllRoles, selectAllRoles } from './rolesSlice';
import uiReducer from './uiSlice';

startAppListening({
    matcher: isAnyOf(
        setOne,
        removeOne,
        removeAll,
        addSingleMessage,
        updateSingleMessage,
        updateTitle,
        deleteMessageUpTo
    ),

    effect: async (action, listenerApi) => {
        if (action.type === 'chats/removeAll') {
            await idb.del('chats');
        }
        // else if (action.type === 'chats/setOne') {
        //     //
        // }
        else {
            const chats: Chat[] = selectAllChats(store.getState());
            const chatsToSave: Chat[] = [];
            for (const chatID in chats) {
                if (chats[chatID].messages.length > 0) {
                    chatsToSave.push(chats[chatID]);
                }
                await idb.set('chats', chatsToSave);
            }
        }
    },
});

startAppListening({
    matcher: isAnyOf(setOneRole, updateOneRole, removeOneRole, removeAllRoles),

    effect: async (action, listenerApi) => {
        if (action.type === 'roles/removeAll') {
            await idb.del('roles');
        } else {
            const roles: SystemPrompt[] = selectAllRoles(store.getState());
            await idb.set('roles', roles);
        }
    },
});

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        apiKey: apiKeyReducer,
        chats: chatsReducer,
        roles: rolesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
