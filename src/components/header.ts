import type { ComponentProps } from '../types';
import { createElement, clearContainer } from '../utils';
import { logoutUser } from '../firebase';

/**
 * Renders the global header navigation.
 * Handles dynamic UI updates based on the user's authentication state.
 * 
 * @param props Component initialization properties including state and callbacks.
 */
export function renderHeader({ container, state, onViewChange }: ComponentProps): void {
  if (!container) return;

  // Clear previous header content to prevent duplication on re-renders
  clearContainer(container);

  // Create main header wrapper with glassmorphism effect
  const header = createElement('header', {
    className: 'sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md transition-all duration-300'
  });

  const innerContainer = createElement('div', {
    className: 'container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl'
  });

  // --- Logo Section ---
  const logoContainer = createElement('div', {
    className: 'flex items-center gap-2 cursor-pointer group'
  });
  
  const logoText = createElement('span', {
    className: 'text-xl font-mono font-bold text-gradient group-hover:opacity-80 transition-opacity',
    text: 'Marton.Dev'
  });

  logoContainer.appendChild(logoText);
  
  // Navigate to welcome page on logo click
  logoContainer.addEventListener('click', () => {
    if (onViewChange) onViewChange('welcome');
  });

  // --- Navigation & Auth Section ---
  const nav = createElement('nav', {
    className: 'flex items-center gap-4 sm:gap-6'
  });

  if (state?.isAuthLoading) {
    // Show a loading skeleton while Firebase checks auth state
    const skeleton = createElement('div', {
      className: 'w-24 h-9 bg-slate-800 rounded-md animate-pulse'
    });
    nav.appendChild(skeleton);
    
  } else if (state?.user) {
    // Authenticated State UI
    
    // Dashboard Link (Only visible when logged in)
    const dashboardBtn = createElement('button', {
      className: 'text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors',
      text: 'Dashboard'
    });
    dashboardBtn.addEventListener('click', () => {
      if (onViewChange) onViewChange('dashboard');
    });

    // User Greeting (Hidden on very small screens to save space)
    const userGreeting = createElement('span', {
      className: 'text-sm text-slate-400 hidden sm:inline-block font-medium border-l border-slate-700 pl-6',
      text: state.user.email || 'Developer'
    });

    // Logout Button
    const logoutBtn = createElement('button', {
      className: 'btn-ghost text-sm',
      text: 'Sign Out'
    });
    
    logoutBtn.addEventListener('click', async () => {
      try {
        logoutBtn.textContent = 'Signing out...';
        logoutBtn.setAttribute('disabled', 'true');
        logoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
        
        await logoutUser();
        
        // Redirect to welcome page after successful logout
        if (onViewChange) onViewChange('welcome');
      } catch (error) {
        console.error('Failed to log out:', error);
        logoutBtn.textContent = 'Sign Out';
        logoutBtn.removeAttribute('disabled');
        logoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    });

    nav.appendChild(dashboardBtn);
    nav.appendChild(userGreeting);
    nav.appendChild(logoutBtn);
    
  } else {
    // Unauthenticated State UI
    const loginBtn = createElement('button', {
      className: 'btn-primary text-sm py-2 px-6',
      text: 'Login'
    });
    
    loginBtn.addEventListener('click', () => {
      if (onViewChange) onViewChange('login');
    });

    nav.appendChild(loginBtn);
  }

  // Assemble the header
  innerContainer.appendChild(logoContainer);
  innerContainer.appendChild(nav);
  header.appendChild(innerContainer);
  container.appendChild(header);
}