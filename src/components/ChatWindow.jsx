import React from 'react';
import Header from './Header';
import MessageList from "./MessageList";
import InputBox from "./InputBox";


const ChatWindow = ({ onMenuClick }) => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-zinc-900">
            <Header onMenuClick={onMenuClick} />
            <MessageList />
            <InputBox />
        </div>
    );
};

export default ChatWindow;