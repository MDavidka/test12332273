/**
 * Base interface for Appwrite documents
 */
export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[];
  $databaseId?: string;
  $collectionId?: string;
}

/**
 * Product Interface representing a phone or accessory
 */
export interface Product extends AppwriteDocument {
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'Premium Flagships' | 'Budget Friendly' | 'New Arrivals' | 'Accessories';
  stock: number;
  features?: string[]; // Array of feature strings (e.g., ["5G", "120Hz Display"])
}

/**
 * User Interface representing an authenticated customer
 */
export interface User {
  $id: string;
  name: string;
  email: string;
  phone?: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  prefs?: Record<string, any>;
}

/**
 * Cart Item Interface
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Order Status Type
 */
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Order Interface representing a completed checkout
 */
export interface Order extends AppwriteDocument {
  userId: string;
  items: string; // JSON stringified array of CartItem (simplifies Appwrite storage)
  totalAmount: number;
  discountCode?: string;
  status: OrderStatus;
  shippingAddress: string;
}

/**
 * Discount Interface for promotional codes
 */
export interface Discount extends AppwriteDocument {
  code: string;
  discountPercentage: number; // e.g., 15 for 15% off
  isActive: boolean;
}

/**
 * Generic Component Props Interface
 */
export interface ComponentProps {
  container: HTMLElement;
  [key: string]: any;
}

/**
 * Global Site Configuration
 */
export interface SiteConfig {
  name: string;
  description: string;
  currency: string;
  currencySymbol: string;
}

/**
 * Navigation Item Interface
 */
export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

/**
 * Global Application State
 */
export interface AppState {
  user: User | null;
  cart: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isAuthModalOpen: boolean;
}