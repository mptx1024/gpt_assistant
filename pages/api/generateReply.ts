import { Message, OpenAIMessage, Chat, OpenAIStreamPayload } from "@/types";
import { chatHistoryTrimer } from "@/utils/tokenizer";

import { OpenAIStream } from "../../utils/OpenAIStream";

export const config = {
    runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
    console.log(`incoming request: ${req.method} ${req.url}`);

    const { currentChat, apiKey } = (await req.json()) as { currentChat: Chat; apiKey: string };

    if (!currentChat.messages) {
        console.log("No messages provided");
        return new Response("No messages in the request", { status: 400 });
    }

    const messages: OpenAIMessage[] = currentChat.messages.map((message: Message) => {
        return {
            role: message.role,
            content: message.content,
        };
    });

    const { messagesToSend, isTrimSuccess } = await chatHistoryTrimer({
        messages,
        systemPrompt: currentChat.role.prompt,
        tokenLimit: currentChat.model.tokenLimit,
    });

    if (!isTrimSuccess) {
        console.log("Trimming failed");
        return new Response("Trimming failed", { status: 400 });
    }
    console.log(`messagesToSend: ${JSON.stringify(messagesToSend)}`);

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        // messages: [{ role: 'user', content: prompt }],
        messages: messagesToSend,
        temperature: 1,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
        max_tokens: 1000,
        stream: true,
        // n: 1,
    };

    try {
        const stream = await OpenAIStream(payload, apiKey);
        return new Response(stream);
    } catch (error: any) {
        console.log(`error.message: ${error.message}; error.cause: ${error.cause};`);
        if (error.cause === 401) {
            return new Response(null, {
                status: 401,
                statusText: error.message,
            });
        }
        return new Response(null, {
            status: 500,
            statusText: error.message,
        });
    }
};

export default handler;
