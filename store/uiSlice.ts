import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarOpen: typeof window !== 'undefined' && window.innerWidth <= 640 ? false : true,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
    },
});

export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
