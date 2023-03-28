import { Inter } from 'next/font/google';
import Message from '@/features/Chat/ChatMessage';
import Chat from '@/features/Chat/ChatPage';
const inter = Inter({ subsets: ['latin'] });
import useChat from '@/features/Chat/useChat';
import { useState } from 'react';
export default function Home() {
    return <Chat />;
}
