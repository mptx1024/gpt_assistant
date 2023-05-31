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
        }

        // if (action.type === 'messages/setIsLoading' && action.payload.status === false) {
        //     const mostRecentReplyMessage =
        //         listenerApi.getState().messages.entities[action.payload.messageId];
        //     if (mostRecentReplyMessage?.isFirst) {
        //         console.log(`in middleware. ${JSON.stringify(mostRecentReplyMessage)}`);
        //         // TODO: call createTitle -> get title -> dispatch updateTitle
        //         const title = await createTitle(mostRecentReplyMessage.content);
        //         console.log('🚀 ~ file: listenerMiddleware.ts:71 ~ effect: ~ title:', title);
        //     }
        // }
        else {
            const chats: Chat[] = selectAllChats(store.getState());
            await idb.set('chats', chats);
        }
    },
});

// Autonaming chat
startAppListening({
    predicate: (action, currentState, previousState) => {
        return (
            setIsLoading.match(action) &&
            action.payload === false &&
            currentState.setting.defaultChatSetting.autoNameChat
            // && !currentState.chats.currentChat.isLoading
        );
    },
    effect: async (action, listenerApi) => {
        // console.log(
        //     `inautonaming: currentState.setting.defaultChatSetting.autoNameChat: ${
        //         listenerApi.getState().setting.defaultChatSetting.autoNameChat
        //     }`
        // );
        const mostRecentReplyMessage = selectMostRecentReplyMessage(listenerApi.getState());
        if (mostRecentReplyMessage && mostRecentReplyMessage.isFirst) {
            // console.log(
            //     `in middleware->naming. lastReplyMessage: ${JSON.stringify(mostRecentReplyMessage)}`
            // );
            const title: string = await createTitle(mostRecentReplyMessage.content);
            // console.log('🚀 ~ file: listenerMiddleware.ts:71 ~ effect: ~ title:', title);
            listenerApi.dispatch(updateChatTitle({ chatId: mostRecentReplyMessage.chatId, title }));
        }
    },
});

// Update roles in IndexedDB
startAppListening({
    matcher: isAnyOf(setOneRole, updateOneRole, removeOneRole, removeAllRoles),

    effect: async (action) => {
        if (action.type === 'roles/removeAllRoles') {
            await idb.del('roles');
        } else {
            const roles: Role[] = selectAllRoles(store.getState());
            await idb.set('roles', roles);
        }
    },
});

// Update msgs
startAppListening({
    matcher: isAnyOf(addMessage, removeMessage, removeMessageUpTo, removeChat, setIsLoading),
    effect: async (action, listenerApi) => {
        // console.log(`in middleware->updateMsg ${JSON.stringify(action)}`);

        const messages: Message[] = selectAllMessages(listenerApi.getState());
        // if (action.type === 'messages/setIsLoading' && action.playload === false) {
        //     await idb.set('messages', messages);
        // }
        await idb.set('messages', messages);
    },
});

// Routing after delete
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
