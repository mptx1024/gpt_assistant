import { Inter } from 'next/font/google';
import Message from '@/components/Chat/ChatMessage';
import Chat from '@/components/Chat/Chat';
const inter = Inter({ subsets: ['latin'] });
import useChat from '@/components/Chat/useChat';
import { useState } from 'react';
export default function Home() {
    return <Chat />;
}
