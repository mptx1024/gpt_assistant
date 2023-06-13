import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { NextRequest } from 'next/server';

export async function openAIStream(req: NextRequest) {
    const authValue = req.headers.get('Authorization') ?? '';
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: authValue,
        },
        method: 'POST',
        body: req.body,
        signal: AbortSignal.timeout(3 * 60 * 1000),
    });
    if (!res.ok) {
        // console.log(`${res.statusText} ${res.status}`);
        const extraInfo = await res.clone().text();
        throw new Error(extraInfo, { cause: res.status });
    }
    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === 'event') {
                    const data = event.data;
                    // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }
                    const json = JSON.parse(data);

                    const text = json.choices[0].delta?.content || '';
                    // console.log(
                    //     `${JSON.stringify(text, null, 2)}`
                    // );
                    const queue = encoder.encode(text);
                    controller.enqueue(queue);
                }
            }

            const parser = createParser(onParse);
            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });

    return stream;
}
