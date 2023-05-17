import { createSlice } from '@reduxjs/toolkit';

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
        // builder.addCase()
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
