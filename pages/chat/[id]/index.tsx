import { useRouter } from 'next/router';
import { Suspense, useEffect, useRef, useState } from 'react';

import ChatPage from '@/features/Chat/ChatPage';

export default function DynamicChatPage() {
    const router = useRouter();
    const chatID = useRef<string | null>(null);
    const { id } = router.query;
    console.log('🚀 ~ file: index.tsx:12 ~ DynamicChatPage ~ id:', id);
    if (typeof id === 'string') {
        chatID.current = id;
    }

    if (!chatID.current) {
        return <div>No Chat Found</div>;
    }

    return <ChatPage chatID={chatID.current} />;
}
