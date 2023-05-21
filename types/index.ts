export interface Message {
    id: string;
    chatId: string;
    created: number; // epoch time
    role: string;
    content: string;
}

export interface UserSubmitMessage {
    chatID: string;
    content: string;
}
export interface OpenAIMessage {
    role: string;
    content: string;
}

export interface Chat {
    id: string;
    messages: string[];
    title: string;
    created: number;
    role: Role;
    // model: OpenAIModel;
    modelParams: ModelParams;
}
export interface Role {
    prompt: string;
    roleName: string;
    id: string;
    description?: string;
}

export interface ModelParams {
    model: OpenAIModel;
    temperature: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    max_tokens: number;
    stream: boolean;
    n?: number;
}

export interface OpenAIModel {
    readonly id: string;
    readonly name: string;
    maxLength: number; // maximum length of a message
    tokenLimit: number;
}

export enum OpenAIModelID {
    GPT_3_5 = 'gpt-3.5-turbo',
    GPT_4 = 'gpt-4',
}

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
    [OpenAIModelID.GPT_3_5]: {
        id: OpenAIModelID.GPT_3_5,
        name: 'gpt-3.5-turbo',
        maxLength: 12000,
        tokenLimit: 3000,
    },
    [OpenAIModelID.GPT_4]: {
        id: OpenAIModelID.GPT_4,
        name: 'gpt-4',
        maxLength: 24000,
        tokenLimit: 6000,
    },
};

export interface OpenAIStreamPayload {
    model: string;
    messages: OpenAIMessage[];
    temperature?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    max_tokens?: number;
    stream?: boolean;
    n?: number;
}

// export interface ChatHistoryTrimmerOptions {
//     maxTokens: number;
//     nMostRecentMessages?: number;
//     preserveSystemPrompt: boolean;
//     preserveFirstUserMessage: boolean;
// }

export interface Setting {
    apiKey: string | null;
    theme?: string;
    defaultModelParams: ModelParams;
    defaultRole: Role;
    defaultChatSetting: {
        autoNameChat: boolean;
        attachedMessageCount: number;
    };
}

// export const defaultSystemRole: Role = {
//     prompt: `Respond in markdown. Current date: ${new Date().toLocaleDateString()}`,
//     roleName: 'default',
//     id: '001',
// };
export const defaultModelParams: ModelParams = {
    temperature: 0.7,
    max_tokens: 1000,
    stream: true,
    model: OpenAIModels[OpenAIModelID.GPT_3_5],
};
export const defaultSetting: Setting = {
    apiKey: '',
    defaultModelParams: defaultModelParams,
    defaultRole: {
        prompt: `You are ChatGPT, a helpful assistant. Respond in markdown. Current date: ${new Date().toLocaleDateString()}`,
        roleName: 'default',
        id: '001',
    },
    defaultChatSetting: {
        autoNameChat: true,
        attachedMessageCount: 10,
    },
};
