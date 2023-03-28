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
        addChat: (state, action: PayloadAction<Chat>) => {
            state.chats.push(action.payload);
        },
        updateChat: (state, action: PayloadAction<Chat>) => {
            const chatIndex = state.chats.findIndex((c) => c.id === action.payload.id);
            if (chatIndex !== -1) {
                state.chats[chatIndex] = action.payload;
            }
        }

    },
});

export const { setChats } = chatsSlice.actions;

// export const setChats = (state: RootState) => state.sidebar.open;

export default chatsSlice.reducer;


/**
// example of pulling date from localStorage and setting initalState:

import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: { theme: localStorage.getItem('themeMode') ? localStorage.getItem('themeMode') : 'light' },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', state.theme);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

 * 
 * 
 */