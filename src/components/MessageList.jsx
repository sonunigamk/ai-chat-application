import React, { useEffect, useRef } from 'react';
import { useChat } from "../context/ChatContext";
import MessageItem from "./MessageItem";

const MessageList = () => {
    // Correctly destructuring from the new context value
    const { sessions, activeSessionId } = useChat();

    const activeSession = sessions.find(s => s.id === activeSessionId);
    const messages = activeSession ? activeSession.messages : [];
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="p-6 space-y-6">
                {messages.length === 0 ? (
                    <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                        <div className="text-center text-zinc-400 dark:text-zinc-500">
                            <h2 className="text-2xl font-semibold">Chat App</h2>
                            <p>Ask me anything to get started!</p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg) => <MessageItem key={msg.id} message={msg} />)
                )}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};

export default MessageList;