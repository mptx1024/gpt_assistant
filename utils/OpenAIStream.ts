import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { OpenAIMessage } from '@/types';
export type ChatGPTAgent = 'user' | 'system';

// export interface ChatGPTMessage {
//     role: ChatGPTAgent;
//     content: string;
// }

export interface OpenAIStreamPayload {
    model: string;
    // messages: ChatGPTMessage[];
    messages: OpenAIMessage[];
    temperature: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    max_tokens: number;
    stream: boolean;
    n?: number;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    //The primary purpose of the counter variable is to track the number of times the text chunks have been enqueued into the ReadableStream. The condition mentioned earlier ensures that the first two newline characters are not processed or enqueued into the stream.
    // let counter = 0;
    console.log(`payload: ${JSON.stringify(payload)}`);
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
        },
        method: 'POST',
        body: JSON.stringify(payload),
    });

    const stream = new ReadableStream({
        async start(controller) {
            // callback
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === 'event') {
                    const data = event.data;
                    // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }
                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].delta?.content || '';

                        // This condition is checking if the current text chunk contains a newline character and if the counter value is less than 2. If this condition is true, it means that the text chunk is considered a "prefix character," and the function returns without executing any further code. In this case, the "prefix character" seems to be the initial newline characters sent by the OpenAI API response.
                        // if (counter < 2 && (text.match(/\n/) || []).length) {
                        //     // this is a prefix character (i.e., "\n\n"), do nothing
                        //     return;
                        // }
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        // counter++;
                    } catch (e) {
                        // maybe parse error
                        console.log(`Error parsing JSON: ${e}`);
                        controller.error(e);
                    }
                }
            }

            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks and invoke an event for each SSE event stream
            const parser = createParser(onParse);
            // https://web.dev/streams/#asynchronous-iteration
            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });

    return stream;
}
