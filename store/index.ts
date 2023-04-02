import { configureStore, isAnyOf } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import chatsReducer, {
    selectAllChats,
    removeOne,
    removeAll,
    addSingleMessage,
    updateSingleMessage,
    updateTitle,
} from './chatsSlice';
import { listenerMiddleware, startAppListening } from './listenerMiddleware';
import { Chat, Message } from '@/types';
import * as idb from '@/utils/indexedDB';

startAppListening({
    matcher: isAnyOf(removeOne, removeAll, addSingleMessage, updateSingleMessage, updateTitle),

    effect: async (action, listenerApi) => {
        const chats: Chat[] = selectAllChats(store.getState());
        console.log('🚀 ~ file: index.ts:14 ~ effect: ~ chats:', chats);
        let chatsToSave: Chat[] = [];
        for (const chatID in chats) {
            if (chats[chatID].messages.length > 0) {
                chatsToSave.push(chats[chatID]);
            }
            await idb.set('chats', chatsToSave);
            console.log('chats saved');
            const numOfChats = await idb.get('chats');
            console.log('numOfChats in db: ', numOfChats.length);
        }
    },
});
export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        chats: chatsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
