export interface ComponentProps {
  /** Optional CSS classes to append to the component's root element */
  className?: string;
  /** Optional ID for the component's root element, useful for anchor links */
  id?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  /** SVG path or full SVG string for the social icon */
  iconSvg: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: OpeningHours[];
  socialLinks: SocialLink[];
}

export interface PlantCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  /** Optional list of features or plant types within this category */
  features?: string[];
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageUrl: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
}