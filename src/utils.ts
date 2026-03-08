import { Product } from './types';

/**
 * Formats a numeric value into a localized USD currency string.
 * 
 * @param amount - The numeric amount to format
 * @returns A formatted currency string (e.g., "$45.00")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Filters a list of products based on a search query matching name, description, or brand.
 * 
 * @param products - The array of products to filter
 * @param query - The search string
 * @returns A new array of filtered products
 */
export function filterProducts(products: Product[], query: string): Product[] {
  if (!query || query.trim() === '') {
    return products;
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Mock catalog data for the plant store.
 * We map the 'brand' field from the Product interface to represent the plant's category/family.
 */
export const mockPlants: Product[] = [
  {
    id: 'plant-1',
    name: 'Monstera Deliciosa',
    brand: 'Tropical',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=600&q=80',
    description: 'Famous for its natural leaf holes, the Monstera is a vibrant, easy-care tropical plant that makes a stunning statement in any room.',
    features: [
      'Light: Bright indirect light',
      'Water: Every 1-2 weeks',
      'Toxicity: Keep away from pets'
    ]
  },
  {
    id: 'plant-2',
    name: 'Snake Plant Laurentii',
    brand: 'Succulent',
    price: 30.00,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=600&q=80',
    description: 'One of the most resilient houseplants. It features stiff, sword-like leaves and is known for its excellent air-purifying qualities.',
    features: [
      'Light: Low to bright indirect light',
      'Water: Every 2-3 weeks',
      'Care Level: Very Easy'
    ]
  },
  {
    id: 'plant-3',
    name: 'Fiddle Leaf Fig',
    brand: 'Tree',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1597055905081-8b98861b3005?auto=format&fit=crop&w=600&q=80',
    description: 'A popular indoor tree featuring very large, heavily veined, and violin-shaped leaves that grow upright on a tall plant.',
    features: [
      'Light: Bright consistent light',
      'Water: When top soil is dry',
      'Humidity: Prefers high humidity'
    ]
  },
  {
    id: 'plant-4',
    name: 'ZZ Plant',
    brand: 'Araceae',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80',
    description: 'Characterized by its thick, waxy, dark green leaves. It is highly drought-tolerant and accepts low-light conditions gracefully.',
    features: [
      'Light: Low to bright indirect',
      'Water: Every 2-3 weeks',
      'Growth: Slow and steady'
    ]
  },
  {
    id: 'plant-5',
    name: 'Peace Lily',
    brand: 'Tropical',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=600&q=80',
    description: 'A beautiful indoor plant that produces elegant white flowers. It is excellent at communicating when it needs water by drooping slightly.',
    features: [
      'Light: Medium indirect light',
      'Water: Keep soil consistently moist',
      'Air Purifying: Yes'
    ]
  },
  {
    id: 'plant-6',
    name: 'Aloe Vera',
    brand: 'Succulent',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1596547609652-9cb5d8d737bf?auto=format&fit=crop&w=600&q=80',
    description: 'A stylish and practical succulent. The gel inside its thick leaves can be used to soothe burns and skin irritations.',
    features: [
      'Light: Bright direct or indirect light',
      'Water: Sparingly, allow to dry out completely',
      'Benefits: Medicinal properties'
    ]
  }
];