import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream';
import { Message, OpenAIMessage, Chat } from '@/types';
if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing env var from OpenAI');
}

export const config = {
    runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
    console.log(`incoming request: ${req.method} ${req.url}`);

    const { messages } = (await req.json()) as Chat;

    /* TODO: 
        1. Prepare messagesToSend (openai.ts -> createStreamingCatCompletion())
          - unshift to add system prompt??
          - trim chat with tokenizer 
    */
    // let messagesToSend: Message[] = [];

    if (!messages) {
        console.log('No messages provided');
        return new Response('No messages in the request', { status: 400 });
    }

    let messagesToSend: OpenAIMessage[] = messages.map((message: Message, index) => {
        return {
            role: message.role,
            content: message.content,
        };
    });
    messagesToSend = [
        {
            role: 'system',
            content:
                "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
        },
        ...messagesToSend,
    ];
    console.log(`messagesToSend: ${JSON.stringify(messagesToSend)}`);

    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
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

    const stream = await OpenAIStream(payload);
    return new Response(stream);
};

export default handler;
