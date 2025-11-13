import React, { useState, useEffect, useRef } from 'react';
import { useChat } from "../context/ChatContext";
import ThemeToggle from './ThemeToggle';
import Modal from './Modal';
import { FiPlus, FiMessageSquare, FiMoreHorizontal, FiEdit2, FiTrash2, FiCheck, FiDownload } from 'react-icons/fi';

const Sidebar = ({ closeSidebar }) => {
    const { state, dispatch } = useChat();
    const [openMenuId, setOpenMenuId] = useState(null);
    const [editingSessionId, setEditingSessionId] = useState(null);
    const [renameValue, setRenameValue] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);
    const inputRef = useRef(null);

    const handleNewChat = () => {
        dispatch({ type: "CREATE_SESSION" });
        if (closeSidebar) closeSidebar();
    };

    const switchSession = (sessionId) => {
        // A small guard: don't do anything if we are editing this session.
        if (editingSessionId === sessionId) return;
        dispatch({ type: "SWITCH_SESSION", payload: sessionId });
        if (closeSidebar) closeSidebar();
    };

    const startEditing = (session) => {
        setEditingSessionId(session.id);
        setRenameValue(session.title);
        setOpenMenuId(null);
    };

    const handleRename = (sessionId) => {
        // Using trim() on the value before checking if it's empty is more robust.
        if (renameValue.trim()) {
            dispatch({
                type: "RENAME_SESSION",
                payload: { sessionId, newTitle: renameValue.trim() },
            });
        }
        setEditingSessionId(null);
    };

    const promptDelete = (sessionId) => {
        setSessionToDelete(sessionId);
        setIsDeleteModalOpen(true);
        setOpenMenuId(null);
    };

    const confirmDelete = () => {
        if (!sessionToDelete) return; // A small guard
        dispatch({ type: "DELETE_SESSION", payload: sessionToDelete });
        setIsDeleteModalOpen(false);
        setSessionToDelete(null);
    };

    const handleDownload = (session) => {
        const conversationPairs = [];
        for (let i = 0; i < session.messages.length; i += 2) {
            const userMessage = session.messages[i];
            const aiMessage = session.messages[i + 1];

            // Optional chaining (?.) makes this slightly safer if a message is missing
            if (userMessage?.sender === 'user' && aiMessage?.sender === 'ai') {
                conversationPairs.push({
                    "userMessage": userMessage.text,
                    "aiResponse": aiMessage.text
                });
            }
        }
        const dataToSave = {
            id: session.id,
            title: session.title,
            timestamp: new Date().toISOString(),
            conversation: conversationPairs,
        };
        const jsonString = JSON.stringify(dataToSave, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${session.title.replace(/\s+/g, '_')}_history.json`;
        link.click(); // We don't need to append/remove from the body
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        if (editingSessionId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editingSessionId]);

    return (
        <div className="w-full h-full bg-gray-50 dark:bg-zinc-900 p-3 flex flex-col">
            <button
                onClick={handleNewChat}
                className="flex items-center justify-center gap-2 w-full p-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition-transform active:scale-95 shadow-md"
            >
                <FiPlus size={18} /> New Chat
            </button>

            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                <h2 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase px-2 mb-2">History</h2>
                <ul className='flex flex-col gap-2'>
                    {state.sessions.map((session) => (
                        <li
                            key={session.id}
                            onClick={() => switchSession(session.id)}
                            className={`
                                group flex items-center justify-between p-2 rounded-lg cursor-pointer 
                                text-sm text-zinc-700 dark:text-zinc-300 
                                transition-colors relative 
                                ${editingSessionId === session.id
                                    ? 'bg-blue-500/10 ring-2 ring-blue-500'
                                    : state.activeSessionId === session.id
                                        ? 'bg-gray-200 dark:bg-zinc-800 font-semibold'
                                        : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                                }
                            `}
                        >
                            <div className="flex items-center gap-3 truncate w-full">
                                <FiMessageSquare size={16} className="flex-shrink-0" />
                                {editingSessionId === session.id ? (
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={renameValue}
                                        onChange={(e) => setRenameValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleRename(session.id);
                                            if (e.key === 'Escape') setEditingSessionId(null);
                                        }}
                                        onBlur={() => handleRename(session.id)}
                                        className="w-full bg-transparent focus:outline-none"
                                    />
                                ) : (
                                    <span className="truncate">{session.title}</span>
                                )}
                            </div>

                            <div className="flex items-center flex-shrink-0">
                                {editingSessionId === session.id ? (
                                    <button onClick={(e) => { e.stopPropagation(); handleRename(session.id); }} className="p-1 rounded-md text-green-500 hover:bg-zinc-700">
                                        <FiCheck size={16} />
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={(e) => { e.stopPropagation(); handleDownload(session); }} className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-gray-300 dark:hover:bg-zinc-700">
                                            <FiDownload size={16} />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === session.id ? null : session.id); }} className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-gray-300 dark:hover:bg-zinc-700">
                                            <FiMoreHorizontal size={16} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {openMenuId === session.id && (
                                <div className="absolute right-0 top-10 z-10 w-36 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700" onMouseLeave={() => setOpenMenuId(null)}>
                                    <ul>
                                        <li><button onClick={(e) => { e.stopPropagation(); startEditing(session); }} className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-t-lg"><FiEdit2 size={14} /> Rename</button></li>
                                        <li><button onClick={(e) => { e.stopPropagation(); promptDelete(session.id); }} className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-b-lg"><FiTrash2 size={14} /> Delete</button></li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 border-t border-gray-200 dark:border-zinc-700 pt-3">
                <ThemeToggle />
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Chat"
            >
                Are you sure you want to permanently delete this chat? This action cannot be undone.
            </Modal>
        </div>
    );
};

export default Sidebar;