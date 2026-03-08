# 🌸 Virág Katalógus (Flower Catalog)

A modern, responsive, and visually appealing web catalog showcasing various flowers and their botanical properties. Built with **Vite**, **Vanilla TypeScript**, and **Tailwind CSS**.

## ✨ Features

*   🌺 **Beautiful UI:** Nature-inspired design system with a cohesive color palette.
*   🌓 **Dark Mode Support:** Automatically adapts to the user's system preferences (Light/Dark mode).
*   📱 **Fully Responsive:** Mobile-first approach ensuring a seamless experience across all devices.
*   ⚡ **High Performance:** Built with Vanilla TypeScript and Vite for lightning-fast Hot Module Replacement (HMR) and highly optimized production builds.
*   🔍 **Detailed Botanical Data:** Displays blooming seasons, light/water requirements, difficulty levels, and symbolism for each flower.

## 🛠️ Tech Stack

*   **Framework:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Architecture:** Component-based Vanilla DOM manipulation

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or newer) installed on your machine.

### Installation

1. Clone the repository (or download the source code).
2. Navigate to the project directory:
   ```bash
   cd flower-catalog
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

## 📜 Available Scripts

*   `npm run dev` - Starts the development server.
*   `npm run build` - Compiles TypeScript and builds the project for production into the `dist/` directory.
*   `npm run preview` - Boots up a local static web server to preview the production build.
*   `npm run check` - Runs TypeScript type checking without emitting files.

## 📂 Project Structure

```text
flower-catalog/
├── index.html          # Main HTML entry point
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite bundler configuration
├── src/
│   ├── main.ts         # Application entry point (orchestrates components)
│   ├── types.ts        # Shared TypeScript interfaces (Flower, SiteConfig, etc.)
│   ├── utils.ts        # Helper functions and mock data
│   ├── style.css       # Global styles and Tailwind directives
│   └── components/     # Reusable UI components
│       ├── header.ts
│       ├── hero.ts
│       ├── flower-catalog.ts
│       ├── flower-card.ts
│       └── footer.ts
```

## ☁️ Deployment

This project is optimized for static hosting platforms like **Cloudflare Pages**, Vercel, or Netlify. 

To deploy to Cloudflare Pages:
1. Connect your GitHub/GitLab repository to Cloudflare Pages.
2. Set the build command to: `npm run build`
3. Set the build output directory to: `dist`
4. Save and deploy!