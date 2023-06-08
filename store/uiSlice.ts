import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarOpen: typeof window !== 'undefined' && window.innerWidth <= 640 ? false : true,
    appSettingOpen: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleAppSetting: (state) => {
            state.appSettingOpen = !state.appSettingOpen;
        },
    },

});

export const { toggleSidebar, toggleAppSetting } = uiSlice.actions;
export default uiSlice.reducer;
