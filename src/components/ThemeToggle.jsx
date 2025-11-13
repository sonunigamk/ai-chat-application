import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center w-full gap-3 p-3 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
            {theme === 'light' ? (
                <FiMoon size={16} />
            ) : (
                <FiSun size={16} />
            )}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
    );
};

export default ThemeToggle;