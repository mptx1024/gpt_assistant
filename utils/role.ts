import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import { setAlert } from '@/store/alertSlice';
import { removeOneRole, setOneRole } from '@/store/rolesSlice';
import { Role } from '@/types';
/**
 * Adds or edits a role with the given prompt, title, and optionally a SystemPrompt object.
 *
 * @param prompt A string representing the prompt for the role.
 * @param roleName A string representing the title of the role.
 * @param role An optional SystemPrompt object representing the role to edit.
 * @returns void
 */
export const addOrEditRole = (prompt: string, roleName: string, role?: Role): void => {
    const newRole: Role = {
        prompt,
        roleName,
        id: role ? role.id : uuid(),
    };
    store.dispatch(setOneRole(newRole));
    // store.dispatch(setAlert(role ? 'Role Updated' : 'Role Added'));
};

export const deleteRole = (id: string): void => {
    store.dispatch(removeOneRole(id));
};
