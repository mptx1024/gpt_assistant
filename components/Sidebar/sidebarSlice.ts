import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
const initialState = {
    open: true,
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.open = !state.open;
        },
    },
});

export const { toggleSidebar } = sidebarSlice.actions;

export const selectSidebar = (state: RootState) => state.sidebar.open;

export default sidebarSlice.reducer;
