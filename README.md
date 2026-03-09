# Marton David | Senior Frontend Engineer Portfolio

A high-performance, production-ready personal portfolio and secure client portal. Built with a modern, minimalist design system focusing on dark mode, typography, and seamless user experience.

This project demonstrates a lightweight Single Page Application (SPA) architecture using **Vanilla TypeScript** and **Vite**, completely bypassing heavy UI frameworks while maintaining component-driven development, reactive state management, and robust routing.

## ✨ Features

*   **Modern Minimalist UI:** Clean, breathable layouts with a professional dark-mode-first aesthetic.
*   **Vanilla TypeScript SPA:** Custom, lightweight DOM manipulation and state management without React/Vue/Angular overhead.
*   **Secure Authentication:** Integrated Firebase Authentication for a gated client portal/dashboard.
*   **Protected Routes:** Client-side route protection preventing unauthorized access to the dashboard.
*   **Tailwind CSS:** Utility-first styling with custom design tokens (glassmorphism, custom scrollbars, gradients).
*   **Responsive Design:** Mobile-first approach ensuring perfect rendering across all device sizes.

## 🚀 Tech Stack

*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Authentication:** [Firebase Auth](https://firebase.google.com/)
*   **Deployment Target:** Cloudflare Pages

## 📦 Project Structure

```text
project/
├── index.html            # Application entry point
├── src/
│   ├── main.ts           # State management, routing, and app initialization
│   ├── types.ts          # Shared TypeScript interfaces and types
│   ├── utils.ts          # DOM manipulation and helper functions
│   ├── style.css         # Tailwind directives and global CSS variables
│   ├── firebase.ts       # Firebase initialization and auth services
│   └── components/       # Reusable UI components
│       ├── header.ts
│       ├── footer.ts
│       ├── welcome.ts    # Public portfolio view
│       └── login.ts      # Authentication view
```

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm, yarn, or pnpm
*   A Firebase Project with Email/Password Authentication enabled.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/marton-david-portfolio.git
    cd marton-david-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your Firebase configuration details:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

*   `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles TypeScript and bundles the application for production into the `dist/` directory.
*   `npm run preview`: Boots up a local static web server to preview the production build.
*   `npm run check`: Runs the TypeScript compiler to check for type errors without emitting files.

## ☁️ Deployment

This project is optimized for deployment on **Cloudflare Pages**.

1. Connect your GitHub repository to Cloudflare Pages.
2. Set the build command to `npm run build`.
3. Set the build output directory to `dist`.
4. Add your Firebase environment variables (`VITE_FIREBASE_*`) in the Cloudflare Pages settings.

## 📄 License

This project is private and intended for demonstration and portfolio purposes.