export default {
    chats: [
        {
            id: 'dbfc73a4-b873-493f-9fe6-4de3dee86e3d',
            messages: [
                '7e75cf0c-3020-454c-b8b6-1c7de4896353',
                'e275decb-60fb-4c2a-bd44-2db70f43a055',
            ],
            title: 'Hello World',
            created: 1686185465972,
            role: {
                prompt: 'You are ChatGPT, a helpful assistant. Respond in markdown. Current date: 6/7/2023',
                roleName: 'default',
                id: '001',
            },
            modelParams: {
                temperature: 0.7,
                max_tokens: 1000,
                stream: true,
                model: {
                    id: 'gpt-3.5-turbo',
                    name: 'gpt-3.5-turbo',
                    maxLength: 12000,
                    tokenLimit: 3000,
                },
            },
        },
        {
            id: 'cb9f7f2d-a818-4662-ac0d-1d61c152c108',
            messages: [
                'bdbcb0ad-b5ff-43f5-8f6e-b63a369e900d',
                'b886c204-5f40-47b4-8c8c-5b674eaedbe4',
            ],
            title: 'Meaning of Life',
            created: 1686183529907,
            role: {
                prompt: 'You are ChatGPT, a helpful assistant. Respond in markdown. Current date: 6/7/2023',
                roleName: 'default',
                id: '001',
            },
            modelParams: {
                temperature: 0.7,
                max_tokens: 1000,
                stream: true,
                model: {
                    id: 'gpt-3.5-turbo',
                    name: 'gpt-3.5-turbo',
                    maxLength: 12000,
                    tokenLimit: 3000,
                },
            },
        },
    ],
    messages: [
        {
            id: '7e75cf0c-3020-454c-b8b6-1c7de4896353',
            chatId: 'dbfc73a4-b873-493f-9fe6-4de3dee86e3d',
            created: 1686185853801,
            role: 'user',
            content: 'write a hello world in python',
        },
        {
            id: 'e275decb-60fb-4c2a-bd44-2db70f43a055',
            chatId: 'dbfc73a4-b873-493f-9fe6-4de3dee86e3d',
            created: 1686185853801,
            role: 'assistant',
            content:
                'Sure! Here\'s a simple "Hello, World!" program in Python:\n\n```python\nprint("Hello, World!")\n```\n\nWhen you run this code, the output should be:\n\n```\nHello, World!\n```',
            isFirst: true,
            isError: true,
        },
        {
            id: 'bdbcb0ad-b5ff-43f5-8f6e-b63a369e900d',
            chatId: 'cb9f7f2d-a818-4662-ac0d-1d61c152c108',
            created: 1686187553010,
            role: 'user',
            content: "what's the meaning of life? list three schools of thought",
        },
        {
            id: 'b886c204-5f40-47b4-8c8c-5b674eaedbe4',
            chatId: 'cb9f7f2d-a818-4662-ac0d-1d61c152c108',
            created: 1686187553010,
            role: 'assistant',
            content:
                'The meaning of life is a philosophical question that has been debated for centuries. There are different perspectives on what the meaning of life is, and here are three major schools of thought:\n\n1. **Religious perspective:** Many religions believe that the meaning of life is to fulfill a divine purpose or plan. For example, Christianity holds that the meaning of life is to serve and glorify God, while Buddhism teaches that the meaning of life is to achieve enlightenment and end the cycle of suffering.\n\n2. **Existential perspective:** This perspective suggests that the meaning of life is subjective and unique to each individual. According to existentialism, humans are free to create their own meaning in life based on their experiences, values, and choices. \n\n3. **Scientific perspective:** This perspective suggests that life has no inherent meaning or purpose. According to scientific naturalism, life is a result of biological and physical processes that are driven by natural selection and chance. Therefore, humans must create their own meaning and purpose in life.',
            isFirst: false,
            isError: true,
        },
    ],
    roles: [
        {
            prompt: 'I want you to act as a software developer. i will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with golang and angular. ',
            roleName: 'Fullstack Software Developer',
            id: '3d5ca919-f149-484c-afce-bce692651c51',
        },
    ],
};
