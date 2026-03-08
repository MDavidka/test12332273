# 🌿 Plant Store Showcase

A modern, minimalist, and high-performance single-page website designed for a physical plant shop. This project serves as a digital storefront to showcase plant collections, share the store's philosophy, and provide essential contact information to drive foot traffic.

Built with a focus on speed, accessibility, and clean design using Vanilla TypeScript and Tailwind CSS.

## ✨ Features

- **Responsive Design:** Mobile-first approach ensuring the site looks beautiful on all devices.
- **Modern UI/UX:** Clean, breathable layouts with a natural, organic color palette.
- **Hero Section:** Engaging first impression with a clear value proposition.
- **Plant Gallery:** Visual showcase of different plant categories (Easy Care, Rare Finds, Accessories).
- **About Us:** A dedicated section sharing the store's story and passion for greenery.
- **Contact & Location:** Clear display of opening hours, physical address, and contact details.
- **Smooth Scrolling:** Enhanced navigation experience across the single-page layout.

## 🛠 Tech Stack

- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
- **Architecture:** Vanilla DOM manipulation with component-based structure
- **Deployment:** Optimized for [Cloudflare Pages](https://pages.cloudflare.com/)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd plant-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will compile the TypeScript, process the Tailwind CSS, and output the optimized static files into the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

### Type Checking

To run TypeScript compiler checks without emitting files:

```bash
npm run check
```

## 📁 Project Structure

```text
plant-store/
├── index.html                # Main HTML entry point
├── package.json              # Project metadata and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── src/
│   ├── main.ts               # Application entry point
│   ├── types.ts              # Shared TypeScript interfaces
│   ├── utils.ts              # Helper functions (DOM, scrolling)
│   ├── style.css             # Global styles and Tailwind directives
│   └── components/           # UI Components
│       ├── header.ts         # Navigation bar
│       ├── hero.ts           # Hero section
│       ├── gallery.ts        # Plant categories showcase
│       ├── about.ts          # Store information
│       ├── contact.ts        # Location and hours
│       └── footer.ts         # Page footer
└── public/                   # Static assets (images, icons)
```

## ☁️ Deployment

This project is configured to be easily deployed to **Cloudflare Pages**.

1. Connect your GitHub/GitLab repository to Cloudflare Pages.
2. Set the build framework to **Vite** (or configure manually).
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Save and deploy!

## 🎨 Design System

The project uses a custom design system defined in `src/style.css` via CSS variables, integrated seamlessly with Tailwind CSS. 

- **Primary Color:** Deep Forest Green (`#2d6a4f`)
- **Accent Color:** Terracotta (`#e07a5f`)
- **Background:** Warm Off-White (`#fbf9f6`)
- **Typography:** Inter / System UI

## 📄 License

This project is licensed under the MIT License.