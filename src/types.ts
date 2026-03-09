/**
 * Shared TypeScript interfaces and type definitions for the application.
 */

export interface SiteConfig {
  title: string;
  author: string;
  role: string;
  description: string;
  socialLinks: SocialLink[];
  navItems: NavItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  iconSvg?: string;
}

export interface NavItem {
  id: string;
  label: string;
  action: 'navigate' | 'login' | 'logout';
  targetView?: ViewState;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
}

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export type ViewState = 'welcome' | 'login' | 'dashboard';

export interface AppState {
  user: AppUser | null;
  currentView: ViewState;
  isAuthLoading: boolean;
}

// Component Initialization Types
export interface ComponentProps {
  container: HTMLElement;
  state?: AppState;
  onViewChange?: ViewChangeHandler;
}

// Callback types for event handling and state updates
export type ViewChangeHandler = (view: ViewState) => void;
export type AuthChangeHandler = (user: AppUser | null) => void;
export type StateChangeHandler = (newState: AppState) => void;

// Skill representation for the welcome page
export interface TechSkill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'cloud';
  level?: number; // 1-100
}