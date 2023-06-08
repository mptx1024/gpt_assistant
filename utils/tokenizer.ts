import model from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { init, Tiktoken } from '@dqbd/tiktoken/lite/init';

import { OpenAIMessage } from '@/types';

// @ts-expect-error ttt
import wasm from '../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

interface chatHistoryTrimerProps {
    messages: OpenAIMessage[];
    systemPrompt: string;
    tokenLimit: number;
}

const tokenCache = new Map<string, number>();

export const chatHistoryTrimer = async (prop: chatHistoryTrimerProps) => {
    const { messages, systemPrompt, tokenLimit } = prop;

    await init((imports) => WebAssembly.instantiate(wasm, imports));

    const encoding = new Tiktoken(model.bpe_ranks, model.special_tokens, model.pat_str);
    let tokensLength = encoding.encode(systemPrompt).length;

    // count tokens 
    for (let i = 0; i < messages.length; i++) {
        if (tokenCache.has(messages[i].content)) {
            tokensLength += tokenCache.get(messages[i].content)!;
            continue;
        }
        tokensLength += encoding.encode(messages[i].content).length;
    }

    encoding.free();

    let messagesToSend: OpenAIMessage[] = [...messages];

    // trim messages
    for (let i = 0; i < messages.length && tokensLength > tokenLimit; i++) {
        if (messages[i].role === 'user') {
            continue;
        }
        messages[i].content = '';
        tokensLength -= tokenCache.get(messages[i].content)!;
    }

    const isTrimSuccess = tokensLength <= tokenLimit;
    messagesToSend = messagesToSend.filter((m) => m.content.length > 0);
    messagesToSend = [{ role: 'system', content: systemPrompt }, ...messagesToSend];

    return { messagesToSend, isTrimSuccess };
};
