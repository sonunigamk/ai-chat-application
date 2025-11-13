import React, { useState } from 'react';
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-900 font-sans overflow-hidden">

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* A slightly cleaner way to write the long className string */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[80%] max-w-xs z-30 
          bg-gray-50 dark:bg-zinc-900 md:hidden 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      <div className="hidden md:flex md:w-64 flex-shrink-0 flex-col border-r border-gray-200 dark:border-zinc-700">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <ChatWindow
          onMenuClick={() => setIsSidebarOpen(true)}
        />
      </div>
    </div>
  );
};

export default App;