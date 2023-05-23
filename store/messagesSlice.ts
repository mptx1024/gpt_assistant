import { PayloadAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import { Message, OpenAIMessage } from '@/types';

import { removeChat, removeMessageUpTo } from './chatsSlice';

import type { RootState } from '.';

const messageAdapter = createEntityAdapter<Message>({
    selectId: (message: Message) => message.id,
});

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: messageAdapter.getInitialState({ loading: false }),
    reducers: {
        addMessage: messageAdapter.addOne,
        setAllMessages: messageAdapter.setAll,
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
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
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
        builder.addCase(
            removeMessageUpTo,
            (state, action: PayloadAction<{ messageId: string }>) => {
                const targetMessage = state.entities[action.payload.messageId];
                if (targetMessage) {
                    const chatId = targetMessage.chatId;
                    const msgIdsToRemove = Object.values(state.entities)
                        .filter(
                            (message) =>
                                message &&
                                message.chatId === chatId &&
                                message.created >= targetMessage.created
                        )
                        .map((message) => message!.id);
                    messageAdapter.removeMany(state, msgIdsToRemove);
                }
            }
        );
    },
});

export const { addMessage, updateMessage, setAllMessages, removeMessage, setIsLoading } =
    messagesSlice.actions;
export default messagesSlice.reducer;

export const {
    selectIds: selectMessageIds,
    selectById: selectMessageById,
    selectAll: selectAllMessages,
} = messageAdapter.getSelectors((state: RootState) => state.messages);

export const selectChatMessages = createSelector(
    [(state) => Object.values(state.messages.entities) as Message[], (state, chatId) => chatId],
    (allMessages, chatId) =>
        allMessages
            .filter((message) => message.chatId === chatId)
            .map((message) => ({ role: message.role, content: message.content } as OpenAIMessage))
);
