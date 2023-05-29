import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { NextRequest } from 'next/server';

export async function OpenAIStream(req: NextRequest) {
    const authValue = req.headers.get('Authorization') ?? '';

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let counter = 0;
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: authValue,
        },
        method: 'POST',
        body: req.body,
    });
    if (!res.ok) {
        console.log(`In OpenAIStream: Error: ${res.status}`);
        throw new Error(res.statusText, { cause: res.status });
    }
    const stream = new ReadableStream({
        async start(controller) {
            // callback
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === 'event') {
                    // console.log(`event: ${JSON.stringify(event, null, 2)}`);

                    const data = event.data;
                    // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }
                    try {
                        const json = JSON.parse(data);
                        // console.log(`json: ${JSON.stringify(json, null, 2)}`);

                        const text = json.choices[0].delta?.content || '';
                        if (counter < 2 && (text.match(/\n/) || []).length) {
                            // this is a prefix character (i.e., "\n\n"), do nothing
                            return;
                        }
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        counter++;
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
