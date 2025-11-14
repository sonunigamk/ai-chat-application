import React, { useState } from 'react';
import { useChat } from "../context/ChatContext";
import getGeminiResponse from "../api/geminiApi";
import { IoSend } from "react-icons/io5";

const InputBox = () => {
    const [input, setInput] = useState("");
    // Correctly destructuring from the new context value
    const { activeSessionId, addMessage, updateLastMessage } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSend = async () => {
        const userMessage = input.trim();
        if (!userMessage || isLoading || !activeSessionId) return;

        setIsLoading(true);
        setInput("");
        setIsExpanded(false);

        // Calling the new functions directly
        addMessage(activeSessionId, { id: `msg_${Date.now()}`, sender: "user", text: userMessage });
        addMessage(activeSessionId, { id: `msg_typing_${Date.now()}`, sender: "ai", text: "Typing..." });

        const aiResponse = await getGeminiResponse(userMessage);

        updateLastMessage(activeSessionId, aiResponse);

        setIsLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            setIsExpanded(true);
        }
        else if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="px-6 py-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700">
            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
                    rows="1"
                    className={`w-full p-3 pr-14 rounded-3xl bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-height duration-200 ease-in-out scrollbar-hide ${isExpanded ? 'h-24' : 'h-12'}`}
                    disabled={isLoading || !activeSessionId}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim() || !activeSessionId}
                    className="absolute right-3 bottom-3 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <IoSend size={18} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default InputBox;