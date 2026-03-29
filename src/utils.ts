import { Plant } from './types';

/**
 * Formats a number into a localized currency string.
 * 
 * @param amount - The numeric amount to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale string (default: 'en-US')
 * @returns The formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Utility function to conditionally join CSS class names together.
 * Useful for Tailwind CSS dynamic classes.
 * 
 * @param classes - An array of class names or falsy values
 * @returns A space-separated string of valid class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Static mock data for the plant catalog.
 * Since this project does not require a database, this array serves as the 
 * primary source of truth for the products displayed on the website.
 */
export const PLANTS: Plant[] = [
  {
    id: 'plt-001',
    name: 'Monstera Deliciosa',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&q=80&w=800',
    category: 'Indoor',
    careLevel: 'Easy',
    description: 'Famous for its natural leaf holes, the Monstera is a vibrant, easy-care statement plant that brings a tropical feel to any space.',
    isPopular: true
  },
  {
    id: 'plt-002',
    name: 'Fiddle Leaf Fig',
    price: 65.00,
    imageUrl: 'https://images.unsplash.com/photo-1597055905081-8b9fcce0e422?auto=format&fit=crop&q=80&w=800',
    category: 'Indoor',
    careLevel: 'Medium',
    description: 'Features large, heavily veined, violin-shaped leaves that grow upright on a tall plant. A favorite among interior designers.',
    isPopular: true
  },
  {
    id: 'plt-003',
    name: 'Snake Plant',
    price: 30.00,
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1b7e?auto=format&fit=crop&q=80&w=800',
    category: 'Low Light',
    careLevel: 'Easy',
    description: 'One of the most tolerant plants out there. It can survive low light levels, drought, and generally being ignored.',
    isPopular: false
  },
  {
    id: 'plt-004',
    name: 'ZZ Plant',
    price: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&q=80&w=800',
    category: 'Low Light',
    careLevel: 'Easy',
    description: 'Characterized by its thick, waxy, green leaves. It is a great air purifier and highly resilient to varying conditions.',
    isPopular: true
  },
  {
    id: 'plt-005',
    name: 'Golden Pothos',
    price: 25.00,
    imageUrl: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&q=80&w=800',
    category: 'Trailing',
    careLevel: 'Easy',
    description: 'An easy-care trailing plant that can grow in a variety of lighting conditions. Perfect for hanging baskets or high shelves.',
    isPopular: false
  },
  {
    id: 'plt-006',
    name: 'Bird of Paradise',
    price: 85.00,
    imageUrl: 'https://images.unsplash.com/photo-1613739118925-cde1e8f5d65b?auto=format&fit=crop&q=80&w=800',
    category: 'Large',
    careLevel: 'Medium',
    description: 'A stunning tropical plant with large, glossy leaves that bring a lush, jungle vibe to any bright room.',
    isPopular: true
  },
  {
    id: 'plt-007',
    name: 'Peace Lily',
    price: 28.00,
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800',
    category: 'Flowering',
    careLevel: 'Easy',
    description: 'Known for its beautiful white blooms and excellent air-purifying qualities. Thrives in medium to low light.',
    isPopular: false
  },
  {
    id: 'plt-008',
    name: 'Rubber Plant',
    price: 40.00,
    imageUrl: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&q=80&w=800',
    category: 'Indoor',
    careLevel: 'Medium',
    description: 'Features striking, glossy burgundy leaves. A robust houseplant that can grow quite large with proper care.',
    isPopular: false
  }
];