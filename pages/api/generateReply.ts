// import { Chat, OpenAIMessage, OpenAIStreamPayload, defaultModelParams } from '@/types';
// import { chatHistoryTrimer } from '@/utils/tokenizer';
import { NextRequest, NextResponse } from 'next/server';

import { openAIStream } from '@/utils/openAIStream';

export const config = {
    runtime: 'edge',
};

const handler = async (req: NextRequest): Promise<NextResponse> => {
    console.log(`incoming request: ${req.method} ${req.url}`);

    // const { messagesToSend, isTrimSuccess } = await chatHistoryTrimer({
    //     messages: OpenAIMessages,
    //     systemPrompt: chat.role.prompt,
    //     tokenLimit: chat.modelParams.model.tokenLimit,
    // });

    // if (!isTrimSuccess) {
    //     return new Response('Trimming failed', { status: 400 });
    // }

    try {
        const stream = await openAIStream(req);
        return new NextResponse(stream);
    } catch (error: any) {
        return new NextResponse(error.message, {
            status: error.cause || 500,
        });
    }
};

export default handler;
