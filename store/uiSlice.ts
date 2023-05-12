import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebar: true,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
    },
});

export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
