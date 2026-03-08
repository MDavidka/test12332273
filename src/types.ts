/**
 * Represents the specific care and botanical properties of a flower.
 */
export interface FlowerProperties {
  /** The season(s) when the flower typically blooms (e.g., "Tavasz", "Nyár") */
  bloomingSeason: string;
  /** The amount of sunlight required (e.g., "Teljes napfény", "Félárnyék") */
  lightRequirement: string;
  /** The amount of water required (e.g., "Magas", "Közepes", "Alacsony") */
  waterRequirement: string;
  /** The level of experience needed to care for the plant */
  difficulty: 'Kezdő' | 'Középhaladó' | 'Haladó' | string;
  /** The symbolic meaning of the flower (e.g., "Szerelem", "Tisztaság") */
  symbolism?: string;
}

/**
 * Represents a single flower entry in the catalog.
 */
export interface Flower {
  /** Unique identifier for the flower */
  id: string;
  /** Common name of the flower in Hungarian (e.g., "Rózsa") */
  name: string;
  /** Latin/Scientific name of the flower (e.g., "Rosa") */
  scientificName: string;
  /** A short description of the flower */
  description: string;
  /** URL path to the image representing the flower */
  imageUrl: string;
  /** Detailed properties and care instructions */
  properties: FlowerProperties;
}

/**
 * Represents a navigation link item in the header/footer.
 */
export interface NavItem {
  /** The display text for the link */
  label: string;
  /** The URL or anchor link (e.g., "#catalog") */
  href: string;
}

/**
 * Global configuration for the website.
 */
export interface SiteConfig {
  /** The main title of the website */
  title: string;
  /** A short description or tagline for the website */
  description: string;
  /** Array of navigation items for the main menu */
  navItems: NavItem[];
}