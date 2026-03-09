# Nexus Mobile - Premium E-Commerce Storefront

A high-performance, minimalist e-commerce frontend for a premium smartphone brand. Built with **Vite**, **Vanilla TypeScript**, and **Tailwind CSS**, designed for maximum speed and a sleek user experience.

## 🚀 Tech Stack

*   **Framework:** [Vite](https://vitejs.dev/) (Vanilla TS)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first, Custom Design Tokens)
*   **Deployment:** Optimized for [Cloudflare Pages](https://pages.cloudflare.com/)

## ✨ Features

*   **Immersive Hero Section:** High-impact product showcase with smooth animations.
*   **Dynamic Product Grid:** Responsive layout displaying available phone models, colors, and pricing.
*   **Technical Specifications:** Clean, readable breakdown of device features (camera, battery, processor).
*   **Interactive Cart Modal:** Slide-out shopping cart for seamless user flow and simulated checkout.
*   **Dark Mode Ready:** Built-in CSS variables supporting system-level dark/light mode preferences.
*   **Fully Responsive:** Mobile-first design ensuring perfect rendering across all device sizes.

## 📦 Project Structure

```text
project/
├── index.html              # Main HTML entry point
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript compiler configuration
├── vite.config.ts          # Vite bundler configuration
├── src/
│   ├── main.ts             # Application entry point (orchestrator)
│   ├── types.ts            # Shared TypeScript interfaces (PhoneProduct, CartItem, etc.)
│   ├── utils.ts            # Helper functions (currency formatting, DOM utilities)
│   ├── style.css           # Global Tailwind styles and CSS custom properties
│   └── components/         # Modular UI components
│       ├── header.ts       # Navigation and cart trigger
│       ├── hero.ts         # Landing page showcase
│       ├── featureSpecs.ts # Technical details section
│       ├── productGrid.ts  # Storefront inventory display
│       ├── cartModal.ts    # Slide-out shopping cart
│       └── footer.ts       # Site footer
```

## 🛠️ Local Development

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   npm, yarn, or pnpm

### Setup Instructions

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173`.

3.  **Type Checking:**
    To run TypeScript compiler checks without emitting files:
    ```bash
    npm run check
    ```

4.  **Build for Production:**
    ```bash
    npm run build
    ```
    This will generate optimized static assets in the `dist/` directory.

5.  **Preview Production Build:**
    ```bash
    npm run preview
    ```

## ☁️ Deployment to Cloudflare Pages

This project is pre-configured for seamless deployment to Cloudflare Pages.

### Option 1: GitHub/GitLab Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your repository and configure the build settings:
   *   **Framework preset:** `None`
   *   **Build command:** `npm run build`
   *   **Build output directory:** `dist`
5. Click **Save and Deploy**.

*Note: It is recommended to add an environment variable `NODE_VERSION` set to `18` or higher in your Cloudflare Pages settings to ensure compatibility with Vite.*

### Option 2: Direct Upload (Wrangler CLI)
If you prefer to deploy via CLI:
1. Build the project locally:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder using Wrangler:
   ```bash
   npx wrangler pages deploy dist
   ```

## 📄 License

This project is proprietary and created for demonstration purposes.