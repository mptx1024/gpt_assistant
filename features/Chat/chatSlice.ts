import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '@/types';
import type { RootState } from '../../store';

const initialState = {
    // chats: [] as Chat[],
    messages: [] as Message[],
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
    },
});

export const { setMessages } = chatSlice.actions;
export default chatSlice.reducer;

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
