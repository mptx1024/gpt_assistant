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
import { listenerMiddleware, startAppListening } from './listenerMiddleware';
import { Chat, Message } from '@/types';

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
        } else if (action.type === 'chats/setOne') {
            // fetch title
        } else {
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

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        chats: chatsReducer,
        apiKey: apiKeyReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
