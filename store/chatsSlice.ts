import { PayloadAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import { Chat, ModelParams, Role } from '@/types';

import { addMessage } from './messagesSlice';

import type { RootState } from '.';

const chatsAdapter = createEntityAdapter<Chat>({
    selectId: (chat: Chat) => chat.id,
    sortComparer: (a, b) => b.created - a.created,
});
//TODO: fetch chats from indexedDB here
//https:redux-toolkit.js.org/api/createEntityAdapter#getinitialstate
const initialState = chatsAdapter.getInitialState({ currentChat: { id: '', isLoading: false } });

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addChat: chatsAdapter.addOne,
        setAllChats: chatsAdapter.setAll,
        updateChat: chatsAdapter.updateOne,
        removeAllChats: chatsAdapter.removeAll,

        setCurrentChat: (state, action: PayloadAction<string>) => {
            console.log(`in setCurrentChat: ${action.payload}`);
            state.currentChat.id = action.payload;
        },

        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.currentChat.isLoading = action.payload;
        },
        removeChat: (state, action: PayloadAction<string>) => {
            chatsAdapter.removeOne(state, action.payload);
            state.currentChat.id = state.ids.length > 0 ? state.ids[0].toString() : '';
            console.log(`in removeChat -> ${state.currentChat.id}; `);
        },

        removeMessageUpTo: (state, action: PayloadAction<{ messageId: string }>) => {
            const currentChat = state.entities[state.currentChat.id];
            if (currentChat) {
                const idx = currentChat.messages.indexOf(action.payload.messageId);
                if (idx !== -1) {
                    currentChat.messages.splice(idx);
                }
            }
        },
        // TODO: combine updateModelParams and updateRole
        updateModelParams: (
            state,
            action: PayloadAction<{ chatId: string; modelParams: ModelParams }>
        ) => {
            const { chatId: chatID, modelParams } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.modelParams = modelParams;
            }
        },
        updateRole: (state, action: PayloadAction<{ chatId: string; role: Role }>) => {
            const { chatId: chatID, role } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.role = role;
            }
        },
        updateChatTitle: (state, action: PayloadAction<{ chatId: string; title: string }>) => {
            const { chatId: chatID, title } = action.payload;
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
    addChat,
    updateChat,
    removeChat,
    removeAllChats,
    setAllChats,
    removeMessageUpTo,
    updateModelParams,
    updateRole,
    updateChatTitle,
    setCurrentChat,
    setIsLoading,
} = chatsSlice.actions;
export default chatsSlice.reducer;

// Selectors
export const {
    selectIds: selectChatIds,
    selectById: selectChatById,
    selectAll: selectAllChats,
} = chatsAdapter.getSelectors((state: RootState) => state.chats);

export const selectIsLoading = createSelector(
    (state: RootState) => state,
    (state: RootState) => state.chats.currentChat.isLoading
);
export const selectCurrentChat = createSelector(
    (state: RootState) => state,
    (state: RootState) => state.chats.currentChat.id,
    (state, chatId) => selectChatById(state, chatId)
);
