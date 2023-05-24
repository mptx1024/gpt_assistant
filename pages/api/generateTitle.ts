import { OpenAIModelID, OpenAIModels } from '@/types';

import type { NextApiRequest, NextApiResponse } from 'next';

interface GenerateTitleRequestBody {
    content: string;
    apiKey: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(`incoming request: ${req.method} ${req.url}`);

    const { content, apiKey } = req.body as GenerateTitleRequestBody;
    const payload = {
        model: OpenAIModels[OpenAIModelID.GPT_3_5].id,
        messages: [
            {
                role: 'user',
                content: 'Generate a title from content without any punctuation: ' + content,
            },
        ],
        max_tokens: 7,
        temperature: 0.1,
    };

    try {
        const result = await fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey ?? ''}`,
            },
            method: 'POST',
            body: JSON.stringify(payload),
        });

        const data = await result.json();
        if (!result.ok) {
            throw new Error(JSON.stringify(data, null, 2));
        }

        res.status(200).json(data);
    } catch (error: any) {
        console.log(`error: ${error}`);
        const statusCode = error.cause === 401 ? 401 : 500;
        res.status(statusCode).json(error.message);
    }
}
