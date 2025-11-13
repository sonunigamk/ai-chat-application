import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-sm m-4 p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center mb-4">
                    <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full mr-4">
                        <FiAlertTriangle size={24} className="text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{title}</h3>
                </div>

                <div className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
                    {children}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;