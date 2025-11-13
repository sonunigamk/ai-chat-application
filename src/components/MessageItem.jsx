import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FaUser, FaRobot } from 'react-icons/fa';

const MessageItem = ({ message }) => {
    if (!message) {
        return null;
    }

    const { sender, text } = message;
    const isUser = sender === "user";

    if (sender === "ai" && text === "Typing...") {
        return (
            <div className="flex items-start gap-4 mr-8 md:mr-16">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-600 dark:bg-zinc-700">
                    <FaRobot size={16} className="text-white" />
                </div>
                <div className="max-w-2xl">
                    <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-zinc-700 px-4 py-3 rounded-lg">
                        <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-pulse"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-start gap-4 ${isUser ? "flex-row-reverse ml-8 md:ml-16" : "mr-8 md:mr-16"}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-zinc-500' : 'bg-zinc-600 dark:bg-zinc-700'}`}>
                {isUser ? <FaUser size={16} className="text-white" /> : <FaRobot size={16} className="text-white" />}
            </div>
            <div className={`max-w-2xl ${isUser ? "bg-gray-200 dark:bg-zinc-700 rounded-lg shadow-sm px-4 py-2" : ""}`}>
                <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200">
                    <ReactMarkdown>{text || ""}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;