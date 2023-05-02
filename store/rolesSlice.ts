import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { Role } from '@/types';

import type { RootState } from '.';

const rolesAdapter = createEntityAdapter<Role>({
    selectId: (role: Role) => role.id,
});

const initialState = rolesAdapter.getInitialState();

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setOne: rolesAdapter.setOne,
        setAll: rolesAdapter.setAll,
        updateOne: rolesAdapter.updateOne,
        removeOne: rolesAdapter.removeOne,
        removeAll: rolesAdapter.removeAll,
    },
});

export const {
    setOne: setOneRole,
    setAll: setAllRoles,
    updateOne: updateOneRole,
    removeOne: removeOneRole,
    removeAll: removeAllRoles,
} = rolesSlice.actions;
export default rolesSlice.reducer;

//Selectors
export const { selectAll: selectAllRoles, selectById: selectRoleById } = rolesAdapter.getSelectors(
    (state: RootState) => state.roles
);
