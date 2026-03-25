# TechStore | Modern Phone E-Commerce

A high-performance, modern e-commerce platform for selling mobile phones and accessories. Built with a focus on speed, clean UI/UX, and seamless user flows.

## 🚀 Tech Stack

*   **Frontend Framework:** Vite + Vanilla TypeScript
*   **Styling:** Tailwind CSS (Utility-first, Mobile-first)
*   **Backend / BaaS:** Appwrite (Authentication, Databases)
*   **Deployment:** Cloudflare Pages

## ✨ Features

*   **Modern UI/UX:** Sleek, Apple/Samsung-inspired design system with glassmorphism and smooth animations.
*   **Product Segments:** Categorized product listings (Premium Flagships, Budget Friendly, New Arrivals, Accessories).
*   **User Authentication:** Secure login and registration via Appwrite.
*   **Shopping Cart:** Persistent sliding cart drawer.
*   **Checkout Flow:** Streamlined checkout modal with real-time total calculation.
*   **Discount System:** Apply promotional codes for percentage-based discounts.

---

## 🛠️ Local Development Setup

1. **Clone the repository** (if applicable) or download the source code.
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

---

## 🗄️ Appwrite Backend Setup (CRITICAL)

This project relies on **Appwrite** for its backend. The frontend is already configured to connect to your specific Appwrite instance:
*   **Endpoint:** `https://fra.cloud.appwrite.io/v1`
*   **Project ID:** `69c2b4a10015a5c19a9f`

To make the store functional, you **must** create the following Database and Collections in your Appwrite Console.

### 1. Create the Database
*   Navigate to **Databases** in your Appwrite Console.
*   Click **Create Database**.
*   Name it `Main Store` (or similar).
*   Set the **Database ID** to: `main`

### 2. Create the Collections

Inside the `main` database, create the following three collections. **The Collection IDs and Attribute keys must match exactly.**

#### Collection 1: Products
*   **Name:** Products
*   **Collection ID:** `products`
*   **Permissions:** Go to Settings -> Permissions. Add `Any` and check **Read**.
*   **Attributes:**
    *   `name` (String, size: 255, Required)
    *   `brand` (String, size: 100, Required)
    *   `price` (Double, Required)
    *   `description` (String, size: 5000, Required)
    *   `imageUrl` (URL, Required)
    *   `category` (String, size: 100, Required)
    *   `stock` (Integer, Required)
    *   `features` (String, size: 255, Array: Yes, Not Required)

#### Collection 2: Orders
*   **Name:** Orders
*   **Collection ID:** `orders`
*   **Permissions:** Go to Settings -> Permissions. Add `Users` and check **Create** and **Read**.
*   **Attributes:**
    *   `userId` (String, size: 255, Required)
    *   `items` (String, size: 10000, Required) - *Stores JSON stringified cart data*
    *   `totalAmount` (Double, Required)
    *   `discountCode` (String, size: 50, Not Required)
    *   `status` (String, size: 50, Required) - *e.g., 'pending', 'processing'*
    *   `shippingAddress` (String, size: 1000, Required)

#### Collection 3: Discounts
*   **Name:** Discounts
*   **Collection ID:** `discounts`
*   **Permissions:** Go to Settings -> Permissions. Add `Any` and check **Read**.
*   **Attributes:**
    *   `code` (String, size: 50, Required)
    *   `discountPercentage` (Double, Required) - *e.g., 15 for 15% off*
    *   `isActive` (Boolean, Required)

### 3. Add Sample Data
To see products on the frontend, add a few documents to the `products` collection in your Appwrite console. 
Example Product Document:
```json
{
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "price": 999.00,
  "description": "Titanium design. A17 Pro chip. Action button.",
  "imageUrl": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
  "category": "Premium Flagships",
  "stock": 50,
  "features": ["5G", "120Hz Display", "Titanium"]
}
```

To test the discount system, add a document to the `discounts` collection:
```json
{
  "code": "WELCOME10",
  "discountPercentage": 10,
  "isActive": true
}
```

---

## 🌐 Deployment

This project is optimized for deployment on **Cloudflare Pages**.

1. Push your code to a GitHub/GitLab repository.
2. Log in to the Cloudflare Dashboard and navigate to **Pages**.
3. Click **Create a project** -> **Connect to Git**.
4. Select your repository.
5. Configure the build settings:
   *   **Framework preset:** Vite
   *   **Build command:** `npm run build`
   *   **Build output directory:** `dist`
6. Click **Save and Deploy**.

Your modern phone store will be live globally in minutes!