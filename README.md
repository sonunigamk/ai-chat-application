# 🤖 AI Chat Application

This is a responsive, feature-rich AI chat application built with React and the Google Gemini API. It allows users to have real-time conversations with an AI, manage multiple chat sessions, and enjoy a polished, modern user interface.

---

### Live Demo

[Watch the Loom Demo](https://ai-chatassisten.netlify.app/)

---

## ✨ Features

### Core Features

- **Multiple Chat Sessions:** Create, switch between, rename, and delete different chat sessions.
- **Real-time AI Conversation:** Send messages to the Google Gemini API and receive responses.
- **Responsive Design:** A seamless experience on both desktop and mobile devices.
  - **Desktop:** A classic side-by-side layout with a persistent sidebar.
  - **Mobile:** A full-width chat window with a slide-in sidebar accessible via a hamburger menu.
- **Data Persistence:** All chat sessions and messages are automatically saved to `localStorage`, so your conversations are preserved when you reopen the app.
- **Loading & Typing Indicators:** A loading spinner on the send button and an animated "Typing..." indicator in the chat provide clear feedback while waiting for the AI.
- **Download Chat History:** Export the history of any chat session as a neatly formatted JSON file with question-and-answer pairs.
- **Intuitive Input:** Use `Enter` to send a message and `Shift+Enter` to create a new line.

### Bonus Features Implemented

- **Dark & Light Mode:** A beautiful, high-contrast theme toggle that persists across sessions.
- **Rich Text Formatting:** AI responses are parsed to correctly display Markdown content (bold, lists, etc.).
- **Polished UX Details:**
  - Auto-scrolling to the latest message.
  - An auto-resizing text area that grows as you type.
  - Clean, modern icons and hover effects for a professional feel.
- **Robust State Management:** Uses `useContext` for predictable and scalable state handling.
- **Error Handling:** Gracefully handles API errors and provides user-friendly feedback.

---

## 🛠️ Tech Stack

- **Frontend:** React (with Hooks)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** `react-icons`
- **Markdown Rendering:** `react-markdown`
- **Language:** JavaScript (ES6+)
- **AI:** Google Gemini API

---

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm or a similar package manager

---

### 1. Clone the Repository

Replace `YOUR_USERNAME/YOUR_REPOSITORY_NAME` with your actual GitHub details.

```
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Environment Variables

**create a file whith name of .env**

```
VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### 4. Run the Development Server

```
npm run dev
```
