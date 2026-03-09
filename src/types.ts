/**
 * Represents a color variant for a phone model.
 */
export interface ColorOption {
  /** Unique identifier for the color */
  id: string;
  /** Display name of the color (e.g., "Titanium Black") */
  name: string;
  /** Hexadecimal color code for UI representation (e.g., "#1a1a1a") */
  hexCode: string;
}

/**
 * Represents a storage capacity option and its impact on pricing.
 */
export interface StorageOption {
  /** Storage capacity (e.g., "128GB", "512GB", "1TB") */
  capacity: string;
  /** Additional cost added to the base price of the phone */
  priceModifier: number;
}

/**
 * Detailed technical specifications for a phone model.
 */
export interface PhoneSpec {
  /** Display specifications (e.g., "6.7-inch OLED, 120Hz") */
  display: string;
  /** Processor/Chipset details (e.g., "A17 Pro Bionic" or "Snapdragon 8 Gen 3") */
  processor: string;
  /** RAM capacity (e.g., "8GB", "12GB") */
  ram: string;
  /** Camera system specifications */
  camera: {
    /** Main rear camera specs */
    main: string;
    /** Front-facing selfie camera specs */
    front: string;
    /** Key camera features (e.g., "Night Mode", "8K Video") */
    features: string[];
  };
  /** Battery capacity and charging details (e.g., "5000mAh, 65W Fast Charging") */
  battery: string;
  /** Operating system version out of the box */
  os: string;
}

/**
 * Represents a smartphone product available in the store.
 */
export interface PhoneModel {
  /** Unique identifier for the phone model */
  id: string;
  /** Product name (e.g., "Aura X1 Pro") */
  name: string;
  /** Short marketing catchphrase */
  tagline: string;
  /** Detailed product description */
  description: string;
  /** Starting price for the base storage model */
  basePrice: number;
  /** Product imagery URLs */
  images: {
    /** Primary image shown in grids and hero sections */
    main: string;
    /** Additional images for the product gallery */
    gallery: string[];
  };
  /** Available color variants */
  colors: ColorOption[];
  /** Available storage configurations */
  storageOptions: StorageOption[];
  /** Technical specifications */
  specs: PhoneSpec;
  /** Flag indicating if this is a newly released product */
  isNewRelease?: boolean;
  /** Flag indicating if this is the flagship model to be featured prominently */
  isFlagship?: boolean;
}

/**
 * Represents a single item added to the user's shopping cart.
 */
export interface CartItem {
  /** Unique identifier for this specific cart entry (to handle multiple configurations of the same phone) */
  cartItemId: string;
  /** The base phone model selected */
  phone: PhoneModel;
  /** The specific color chosen by the user */
  selectedColor: ColorOption;
  /** The specific storage capacity chosen by the user */
  selectedStorage: StorageOption;
  /** Number of units of this specific configuration */
  quantity: number;
  /** Calculated price per unit (basePrice + storage priceModifier) */
  unitPrice: number;
}

/**
 * Global application configuration settings.
 */
export interface AppConfig {
  /** The brand/site name */
  siteName: string;
  /** ISO 4217 currency code (e.g., "USD", "EUR") */
  currency: string;
  /** Currency symbol for UI display (e.g., "$", "€") */
  currencySymbol: string;
  /** Customer support email address */
  supportEmail: string;
  /** Links to brand social media profiles */
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

/**
 * Represents a navigation link used in headers or footers.
 */
export interface NavItem {
  /** Display text for the link */
  label: string;
  /** URL or anchor target */
  href: string;
  /** Whether the link should open in a new tab */
  isExternal?: boolean;
}