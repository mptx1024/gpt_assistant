import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Chat, Message, ModelParams, Role } from '@/types';

import { addMessage } from './messagesSlice';

import type { RootState } from '.';
const chatsAdapter = createEntityAdapter<Chat>({
    selectId: (chat: Chat) => chat.id,
    sortComparer: (a, b) => b.created - a.created,
});

//TODO: fetch chats from indexedDB here
//https:redux-toolkit.js.org/api/createEntityAdapter#getinitialstate
const initialState = chatsAdapter.getInitialState({ currentChatID: '' });

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addChat: chatsAdapter.addOne,
        setOne: chatsAdapter.setOne,
        setAll: chatsAdapter.setAll,
        updateOne: chatsAdapter.updateOne,
        removeAll: chatsAdapter.removeAll,

        setCurrentChat: (state, action: PayloadAction<string>) => {
            state.currentChatID = action.payload;
        },
        removeChat: (state, action: PayloadAction<string>) => {
            const chatIdToRemove = action.payload;
            state.ids = state.ids.filter((id) => id !== chatIdToRemove);
            delete state.entities[chatIdToRemove];
            state.currentChatID = state.ids.length > 0 ? state.ids[0].toString() : '';
        },

        // addSingleMessage: (state, action: PayloadAction<{ chatID: string; message: Message }>) => {
        //     const { chatID, message } = action.payload;
        //     const existingChat = state.entities[chatID];
        //     if (existingChat) {
        //         existingChat.messages = [...existingChat.messages, message];
        //     }
        // },

        // for streaming updates
        updateSingleMessage: (
            state,
            action: PayloadAction<{ chatID: string; chunkValue: string }>
        ) => {
            const { chatID, chunkValue } = action.payload;
            const chat = state.entities[chatID];
            if (chat) {
                const updatedMessages = [...chat.messages];
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                updatedMessages[updatedMessages.length - 1] = {
                    ...lastMessage,
                    content: lastMessage.content + chunkValue,
                };

                state.entities[chatID] = {
                    ...chat,
                    messages: updatedMessages,
                };
            }
        },

        // for editing a message & regenerateing reply
        removeMessageUpTo: (state, action: PayloadAction<{ message: Message }>) => {
            const { chatId: chatID, id: messageID } = action.payload.message;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                const updatedMessages: Message[] = [];
                for (let i = 0; i < existingChat.messages.length; i++) {
                    if (existingChat.messages[i].id === messageID) {
                        break;
                    }
                    updatedMessages.push(existingChat.messages[i]);
                }
                existingChat.messages = updatedMessages;
            }
        },
        // TODO: combine updateModelParams and updateRole
        updateModelParams: (
            state,
            action: PayloadAction<{ chatID: string; modelParams: ModelParams }>
        ) => {
            const { chatID, modelParams } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.modelParams = modelParams;
            }
        },
        updateRole: (state, action: PayloadAction<{ chatID: string; role: Role }>) => {
            const { chatID, role } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.role = role;
            }
        },
        updateTitle: (state, action: PayloadAction<{ chatID: string; title: string }>) => {
            const { chatID, title } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.title = title;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addMessage, (state, action) => {
            const msgId = action.payload.id;
            const chatId = action.payload.chatId;
            state.entities[chatId]?.messages.push(msgId);
        });
    },
});

export const {
    setOne,
    setAll,
    updateOne,
    removeChat,
    removeAll,
    // addSingleMessage,
    updateSingleMessage,
    removeMessageUpTo,
    updateModelParams,
    updateRole,
    updateTitle,
    setCurrentChat,
} = chatsSlice.actions;
export default chatsSlice.reducer;

// Selectors
export const { selectById: selectChatById, selectAll: selectAllChats } = chatsAdapter.getSelectors(
    (state: RootState) => state.chats
);
