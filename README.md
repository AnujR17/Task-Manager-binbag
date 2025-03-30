# Task Manager

A modern, responsive task management application built with React and Material UI, designed for efficient task organization with an intuitive drag-and-drop interface.

**Link:** [Task Manager](https://task-manager-binbag.vercel.app/)

## 🚀 Features

- **Task Management:** Create, edit, delete, and mark tasks as complete.
- **Prioritization:** Assign priority levels (High, Medium, Low) with visual indicators.
- **Filtering & Sorting:** Filter tasks by status (All, Active, Completed) and sort by date or priority.
- **Drag & Drop:** Easily reorder tasks while preserving manual order.
- **Dark/Light Mode:** Toggle between themes with persistent user preference.
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Data Persistence:** Tasks are stored in localStorage for seamless continuity.
- **User Feedback:** Toast notifications for all actions, including confirmations for deletions.

## 🛠 Tech Stack

- **React 19** – Modern React features and hooks
- **Redux Toolkit** – Centralized state management
- **Material UI** – Consistent, responsive component styling
- **@hello-pangea/dnd** – Drag-and-drop functionality
- **react-hot-toast** – Non-intrusive notifications
- **LocalStorage** – Data persistence between sessions

## 🏗 Architecture

This project follows a clean architecture with a clear separation of concerns:

- **Components** – UI presentation
- **Redux** – State management using the slice pattern
- **Custom Hooks** – Abstraction of localStorage logic
- **Middleware** – Side effects like notifications

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Clone the repository:

```sh
git clone https://github.com/your-repo/task-manager.git
cd task-manager
```

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

## 🚀 Deployment

To build and deploy the application:

Generate the production build:

```sh
npm run build
```

