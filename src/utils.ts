import { Flower, SiteConfig } from './types';

/**
 * Global site configuration
 */
export const siteConfig: SiteConfig = {
  title: 'Botanica',
  description: 'Fedezd fel a természet legszebb virágait és ismerd meg gondozásuk titkait.',
  navItems: [
    { label: 'Kezdőlap', href: '#home' },
    { label: 'Katalógus', href: '#catalog' },
    { label: 'Gondozási Tippek', href: '#care' },
  ],
};

/**
 * Mocked database of flowers
 */
export const flowers: Flower[] = [
  {
    id: 'f1',
    name: 'Rózsa',
    scientificName: 'Rosa',
    description: 'A kertek királynője, amely számtalan színben és formában pompázik. Illata és eleganciája miatt évszázadok óta a legnépszerűbb dísznövény.',
    imageUrl: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=800',
    properties: {
      bloomingSeason: 'Nyár',
      lightRequirement: 'Teljes napfény',
      waterRequirement: 'Közepes',
      difficulty: 'Középhaladó',
      symbolism: 'Szerelem, Szenvedély',
    },
  },
  {
    id: 'f2',
    name: 'Tulipán',
    scientificName: 'Tulipa',
    description: 'A tavasz egyik legkorábbi és legszínpompásabb hírnöke. Egyszerű, mégis elegáns formája minden kertet felvidít.',
    imageUrl: 'https://images.unsplash.com/photo-1520764836489-443b54f59c0a?auto=format&fit=crop&q=80&w=800',
    properties: {
      bloomingSeason: 'Tavasz',
      lightRequirement: 'Teljes napfény',
      waterRequirement: 'Közepes',
      difficulty: 'Kezdő',
      symbolism: 'Tökéletes szerelem',
    },
  },
  {
    id: 'f3',
    name: 'Napraforgó',
    scientificName: 'Helianthus annuus',
    description: 'Hatalmas, sárga virágzataival a nyár esszenciáját hozza el. Különlegessége, hogy virágai mindig a nap felé fordulnak.',
    imageUrl: 'https://images.unsplash.com/photo-1551893665-f843f600794e?auto=format&fit=crop&q=80&w=800',
    properties: {
      bloomingSeason: 'Nyár',
      lightRequirement: 'Teljes napfény',
      waterRequirement: 'Közepes',
      difficulty: 'Kezdő',
      symbolism: 'Imádat, Hűség',
    },
  },
  {
    id: 'f4',
    name: 'Orchidea',
    scientificName: 'Phalaenopsis',
    description: 'Egzotikus és lenyűgöző szobanövény, amely hosszan tartó virágzásával hálálja meg a gondoskodást. Különleges mikroklímát igényel.',
    imageUrl: 'https://images.unsplash.com/photo-1512722016694-2255830f1e4b?auto=format&fit=crop&q=80&w=800',
    properties: {
      bloomingSeason: 'Egész évben',
      lightRequirement: 'Félárnyék',
      waterRequirement: 'Alacsony',
      difficulty: 'Haladó',
      symbolism: 'Kifinomultság, Szépség',
    },
  },
  {
    id: 'f5',
    name: 'Levendula',
    scientificName: 'Lavandula',
    description: 'Jellegzetes illatú, lila virágú gyógynövény és dísznövény. Kiválóan bírja a szárazságot és vonzza a beporzó rovarokat.',
    imageUrl: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?auto=format&fit=crop&q=80&w=800',
    properties: {
      bloomingSeason: 'Nyár',
      lightRequirement: 'Teljes napfény',
      waterRequirement: 'Alacsony',
      difficulty: 'Kezdő',
      symbolism: 'Nyugalom, Tisztaság',
    },
  },
  {
    id: 'f6',
    name: 'Liliom',
    scientificName: 'Lilium',
    description: 'Fenséges megjelenésű, gyakran bódító illatú hagymás növény. Nagy, tölcsér alakú virágai a kertek igazi ékkövei.',
    imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&q=80&w=800',
    properties: {
      bloomingSeason: 'Nyár',
      lightRequirement: 'Félárnyék',
      waterRequirement: 'Közepes',
      difficulty: 'Középhaladó',
      symbolism: 'Tisztaság, Újjászületés',
    },
  }
];

/**
 * Utility function to get Tailwind color classes based on difficulty level
 * @param difficulty The difficulty level string
 * @returns Tailwind CSS classes for background and text color
 */
export function getDifficultyBadgeClasses(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'kezdő':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    case 'középhaladó':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'haladó':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
}

/**
 * Utility function to safely create a DOM element with classes
 * @param tag HTML tag name
 * @param classNames Array of CSS classes or a single string
 * @returns The created HTMLElement
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classNames?: string | string[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (classNames) {
    if (Array.isArray(classNames)) {
      el.classList.add(...classNames.filter(Boolean));
    } else {
      el.className = classNames;
    }
  }
  return el;
}