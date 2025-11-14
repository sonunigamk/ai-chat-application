import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const ChatContext = createContext();

const LOCAL_STORAGE_KEY = "ai_chat_app_state_v2";

export const ChatProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const hasInitialized = useRef(false);

  // --- State Update Functions ---

  const createSession = () => {
    const newSession = {
      id: `session_${Date.now()}`,
      title: `Chat ${sessions.length + 1}`,
      messages: [],
    };
    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSession.id);
  };

  const switchSession = (sessionId) => {
    setActiveSessionId(sessionId);
  };

  const addMessage = (sessionId, message) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, messages: [...session.messages, message] }
          : session
      )
    );
  };

  const updateLastMessage = (sessionId, newText) => {
    setSessions(prev =>
      prev.map(session => {
        if (session.id === sessionId) {
          const newMessages = [...session.messages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage) {
            lastMessage.text = newText;
          }
          return { ...session, messages: newMessages };
        }
        return session;
      })
    );
  };

  const renameSession = (sessionId, newTitle) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === sessionId ? { ...session, title: newTitle } : session
      )
    );
  };

  const deleteSession = (sessionId) => {
    const remainingSessions = sessions.filter(
      session => session.id !== sessionId
    );
    setSessions(remainingSessions);

    if (activeSessionId === sessionId) {
      setActiveSessionId(remainingSessions.length > 0 ? remainingSessions[0].id : null);
    }
  };

  // --- Effects for Initialization and Persistence ---

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        const { sessions: savedSessions, activeSessionId: savedActiveId } = JSON.parse(savedState);
        setSessions(savedSessions);
        setActiveSessionId(savedActiveId);
        if (savedSessions.length === 0) {
          createSession();
        }
      } else {
        createSession();
      }
    }
  }, []);

  useEffect(() => {
    //  don't save on the very first render 
    if (hasInitialized.current) {
      const stateToSave = { sessions, activeSessionId };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [sessions, activeSessionId]);

  // value provided by the context 
  const contextValue = {
    sessions,
    activeSessionId,
    createSession,
    switchSession,
    addMessage,
    updateLastMessage,
    renameSession,
    deleteSession,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};