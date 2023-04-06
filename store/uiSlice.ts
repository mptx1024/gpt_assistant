import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    sidebar: true,
    settingModal: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
        toggleSettingModal: (state) => {
            state.settingModal = !state.settingModal;
        },
    },
});

export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
