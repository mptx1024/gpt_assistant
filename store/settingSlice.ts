import { createSlice } from "@reduxjs/toolkit";

import { defaultSetting, Setting } from "@/types";

import { RootState } from ".";

const loadSettingFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const serializedSetting = localStorage.getItem("setting");
        if (serializedSetting) {
            return JSON.parse(serializedSetting);
        }
        return defaultSetting;
    }
    return null;
};

const initialState: Setting = loadSettingFromLocalStorage();

export const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setSetting: (state, action) => {
            const { type, value } = action.payload;
            if (type === "apiKey") {
                state.apiKey = value;
            } else if (type === "modelSetting") {
                state.modelSetting = value;
            } else if (type === "chatSetting") {
                state.defaultChatSetting = value;
            }
        },
    },
});

export const { setSetting } = settingSlice.actions;
export default settingSlice.reducer;
export const selectApiKey = (state: RootState) => state.setting.apiKey;
export const selectSetting = (state: RootState) => state.setting;
