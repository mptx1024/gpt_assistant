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
    const messagesToSend: OpenAIMessage[] = messages.map((message: Message) => {
        return {
            role: 'user',
            content: message.content,
        };
    });

    if (!prompt) {
        console.log('No prompt provided');
        return new Response('No prompt in the request', { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        // messages: [{ role: 'user', content: prompt }],
        messages: messagesToSend,
        temperature: 0.7,
        // top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        stream: true,
        n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
};

export default handler;
