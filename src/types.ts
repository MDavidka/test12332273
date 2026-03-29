/**
 * Plant Category Types
 */
export type PlantCategory = 'Indoor' | 'Outdoor' | 'Succulents' | 'Pet Friendly' | 'Rare';

/**
 * Plant Care Level Types
 */
export type CareLevel = 'Easy' | 'Medium' | 'Expert';

/**
 * Plant Interface representing a single plant product in the catalog
 */
export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  price: number;
  imageUrl: string;
  category: PlantCategory;
  careLevel: CareLevel;
  description: string;
  isFeatured?: boolean;
  isSoldOut?: boolean;
  lightRequirement?: string;
  waterRequirement?: string;
}

/**
 * Navigation Item Interface for header and footer links
 */
export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

/**
 * Generic Component Props Interface for rendering UI blocks
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
  contactEmail: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

/**
 * Store Feature Interface for the benefits/features section
 */
export interface StoreFeature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Represents the name of the Lucide icon to render
}