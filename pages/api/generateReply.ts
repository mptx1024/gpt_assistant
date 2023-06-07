// import { Chat, OpenAIMessage, OpenAIStreamPayload, defaultModelParams } from '@/types';
// import { chatHistoryTrimer } from '@/utils/tokenizer';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAIStream } from '../../utils/OpenAIStream';

export const config = {
    runtime: 'edge',
};

const handler = async (req: NextRequest): Promise<NextResponse> => {
    console.log(`incoming request: ${req.method} ${req.url}`);
    // const authValue = req.headers.get('Authorization') ?? '';

    // const { chat, OpenAIMessages, apiKey } = (await req.json()) as {
    //     chat: Chat;
    //     OpenAIMessages: OpenAIMessage[];
    //     apiKey: string;
    // };

    // if (!chat.modelParams) {
    //     chat.modelParams = defaultModelParams;
    // }
    // if (!OpenAIMessages) {
    //     console.log('No messages provided');
    //     return new Response('No messages in the request', { status: 400 });
    // }

    // const { messagesToSend, isTrimSuccess } = await chatHistoryTrimer({
    //     messages: OpenAIMessages,
    //     systemPrompt: chat.role.prompt,
    //     tokenLimit: chat.modelParams.model.tokenLimit,
    // });

    // if (!isTrimSuccess) {
    //     return new Response('Trimming failed', { status: 400 });
    // }
    // console.log(`messagesToSend: ${JSON.stringify(messagesToSend)}`);

    // const payload: OpenAIStreamPayload = {
    //     model: chat.modelParams.model.id,
    //     messages: messagesToSend,
    //     temperature: chat.modelParams.temperature,
    //     max_tokens: chat.modelParams.max_tokens,
    //     stream: true,
    // };
    // const payload: OpenAIStreamPayload = await req.json();
    try {
        const stream = await OpenAIStream(req);
        return new NextResponse(stream);
    } catch (error: any) {
        console.log(`error.message: ${error.message}; error.cause: ${error.cause};`);
        const status = error.cause === 401 ? 401 : 500;
        return new NextResponse(null, {
            status,
            statusText: error.message,
        });
    }
};

export default handler;
