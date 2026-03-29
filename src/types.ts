export type CareLevel = 'Easy' | 'Moderate' | 'Advanced';

export type LightRequirement = 'Low Light' | 'Bright Indirect' | 'Direct Sun';

export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  price: number;
  imageUrl: string;
  careLevel: CareLevel;
  lightRequirement: LightRequirement;
  description: string;
  isFeatured?: boolean;
}

export interface SiteConfig {
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ComponentProps {
  container: HTMLElement;
}