export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  navItems: NavItem[];
}

export interface ComponentProps {
  className?: string;
}