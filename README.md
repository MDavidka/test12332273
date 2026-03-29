# Botanica | Local Indoor Plant Shop Catalog 🌿

A blazing-fast, static, and responsive online catalog for a local plant shop. Built with **Vite**, **Vanilla TypeScript**, and **Tailwind CSS**, this project is designed to be lightweight, highly performant, and easily deployable to edge networks like Cloudflare Pages without the need for a backend database.

## ✨ Features

- **Modern Minimalist Design**: Clean, breathable layouts focusing on high-quality plant imagery.
- **Responsive Grid**: Mobile-first approach ensuring the catalog looks great on all devices.
- **Static Catalog**: Zero-latency browsing with hardcoded, easily manageable inventory data.
- **Type-Safe**: Built entirely with strict TypeScript for robust and error-free development.
- **Tailwind CSS**: Utility-first styling with a custom botanical color palette (Forest Green, Sage, Terracotta).

## 🛠 Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) (Vanilla TS)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: Optimized for [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 🚀 Local Development

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and your preferred package manager (`npm`, `yarn`, or `pnpm`) installed.

### 1. Install Dependencies

Clone the repository and install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Start the Development Server

Run the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the site.

### 3. Build for Production

To create a production-ready build:

```bash
npm run build
```

This will compile the TypeScript, process the CSS, and output the optimized static assets into the `dist/` directory. You can preview the production build locally using:

```bash
npm run preview
```

---

## 📂 Project Structure

```text
project/
├── index.html          # Main HTML entry point
├── src/
│   ├── main.ts         # Application orchestrator (mounts components)
│   ├── types.ts        # Shared TypeScript interfaces (Plant, SiteConfig, etc.)
│   ├── utils.ts        # Helper functions and static catalog data
│   ├── style.css       # Tailwind directives and custom CSS variables
│   └── components/     # UI Components (Header, Hero, Catalog, Features, Footer)
├── public/             # Static assets (images, fonts, etc.)
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite bundler configuration
```

---

## 🎨 Customization

### Updating the Plant Inventory
Since this is a static site without a database, the plant inventory is managed via a TypeScript array. 
To add, remove, or edit plants, open `src/utils.ts` and modify the `plants` array. The UI will automatically update to reflect your changes.

### Changing the Theme
The color palette and typography are controlled via CSS custom properties. Open `src/style.css` and modify the `:root` variables to match your brand:

```css
:root {
  --color-primary: #1B4332; /* Change your primary brand color here */
  --color-accent: #E07A5F;  /* Change your CTA color here */
  /* ... */
}
```

---

## ☁️ Deployment to Cloudflare Pages

This project is perfectly suited for Cloudflare Pages. Follow these steps to deploy:

1. **Push to GitHub/GitLab**: Ensure your code is pushed to a Git repository.
2. **Log in to Cloudflare**: Go to the Cloudflare dashboard and navigate to **Workers & Pages** > **Pages**.
3. **Create a Project**: Click **Connect to Git** and select your repository.
4. **Configure Build Settings**:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. **Deploy**: Click **Save and Deploy**. Cloudflare will automatically build and deploy your site, providing you with a live URL.

Every subsequent push to your main branch will automatically trigger a new deployment.