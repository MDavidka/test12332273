# Plant Haven - E-Commerce Store

A modern, responsive e-commerce web application for selling plants. This project features a curated product catalog, a dynamic shopping cart, and a simulated (dummy) payment gateway to demonstrate a complete user purchasing journey without processing real financial transactions.

Built with **Vite**, **Vanilla TypeScript**, and **Tailwind CSS**.

## 🚀 Features

*   **Product Catalog:** Browse a beautiful, responsive grid of available plants with high-quality imagery and pricing.
*   **Shopping Cart:** Add plants to your cart, update quantities, and remove items. The cart calculates subtotals and totals in real-time.
*   **Dummy Checkout:** A simulated, secure-looking payment interface that allows users to complete the checkout flow using mock data.
*   **State Management:** Custom, lightweight reactive store built in Vanilla TypeScript to manage cart state across components.
*   **Responsive Design:** Mobile-first approach ensuring a seamless experience across all devices.
*   **Dark/Light Mode Ready:** Styled with a cohesive, nature-inspired color palette using CSS custom properties and Tailwind utility classes.

## 🛠️ Tech Stack

*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Deployment:** Ready for Cloudflare Pages, Vercel, or Netlify.

## 📂 Project Structure

```text
project/
├── index.html                # Main HTML entry point
├── src/
│   ├── main.ts               # Application entry point & orchestrator
│   ├── types.ts              # Shared TypeScript interfaces (Plant, CartItem, etc.)
│   ├── store.ts              # Global state management (Cart & UI state)
│   ├── utils.ts              # Helper functions (Currency formatting, mock data)
│   ├── style.css             # Design system tokens & global Tailwind styles
│   └── components/           # Reusable UI components
│       ├── header.ts
│       ├── footer.ts
│       ├── productCard.ts
│       ├── productList.ts
│       ├── cart.ts
│       └── checkout.ts
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── .gitignore
└── README.md                 # Project documentation
```

## 🚦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd plant-store
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port specified in your terminal).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be generated in the `dist/` directory, ready to be deployed to any static hosting service.

To preview the production build locally:

```bash
npm run preview
```

## 📝 Type Checking

To run TypeScript type checking without emitting files:

```bash
npm run check
```

## 🎨 Design System

The application uses a custom design system defined in `src/style.css`. It leverages CSS variables for easy theming and consistency:

*   **Primary Color:** Deep Forest Green (`#166534`)
*   **Secondary Color:** Earthy Brown (`#78350f`)
*   **Background:** Warm Off-White (`#f8fafc`)
*   **Typography:** 'Inter' (sans-serif) for clean, modern readability.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License.