# TaskMaster - Advanced Task Management

TaskMaster is a modern, feature-rich task management application built with React, TypeScript, and Tailwind CSS. It helps you organize, track, and analyze your tasks, daily progress, and achievements with a beautiful and intuitive interface.

## Features

- **User Authentication**: Sign up and log in with your email and password.
- **Dashboard**: Get an overview of your productivity, recent tasks, and upcoming deadlines.
- **Task Board**: Organize tasks in a Kanban-style board (To Do, In Progress, Done) with drag-and-drop support.
- **Task Management**: Add, edit, delete, and search tasks. Assign priorities, categories, due dates, and tags.
- **Daily Updates**: Reflect on your day, track your mood, and record learnings and plans for tomorrow.
- **Analytics**: Visualize your productivity with charts (tasks by category, completion by priority, weekly progress, mood tracking).
- **Achievements**: Unlock badges for productivity milestones and daily update streaks.
- **Responsive Design**: Works beautifully on desktop and mobile.

## Tech Stack

- **React** (with Hooks & Context API)
- **TypeScript**
- **Tailwind CSS**
- **Vite** (for fast development)
- **react-beautiful-dnd** (drag-and-drop)
- **recharts** (analytics & charts)
- **lucide-react** (icons)
- **date-fns** (date utilities)

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd advanced-task-manager
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
advanced-task-manager/
├── src/
│   ├── components/
│   │   ├── Tasks/         # Task board, task card, task form
│   │   ├── Dashboard/     # Dashboard overview
│   │   ├── Analytics/     # Analytics and charts
│   │   ├── Achievements/  # Productivity achievements
│   │   ├── Updates/       # Daily updates
│   │   ├── Auth/          # Login and signup forms
│   │   ├── Layout/        # Header, sidebar, layout components
│   │   └── Profile/       # User profile
│   ├── contexts/          # Auth and Task context providers
│   ├── App.tsx            # Main app and routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind CSS
├── index.html             # App entry HTML
├── package.json           # Project metadata and scripts
└── ...
```

## Usage

- **Sign Up / Log In:** Create an account or log in with your email and password.
- **Dashboard:** View your productivity stats, recent tasks, and upcoming deadlines.
- **Task Board:** Add, edit, delete, and move tasks between columns. Drag and drop to change status.
- **Daily Updates:** Add a daily reflection, track your mood, and record learnings.
- **Analytics:** Explore charts and insights about your productivity and mood.
- **Achievements:** Unlock badges for completing tasks and maintaining daily update streaks.

## Customization
- Update styles in `index.css` and `tailwind.config.js`.
- Add new features or modify components in the `src/components/` directory.

## License

This project is for educational and personal use. Feel free to modify and extend it! 