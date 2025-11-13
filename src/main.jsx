import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChatProvider } from './context/ChatContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> 
      <ChatProvider>
        <App />
      </ChatProvider>
    </ThemeProvider>
  </React.StrictMode>,
);