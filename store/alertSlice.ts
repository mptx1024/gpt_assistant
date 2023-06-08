import { createSlice } from '@reduxjs/toolkit';

import { addChat, removeAllChats, removeChat } from './chatsSlice';
import { removeAllRoles, removeOneRole, setOneRole } from './rolesSlice';
type AlertState = {
    message: string | null;
};

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        message: null,
    } as AlertState,

    reducers: {
        setAlert(state, action) {
            state.message = action.payload;
        },
        clearAlert(state) {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeOneRole, (state) => {
            state.message = 'Role Deleted';
        });
        builder.addCase(removeAllRoles, (state) => {
            state.message = 'All Role Records Deleted';
        });
        builder.addCase(setOneRole, (state) => {
            state.message = 'Role List Updated';
        });
        builder.addCase(addChat, (state, action) => {
            state.message = 'New Chat Created';
        });
        builder.addCase(removeChat, (state) => {
            state.message = 'Chat Deleted';
        });
        builder.addCase(removeAllChats, (state) => {
            state.message = 'All Chat Records Deleted';
        });
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
