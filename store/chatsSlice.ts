import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

import { Chat, Message, ModelParams, Role } from '@/types';

import type { RootState } from '.';

const chatsAdapter = createEntityAdapter<Chat>({
    selectId: (chat: Chat) => chat.id,
});

//TODO: fetch chats from indexedDB here
//https:redux-toolkit.js.org/api/createEntityAdapter#getinitialstate
const initialState = chatsAdapter.getInitialState();

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setOne: chatsAdapter.setOne,
        setAll: chatsAdapter.setAll,
        updateOne: chatsAdapter.updateOne,
        removeOne: chatsAdapter.removeOne,
        removeAll: chatsAdapter.removeAll,

        addSingleMessage: (state, action: PayloadAction<{ chatID: string; message: Message }>) => {
            const { chatID, message } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.messages = [...existingChat.messages, message];
            }
        },
        // for streaming updates
        updateSingleMessage: (
            state,
            action: PayloadAction<{ chatID: string; chunkValue: string }>
        ) => {
            const { chatID, chunkValue } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.messages[existingChat.messages.length - 1] = {
                    ...existingChat.messages[existingChat.messages.length - 1],
                    content:
                        existingChat.messages[existingChat.messages.length - 1].content +
                        chunkValue,
                };
            }
        },

        // for editing a message & regenerateing reply
        deleteMessageUpTo: (state, action: PayloadAction<{ message: Message }>) => {
            const { chatID, id: messageID } = action.payload.message;
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
});

export const {
    setOne,
    setAll,
    updateOne,
    removeOne,
    removeAll,
    addSingleMessage,
    updateSingleMessage,
    deleteMessageUpTo,
    updateModelParams,
    updateRole,
    updateTitle,
} = chatsSlice.actions;
export default chatsSlice.reducer;

// Selectors
export const { selectById: selectChatById, selectAll: selectAllChats } = chatsAdapter.getSelectors(
    (state: RootState) => state.chats
);
