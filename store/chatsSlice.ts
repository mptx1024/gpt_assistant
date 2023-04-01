import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { Chat, Message } from '@/types';
import type { RootState } from '.';

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
    },
});

export const { setOne, setAll, updateOne, removeOne, removeAll, addSingleMessage, updateSingleMessage } =
    chatsSlice.actions;
export default chatsSlice.reducer;

// Selectors
export const { selectById: selectChatById, selectAll: selectAllChats } = chatsAdapter.getSelectors(
    (state: RootState) => state.chats
);

// reducers: {
//     setChats: (state, action: PayloadAction<Chat[]>) => {
//         for (let i = 0; i < action.payload?.length; i++) {
//             const chat = action.payload[i];
//             state.chats[chat.id] = chat;
//         }
//         console.log(`in chatSlice setChats state.chats' size: ${Object.keys(state.chats).length}`);
//     },
//     updateChatMessages: (state, action: PayloadAction<{ chatID: string; messages: Message[] }>) => {
//         console.log(`in chatSlice updateChatMessages, messages: ${JSON.stringify(action.payload.messages)}`);

//         const { chatID, messages } = action.payload;
//         if (state.chats[chatID]) {
//             state.chats[chatID].messages = messages;
//         } else {
//             state.chats[chatID] = {
//                 id: chatID,
//                 messages: messages,
//                 created: Date.now(),
//             };
//         }
//     },
// },
