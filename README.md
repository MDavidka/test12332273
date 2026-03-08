# Bloom & Deliver - Online Flower Shop

A modern, lightning-fast, and responsive single-page application (SPA) for an online flower delivery service. Built with **Vite**, **Vanilla TypeScript**, and **Tailwind CSS**.

## 🚀 Tech Stack

- **Framework:** [Vite](https://vitejs.dev/) (Vanilla TS)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** LocalStorage (Client-side cart management)
- **Deployment:** Optimized for [Cloudflare Pages](https://pages.cloudflare.com/)

## 📦 Project Structure

```text
project/
├── index.html          # Main HTML entry point
├── src/
│   ├── main.ts         # Application entry point & orchestrator
│   ├── types.ts        # Shared TypeScript interfaces
│   ├── utils.ts        # Helper functions (DOM, LocalStorage, Formatting)
│   ├── style.css       # Tailwind imports & CSS Custom Properties (Design System)
│   └── components/     # Reusable UI components (Hero, Catalog, Cart, etc.)
├── public/             # Static assets (if any)
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite bundler configuration
```

## 🛠️ Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd flower-shop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Compiles TypeScript and builds the project for production into the `dist/` directory.
- `npm run preview` - Boots up a local static web server to preview the production build.
- `npm run check` - Runs TypeScript type checking without emitting files.

## ☁️ Deployment to Cloudflare Pages

This project is perfectly optimized for seamless deployment to Cloudflare Pages.

### Option 1: Git Integration (Recommended)

1. Push your code to a GitHub or GitLab repository.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your repository and configure the build settings as follows:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. **Environment Variables (Optional but recommended):**
   - Add a variable named `NODE_VERSION` and set its value to `18` (or higher) to ensure Cloudflare uses a modern Node.js environment.
6. Click **Save and Deploy**. Cloudflare will automatically build and deploy your site every time you push to your main branch.

### Option 2: Direct Upload (Wrangler CLI)

If you prefer to deploy via CLI without connecting a Git repository:

1. Install Wrangler globally:
   ```bash
   npm install -g wrangler
   ```
2. Login to your Cloudflare account:
   ```bash
   wrangler login
   ```
3. Build the project locally:
   ```bash
   npm run build
   ```
4. Deploy the `dist` folder:
   ```bash
   wrangler pages deploy dist --project-name flower-shop
   ```

## 🎨 Design System

The application uses a custom design system built on top of Tailwind CSS. All design tokens (colors, typography, spacing) are defined as CSS Custom Properties in `src/style.css`. 

To modify the theme, simply update the `:root` variables in `src/style.css`. The Tailwind configuration automatically inherits these variables.

## 📝 License

MIT License