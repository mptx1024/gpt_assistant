import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Message } from '@/types';

import { removeChat } from './chatsSlice';

import type { RootState } from '.';

const messageAdapter = createEntityAdapter<Message>({
    selectId: (message: Message) => message.id,
});

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: messageAdapter.getInitialState(),
    reducers: {
        addMessage: messageAdapter.addOne,
        removeMessage: messageAdapter.removeOne,
        updateMessage: (
            state,
            action: PayloadAction<{ messageId: string; chunkValue: string }>
        ) => {
            const { messageId, chunkValue } = action.payload;
            const existingMessage = state.entities[messageId];
            if (existingMessage) {
                existingMessage.content += chunkValue;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeChat, (state, action) => {
            const chatId = action.payload;
            const msgIdsToRemove = Object.values(state.entities)
                .filter((message) => message && message.chatId === chatId)
                .map((message) => message!.id);
            messageAdapter.removeMany(state, msgIdsToRemove);
        });
        // builder.addCase(removeMessageUpTo, (state, action: PayloadAction<string>) => {});
    },
});

export const { addMessage, updateMessage } = messagesSlice.actions;
export default messagesSlice.reducer;

export const {
    selectIds: selectMessageIds,
    selectEntities: selectMessageEntities,
    selectById: selectMessageById,
} = messageAdapter.getSelectors((state: RootState) => state.messages);
