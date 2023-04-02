import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { startAppListening } from './listenerMiddleware';
import { Chat, Message } from '@/types';
import type { RootState } from '.';
import * as idb from '@/utils/indexedDB';

const chatsAdapter = createEntityAdapter<Chat>({
    selectId: (chat: Chat) => chat.id,
});
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
            } else {
                chatsAdapter.addOne(state, {
                    id: chatID,
                    messages: [message],
                    created: Date.now(),
                });
            }
        },
        // for streaming updates
        updateSingleMessage: (state, action: PayloadAction<{ chatID: string; chunkValue: string }>) => {
            const { chatID, chunkValue } = action.payload;
            const existingChat = state.entities[chatID];
            if (existingChat) {
                existingChat.messages[existingChat.messages.length - 1] = {
                    ...existingChat.messages[existingChat.messages.length - 1],
                    content: existingChat.messages[existingChat.messages.length - 1].content + chunkValue,
                };
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

export const { setOne, setAll, updateOne, removeOne, removeAll, addSingleMessage, updateSingleMessage, updateTitle } =
    chatsSlice.actions;
export default chatsSlice.reducer;

// Selectors
export const { selectById: selectChatById, selectAll: selectAllChats } = chatsAdapter.getSelectors(
    (state: RootState) => state.chats
);

