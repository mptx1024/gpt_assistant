import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import { setOneRole, removeOneRole } from '@/store/rolesSlice';
import { SystemPrompt } from '@/types';

/**
 * Adds or edits a role with the given prompt, title, and optionally a SystemPrompt object.
 *
 * @param prompt A string representing the prompt for the role.
 * @param title A string representing the title of the role.
 * @param role An optional SystemPrompt object representing the role to edit.
 * @returns void
 */
export const addOrEditRole = (prompt: string, title: string, role?: SystemPrompt): void => {
    const newRole: SystemPrompt = {
        prompt,
        role: title,
        id: role ? role.id : uuid(),
    };
    store.dispatch(setOneRole(newRole));
};

export const deleteRole = (id: string): void => {
    store.dispatch(removeOneRole(id));
};
