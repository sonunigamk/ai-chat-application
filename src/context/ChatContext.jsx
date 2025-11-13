import React, { createContext, useContext, useReducer, useEffect, useRef } from "react";

const ChatContext = createContext();

const LOCAL_STORAGE_KEY = "ai_chat_app_sessions_v1";

const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);

const initialState = savedState 
    ? JSON.parse(savedState)
    : { sessions: [], activeSessionId: null };

const chatReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_SESSION": {
      const newSession = {
        id: `session_${Date.now()}`,
        title: `Chat ${state.sessions.length + 1}`,
        messages: [],
      };
      return {
        ...state,
        sessions: [...state.sessions, newSession],
        activeSessionId: newSession.id,
      };
    }
    case "SWITCH_SESSION": {
      return { ...state, activeSessionId: action.payload };
    }
    case "ADD_MESSAGE": {
      const { sessionId, message } = action.payload;
      return {
        ...state,
        sessions: state.sessions.map((s) =>
          s.id === sessionId ? { ...s, messages: [...s.messages, message] } : s
        ),
      };
    }
    case "UPDATE_LAST_MESSAGE": {
      const { sessionId, newText } = action.payload;
      return {
        ...state,
        sessions: state.sessions.map((session) => {
          if (session.id === sessionId) {
            const newMessages = [...session.messages];
            const lastMessageIndex = newMessages.length - 1;
            if (lastMessageIndex >= 0) {
              newMessages[lastMessageIndex].text = newText;
            }
            return { ...session, messages: newMessages };
          }
          return session;
        }),
      };
    }
    case "RENAME_SESSION": {
      const { sessionId, newTitle } = action.payload;
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === sessionId ? { ...session, title: newTitle } : session
        ),
      };
    }
    case "DELETE_SESSION": {
      const sessionIdToDelete = action.payload;
      const remainingSessions = state.sessions.filter(
        (session) => session.id !== sessionIdToDelete
      );
      let newActiveSessionId = state.activeSessionId;
      if (state.activeSessionId === sessionIdToDelete) {
        newActiveSessionId = remainingSessions.length > 0 ? remainingSessions[0].id : null;
      }
      return {
        ...state,
        sessions: remainingSessions,
        activeSessionId: newActiveSessionId,
      };
    }
    default:
      return state;
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const hasInitialized = useRef(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      if (state.sessions.length === 0) {
        dispatch({ type: "CREATE_SESSION" });
      }
    }
  }, []);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
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