import { Chat, SystemPrompt, defaultSystemPrompt, OpenAIModelID, OpenAIModels } from '@/types';
import { v4 as uuid } from 'uuid';
import { store } from '@/store';
import { setOneRole } from '@/store/rolesSlice';
import React from 'react';

/**
 * @param prompt - The prompt of the new SystemPrompt object.
 * @param title - The title of the new SystemPrompt object.
 */
export const editRole = (prompt: string, title: string, systemPrompt?: SystemPrompt): void => {
    const newRole: SystemPrompt = {
        prompt,
        role: title,
        id: uuid(),
    };
    store.dispatch(setOneRole(newRole));
};
