import { addListener, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { Chat, Message, Role } from '@/types';
import * as idb from '@/utils/indexedDB';

import {
    addChat,
    removeAllChats,
    removeMessageUpTo,
    selectAllChats,
    updateModelParams,
    updateRole,
    updateTitle,
} from './chatsSlice';
import { addMessage, removeMessage, selectAllMessages, setIsLoading } from './messagesSlice';
import {
    removeAllRoles,
    removeOneRole,
    selectAllRoles,
    setOneRole,
    updateOneRole,
} from './rolesSlice';

import type { TypedAddListener, TypedStartListening } from '@reduxjs/toolkit';

import { AppDispatch, RootState, store } from './';
export const listenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startAppListening = listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;

/** Update chats in IndexedDB
The effect function checks if the action type is "chats/removeAll", and if it is, it deletes all chats from IndexedDB. If the action type is anything else, it retrieves all chats from the app's state, filters out any chats with no messages, and saves the remaining chats to IndexedDB.
 */
startAppListening({
    matcher: isAnyOf(
        addChat,
        addMessage,
        removeAllChats,
        removeAllChats,
        updateTitle,
        removeMessageUpTo,
        updateModelParams,
        updateRole
    ),

    effect: async (action, listenerApi) => {
        if (action.type === 'chats/removeAllChats') {
            await idb.del('chats');
        }
        else {
            const chats: Chat[] = selectAllChats(store.getState());
            await idb.set('chats', chats);
        }
    },
});

// Update roles in IndexedDB
startAppListening({
    matcher: isAnyOf(setOneRole, updateOneRole, removeOneRole, removeAllRoles),

    effect: async (action, listenerApi) => {
        if (action.type === 'roles/removeAllRoles') {
            await idb.del('roles');
        } else {
            const roles: Role[] = selectAllRoles(store.getState());
            await idb.set('roles', roles);
        }
    },
});

startAppListening({
    matcher: isAnyOf(addMessage, removeMessage, setIsLoading),
    effect: async (action, listenerApi) => {
        const messages: Message[] = selectAllMessages(store.getState());
        // if (action.type === 'messages/setIsLoading' && action.playload === false) {
        //     await idb.set('messages', messages);
        // }
        await idb.set('messages', messages);
    },
});
