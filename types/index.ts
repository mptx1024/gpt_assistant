export interface Parameters {
    temperature: number;
    apiKey?: string;
    systemPrompt?: string;
    model: string;
}

export interface Message {
    id: string;
    chatID: string;
    timestamp: number; // epoch time
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
    messages: Message[];
    title?: string | null;
    created: number;
    role: Role;
    model: OpenAIModel;
}

export interface Role {
    prompt: string;
    roleName: string;
    id: string;
}

export interface OpenAIStreamPayload {
    model: string;
    messages: OpenAIMessage[];
    temperature: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    max_tokens: number;
    stream: boolean;
    n?: number;
}

export interface OpenAIModel {
    id: string;
    name: string;
    maxLength: number; // maximum length of a message
    tokenLimit: number;
}

export enum OpenAIModelID {
    GPT_3_5 = "gpt-3.5-turbo",
    GPT_4 = "gpt-4",
}

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
    [OpenAIModelID.GPT_3_5]: {
        id: OpenAIModelID.GPT_3_5,
        name: "GPT-3.5",
        maxLength: 12000,
        tokenLimit: 3000,
    },
    [OpenAIModelID.GPT_4]: {
        id: OpenAIModelID.GPT_4,
        name: "GPT-4",
        maxLength: 24000,
        tokenLimit: 6000,
    },
};

// export interface ChatHistoryTrimmerOptions {
//     maxTokens: number;
//     nMostRecentMessages?: number;
//     preserveSystemPrompt: boolean;
//     preserveFirstUserMessage: boolean;
// }

export interface Setting {
    apiKey: string | null;
    theme?: string;
    modelSetting: {
        model: OpenAIModel;
        role: Role;
        temperature: number;
        frequency_penalty?: number;
        presence_penalty?: number;
        max_tokens: number;
    };
    chatSetting: {
        auto_name: boolean;
        attached_message_count: number;
    };
}

export const defaultSystemPrompt: Role = {
    prompt: `Respond in markdown. Current date: ${new Date().toLocaleDateString()}`,
    roleName: "default",
    id: "001",
};

export const defaultSetting: Setting = {
    apiKey: null,
    theme: "light",
    modelSetting: {
        model: OpenAIModels[OpenAIModelID.GPT_3_5],
        role: defaultSystemPrompt,
        temperature: 0.5,
        max_tokens: 1000,
    },
    chatSetting: {
        auto_name: true,
        attached_message_count: 10,
    },
};
