import * as idb from '@/utils/indexedDB';
import { v4 as uuid } from 'uuid';
import { Chat, Message, UserSubmitMessage } from '@/types';
import { RootState, AppDispatch, store } from '@/store';
import {
    setAll,
    setOne,
    selectChatById,
    selectAllChats,
    addSingleMessage,
    updateSingleMessage,
} from '@/store/chatsSlice';

export class ChatManager {
    public loaded = false;
    public activeReply: string = '';

    constructor() {
        // this.load();
    }

    public async generateReply(userInput: UserSubmitMessage) {
        const { chatID, content } = userInput;
        const userMessage: Message = {
            id: uuid(),
            chatID,
            timestamp: Date.now(),
            role: 'user',
            content: content,
        };
        store.dispatch(addSingleMessage({ chatID, message: userMessage }));

        const currentChat = selectChatById(store.getState(), chatID);
        console.log('🚀 ~ file: chatManager.ts:35 ~ ChatManager ~ generateReply ~ currentChat:', currentChat);

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentChat),
        });

        if (!response.ok) {
            console.log(`woops.. ${response.statusText}`);
            throw new Error(response.statusText);
        }

        let reply: Message = {
            id: uuid(),
            chatID: chatID,
            timestamp: Date.now(),
            role: 'assistant',
            content: '',
        };
        store.dispatch(addSingleMessage({ chatID, message: reply }));

        // This data is a ReadableStream
        const data: ReadableStream<Uint8Array> | undefined | null = response.body;
        if (!data) {
            throw new Error('Server error');
        }
        const reader: ReadableStreamDefaultReader<Uint8Array> = data?.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);

            store.dispatch(updateSingleMessage({ chatID, chunkValue }));
        }

        // await this.save();
    }

    // public createChat(): string {
    //     const chat: Chat = {
    //         id: uuid(),
    //         messages: [],
    //         created: Date.now(),
    //     };
    //     store.dispatch(setOne(chat));
    //     return chat.id;
    // }

    public stopGenerating() {}
    public async regenerate() {}

    // private async load() {
    //     const chats: Chat[] = await idb.get('chats');

    //     // if (chats) {
    //     //     store.dispatch(setAll(chats));
    //     // }
    //     this.loaded = true;
    // }

    // save all chats to indexedDB
    // private async save() {
    //     const chats = selectAllChats(store.getState());
    //     let chatsToSave: Chat[] = [];
    //     for (const chatID in chats) {
    //         if (chats[chatID].messages.length > 0) {
    //             chatsToSave.push(chats[chatID]);
    //         }
    //         await idb.set('chats', chatsToSave);
    //     }
    // }
}
const chatManager = new ChatManager();
export default chatManager;

// "1. ColorZilla - a browser extension that allows you to pick any color from a web page and get its CSS code.\n2. Adobe Color - a website that provides a color wheel and allows you to choose and save color palettes, as well as generate color themes from uploaded images.\n3. CSS Color Names - a website that provides a comprehensive list of all the named colors in CSS, along with their hexadecimal values."

// "To use Tailwind with React, you need to install the `tailwindcss` package and configure it in your project. Here's a simple example of how to use Tailwind with React:\n\n1. Install Tailwind and its dependencies:\n\n```\nnpm install tailwindcss postcss autoprefixer\n```\n\n2. Create a `postcss.config.js` file in the root of your project and add the following code:\n\n```\nmodule.exports = {\n  plugins: [\n    require('tailwindcss'),\n    require('autoprefixer'),\n  ],\n}\n```\n\n3. Create a `tailwind.config.js` file in the root of your project and add the following code:\n\n```\nmodule.exports = {\n  purge: [],\n  darkMode: false,\n  theme: {\n    extend: {},\n  },\n  variants: {},\n  plugins: [],\n}\n```\n\n4. Import the Tailwind styles in your `index.css` file:\n\n```\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n```\n\n5. Import the `index.css` file in your `index.js` file:\n\n```\nimport './index.css';\n```\n\n6. Use Tailwind classes in your React components:\n\n```\nimport React from 'react';\n\nfunction App() {\n  return (\n    <div className=\"bg-gray-100 p-4\">\n      <h1 className=\"text-2xl font-bold text-gray-800\">Hello, world!</h1>\n      <p className=\"mt-4 text-gray-600\">This is a simple example of using Tailwind with React.</p>\n    </div>\n  );\n}\n\nexport default App;\n```\n\nIn this example, we're using Tailwind classes to style the background color, padding, font size, font weight, and text color of the `div`, `h1`, and `p` elements."
