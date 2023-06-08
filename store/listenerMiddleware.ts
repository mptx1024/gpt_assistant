import { Chat, Message, Role } from '@/types';
import * as idb from '@/utils/indexedDB';
import { addListener, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
    addChat,
    removeAllChats,
    removeChat,
    removeMessageUpTo,
    selectAllChats,
    setIsLoading,
    updateChatModelParams,
    updateChatRole,
    updateChatTitle,
} from './chatsSlice';
import {
    addMessage,
    removeMessage,
    selectAllMessages,
    selectMostRecentReplyMessage,
} from './messagesSlice';

import type { TypedAddListener, TypedStartListening } from '@reduxjs/toolkit';

import { createTitle } from '@/utils/chat';
import Router from 'next/router';
import { AppDispatch, RootState, store } from './';
import {
    removeAllRoles,
    removeOneRole,
    selectAllRoles,
    setOneRole,
    updateOneRole,
} from './rolesSlice';
import { setAppSetting } from './settingSlice';
export const listenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startAppListening = listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;

// Update chats in IndexedDB
startAppListening({
    matcher: isAnyOf(
        addChat,
        addMessage,
        removeChat,
        removeAllChats,
        updateChatTitle,
        removeMessageUpTo,
        updateChatModelParams,
        updateChatRole
    ),

    effect: async (action, listenerApi) => {
        if (removeAllChats.match(action)) {
            await idb.del('chats');
        } else {
            const chats: Chat[] = selectAllChats(store.getState());
            await idb.set('chats', chats);
        }
    },
});

// Naming chat
startAppListening({
    predicate: (action, currentState, previousState) => {
        return (
            setIsLoading.match(action) &&
            action.payload === false &&
            currentState.setting.defaultChatSetting.autoNameChat
        );
    },
    effect: async (action, listenerApi) => {
        const mostRecentReplyMessage = selectMostRecentReplyMessage(listenerApi.getState());
        if (
            mostRecentReplyMessage &&
            mostRecentReplyMessage.isFirst &&
            !mostRecentReplyMessage.isError
        ) {
            const title: string = await createTitle(mostRecentReplyMessage.content);
            listenerApi.dispatch(updateChatTitle({ chatId: mostRecentReplyMessage.chatId, title }));
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
            const roles: Role[] = selectAllRoles(listenerApi.getState());
            await idb.set('roles', roles);
        }
    },
});

// Update msgs in IndexedDB
startAppListening({
    matcher: isAnyOf(
        addMessage,
        removeMessage,
        removeMessageUpTo,
        removeChat,
        setIsLoading,
        removeAllChats
    ),
    effect: async (action, listenerApi) => {
        if (action.type === 'chats/removeAllChats') {
            await idb.del('messages');
        } else {
            const messages: Message[] = selectAllMessages(listenerApi.getState());
            await idb.set('messages', messages);
        }
    },
});

// Update setting
startAppListening({
    actionCreator: setAppSetting,
    effect: (action, listenerApi) => {
        localStorage.setItem('setting', JSON.stringify(listenerApi.getState().setting));
    },
});

// Routing after deleteing a chat
startAppListening({
    matcher: isAnyOf(removeChat, removeAllChats),
    effect: (action, listenerApi) => {
        const chatId =
            listenerApi.getState().chats.ids.length > 0
                ? listenerApi.getState().chats.ids[0]
                : null;
        if (chatId) {
            Router.push(`/chat/${chatId}`);
        } else {
            Router.push(`/chat`);
        }
    },
});
