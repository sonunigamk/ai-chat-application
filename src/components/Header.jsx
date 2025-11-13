import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const Header = ({ onMenuClick }) => {
    return (
      
        <header className="relative flex items-center justify-center p-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 flex-shrink-0">

    
            <button
                onClick={onMenuClick}
                className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden text-zinc-600 dark:text-zinc-400"
            >
                <FiMenu size={24} />
            </button>

         
            <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
               Ai Chat App
            </h1>

            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <FaUserCircle size={28} className="text-zinc-400 dark:text-zinc-500 cursor-pointer" />
            </div>

        </header>
    );
};

export default Header;