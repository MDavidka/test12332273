/**
 * Shared TypeScript interfaces and type definitions for the Flower Shop application.
 */

export interface ComponentProps {
  /** Optional CSS classes to append to the component's root element */
  className?: string;
  /** Optional ID for the component's root element */
  id?: string;
}

export type ProductCategory = 'csokrok' | 'dobozos' | 'cserepes' | 'kiegeszitok';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  /** Indicates if the product is currently in stock and available for delivery */
  isAvailable: boolean;
  /** Optional tags for filtering (e.g., 'valentin-nap', 'szuletesnap') */
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryDetails {
  recipientName: string;
  recipientPhone: string;
  city: string;
  zipCode: string;
  streetAddress: string;
  /** Requested date for delivery (YYYY-MM-DD format) */
  deliveryDate: string;
  /** Optional preferred time window (e.g., 'Délelőtt 8-12', 'Délután 12-16') */
  preferredTime?: string;
  /** Optional personal message to be included on a greeting card */
  personalMessage?: string;
  /** Any special instructions for the courier */
  specialInstructions?: string;
}

export interface CustomerDetails {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  /** If true, billing address is the same as delivery address */
  billingSameAsDelivery: boolean;
  billingCity?: string;
  billingZipCode?: string;
  billingStreetAddress?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  customerDetails: CustomerDetails;
  deliveryDetails: DeliveryDetails;
  status: OrderStatus;
  createdAt: string;
}

export interface StoreConfig {
  name: string;
  email: string;
  phone: string;
  currency: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
}