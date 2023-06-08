import { defaultSetting, Setting } from '@/types';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';

const loadSettingFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const serializedSetting = localStorage.getItem('setting');
        if (serializedSetting) {
            return JSON.parse(serializedSetting);
        }
        return defaultSetting;
    }
    return null;
};

const initialState: Setting = loadSettingFromLocalStorage();

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setAppSetting: (state, action) => {
            return action.payload;
        },
    },
});

export const { setAppSetting } = settingSlice.actions;
export default settingSlice.reducer;
export const selectApiKey = (state: RootState) => state.setting.apiKey;
export const selectAppSetting = (state: RootState) => state.setting;
export const selectIsAutoNaming = (state: RootState) =>
    state.setting.defaultChatSetting.autoNameChat;
export const selectattchedMsgCount = createSelector(
    (state: RootState) => state.setting,
    (setting) => setting.defaultChatSetting.attachedMessageCount
);
