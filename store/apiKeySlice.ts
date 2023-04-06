import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const initialState = {
    apiKey: typeof window !== 'undefined' ? localStorage.getItem('apiKey') : null,
};

export const apiKeySlice = createSlice({
    name: 'apiKey',
    initialState,
    reducers: {
        setApiKey: (state, action) => {
            state.apiKey = action.payload;
            localStorage.setItem('apiKey', action.payload);
        },
    },
});

export const { setApiKey } = apiKeySlice.actions;
export default apiKeySlice.reducer;
export const selectApiKey = (state: RootState) => state.apiKey.apiKey;
