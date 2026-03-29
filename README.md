# 🌿 Botanica | Modern Plant Catalog

A beautiful, high-performance static website for showcasing and selling indoor plants. Built with a focus on clean, earthy aesthetics, responsive design, and lightning-fast load times.

This project is designed as a **static catalog** (no database required), making it incredibly easy to host, maintain, and deploy.

## 🚀 Tech Stack

*   **Frontend Framework:** Vite + Vanilla TypeScript
*   **Styling:** Tailwind CSS (Utility-first, Mobile-first)
*   **Data Management:** Static JSON/Array (No backend required)
*   **Deployment:** Cloudflare Pages (Recommended)

## ✨ Features

*   **Earthy Design System:** Calming sage and forest greens with terracotta accents.
*   **Responsive Grid:** Beautifully displays plant photography on mobile, tablet, and desktop.
*   **Static Catalog:** Easily manage your inventory directly in the code without needing a complex database or CMS.
*   **High Performance:** Zero backend latency, optimized assets via Vite.

---

## 🛠️ Local Development Setup

1. **Clone the repository** or download the source code.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🪴 Managing Plant Inventory

Since this project does not use a database, all plant data is stored statically in the code. 

To add, edit, or remove plants from your store:
1. Open the `src/utils.ts` file.
2. Locate the `PLANTS_DATA` array.
3. Modify the objects in the array. Each object follows this structure:

```typescript
{
  id: 'unique-id',
  name: 'Plant Name',
  scientificName: 'Scientific Name',
  price: 25.99,
  image: 'URL_to_image',
  category: 'Indoor',
  careLevel: 'Easy',
  description: 'A brief description of the plant.'
}
```
*Note: The website will automatically update the gallery grid based on the contents of this array.*

---

## 🌐 Deployment (Cloudflare Pages)

This project is optimized for free, fast deployment on **Cloudflare Pages**.

1. Push your code to a GitHub or GitLab repository.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** -> **Pages**.
3. Click **Connect to Git** and select your repository.
4. Configure the build settings:
   *   **Framework preset:** Vite
   *   **Build command:** `npm run build`
   *   **Build output directory:** `dist`
5. Click **Save and Deploy**.

Your plant catalog will be live globally in minutes!