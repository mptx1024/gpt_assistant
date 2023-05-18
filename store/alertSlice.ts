import { createSlice } from '@reduxjs/toolkit';

import { setOne } from './chatsSlice';
import { removeOneRole } from './rolesSlice';
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
        builder.addCase(setOne, (state) => {
            state.message = 'New Chat Created';
        });
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
