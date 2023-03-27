import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '@/types';
import type { RootState } from '../../store';

const initialState = {
    chats: [] as Chat[],
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<Chat[]>) => {
            state.chats = action.payload;
        },

    },
});

export const { setChats } = chatsSlice.actions;

// export const setChats = (state: RootState) => state.sidebar.open;

export default chatsSlice.reducer;
