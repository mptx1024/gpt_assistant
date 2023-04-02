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
