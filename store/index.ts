import { configureStore, isAnyOf } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
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

import roleReducer, {
    setOneRole,
    updateOneRole,
    removeOneRole,
    removeAllRoles,
    selectRoleById,
    selectAllRoles,
} from './rolesSlice';

import { listenerMiddleware, startAppListening } from './listenerMiddleware';
import { Chat, Message, SystemPrompt } from '@/types';

import * as idb from '@/utils/indexedDB';

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
            let chatsToSave: Chat[] = [];
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
            console.log('🚀 ~ file: index.ts:68 ~ effect: ~ roles:', roles);
            await idb.set('roles', roles);
        }
    },
});

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        apiKey: apiKeyReducer,
        chats: chatsReducer,
        roles: roleReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
