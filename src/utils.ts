import { Plant, SiteConfig, NavItem, CareLevel } from './types';

/**
 * Global Site Configuration
 */
export const siteConfig: SiteConfig = {
  storeName: 'Verdant Haven',
  tagline: 'Bring nature indoors with our curated collection of house plants.',
  email: 'hello@verdanthaven.com',
  phone: '(555) 123-4567',
  address: '123 Botanical Way, Portland, OR 97204',
  hours: {
    weekdays: '10:00 AM - 7:00 PM',
    weekends: '11:00 AM - 5:00 PM'
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com'
  }
};

/**
 * Main Navigation Items
 */
export const navItems: NavItem[] = [
  { label: 'Shop Plants', href: '#catalog' },
  { label: 'Why Us', href: '#features' },
  { label: 'Contact', href: '#footer' }
];

/**
 * Static Plant Catalog Inventory
 */
export const plants: Plant[] = [
  {
    id: 'p1',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&q=80&w=800',
    careLevel: 'Moderate',
    lightRequirement: 'Bright Indirect',
    description: 'Famous for its natural leaf holes, the Swiss Cheese Plant is a stunning statement piece for any bright room.',
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    price: 28.00,
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1b7e?auto=format&fit=crop&q=80&w=800',
    careLevel: 'Easy',
    lightRequirement: 'Low Light',
    description: 'Virtually indestructible. Perfect for beginners and known for its excellent air-purifying qualities.',
    isFeatured: true
  },
  {
    id: 'p3',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    price: 65.00,
    imageUrl: 'https://images.unsplash.com/photo-1597055958656-2b11b05a8d1d?auto=format&fit=crop&q=80&w=800',
    careLevel: 'Advanced',
    lightRequirement: 'Bright Indirect',
    description: 'A popular indoor tree with large, violin-shaped leaves. Requires consistent care and stable environments.',
    isFeatured: false
  },
  {
    id: 'p4',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    price: 32.00,
    imageUrl: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&q=80&w=800',
    careLevel: 'Easy',
    lightRequirement: 'Low Light',
    description: 'With its wide, dark green leaves, the ZZ plant is highly tolerant of neglect and low light conditions.',
    isFeatured: true
  },
  {
    id: 'p5',
    name: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    price: 22.00,
    imageUrl: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&q=80&w=800',
    careLevel: 'Easy',
    lightRequirement: 'Bright Indirect',
    description: 'A fast-growing trailing vine that is incredibly easy to care for. Looks beautiful in hanging baskets.',
    isFeatured: false
  },
  {
    id: 'p6',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    price: 38.00,
    imageUrl: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&q=80&w=800',
    careLevel: 'Moderate',
    lightRequirement: 'Low Light',
    description: 'Features elegant white blooms and dark green foliage. It will dramatically droop to tell you when it needs water.',
    isFeatured: false
  }
];

/**
 * Utility: Format a number as USD currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 * Utility: Get Tailwind classes for care level badges
 */
export function getCareLevelBadgeClasses(level: CareLevel): string {
  switch (level) {
    case 'Easy':
      return 'bg-secondary/20 text-primary-light';
    case 'Moderate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-accent/20 text-accent-hover';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Utility: Safely escape HTML to prevent XSS when rendering strings
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}