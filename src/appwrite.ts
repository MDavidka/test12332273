import { Client, Account, Databases, ID } from 'appwrite';

/**
 * Initialize the Appwrite Client
 * This connects the frontend to the Appwrite backend project.
 */
const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69c2b4a10015a5c19a9f');

/**
 * Export Appwrite services for use across the application
 */
export const account = new Account(client);
export const databases = new Databases(client);
export { client, ID };

/**
 * Database and Collection IDs
 * IMPORTANT: These IDs must match the ones created in the Appwrite Console.
 * 
 * Database: phone_store_db
 * Collections:
 * - products: Stores phone and accessory data.
 * - orders: Stores customer orders and checkout history.
 * - discounts: Stores promotional codes and their percentage values.
 */
export const DATABASE_ID = 'phone_store_db';
export const COLLECTION_PRODUCTS = 'products';
export const COLLECTION_ORDERS = 'orders';
export const COLLECTION_DISCOUNTS = 'discounts';