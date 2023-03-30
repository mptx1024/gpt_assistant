import * as idb from '@/utils/indexedDB';
import { v4 as uuid } from 'uuid';
import { Chat, Message, UserSubmitMessage } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, store } from '@/store';
import { setMessages } from '../chatSlice';

export class ChatManager {
    public chats = new Map<string, Chat>();
    public loaded = false;
    public activeReply: string = '';

    constructor() {
        this.load();
    }

    public async generateReply(
        userInput: UserSubmitMessage
        // updateMessages: (messages: Message[]) => void
    ) {
        console.log(`userInput->chatID`, userInput.chatID);

        const currentChat = this.chats.get(userInput.chatID);
        if (!currentChat) {
            throw new Error('Chat not found');
        }
        const userMessage: Message = {
            id: uuid(),
            chatID: userInput.chatID,
            timestamp: Date.now(),
            role: 'user',
            content: userInput.content,
        };
        currentChat.messages.push(userMessage);

        const reply: Message = {
            id: uuid(),
            chatID: userInput.chatID,
            timestamp: Date.now(),
            role: 'assistant',
            content: '',
        };

        currentChat.messages.push(reply);

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

            const updatedMessages = currentChat.messages.map((message, index) => {
                if (index === currentChat.messages.length - 1) {
                    return { ...message, content: message.content + chunkValue };
                }
                return message;
            });

            currentChat.messages = updatedMessages;
            store.dispatch(setMessages([...currentChat.messages]));
        }

        await this.save();
    }

    public createChat(): string {
        const chat: Chat = {
            id: uuid(),
            messages: [],
            created: Date.now(),
        };
        this.chats.set(chat.id, chat);
        console.log('in createChat chat.id: ', chat.id);

        return chat.id;
    }

    public async getChat(id: string): Promise<Chat | null> {
        await this.load();
        console.log('in getChat id: ', id);
        const chat = this.chats.get(id);
        if (chat) {
            console.log('in getChat chat: ', chat);
            store.dispatch(setMessages([...chat.messages]));
        }

        return chat || null;
    }

    public deleteChat(id: string) {
        this.chats.delete(id);
    }

    public stopGenerating() {}
    public async regenerate() {}

    private async load() {
        console.log(`loading chats...`);

        const chats = await idb.get('chats');

        if (chats) {
            for (const chat of chats) {
                this.chats.set(chat.id, chat);
            }
        }
        console.log(`loaded chats. current chats #: ${this.chats.size}; chats: ${this.chats}`);
        this.loaded = true;
    }

    public async save() {
        await idb.set(
            'chats',
            Array.from(this.chats.values()).filter((chat) => chat.messages.length > 0)
        );
    }
}

const chatManager = new ChatManager();
export default chatManager;
