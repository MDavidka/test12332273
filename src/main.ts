import './style.css';
import type { AppState, ViewState, ComponentProps } from './types';
import { subscribeToAuthChanges } from './firebase';
import { createElement, clearContainer } from './utils';

// Import Components
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderWelcome } from './components/welcome';
import { renderLogin } from './components/login';

/**
 * Global Application State
 */
const state: AppState = {
  user: null,
  currentView: 'welcome'
};

// Layout Containers
let headerContainer: HTMLElement | null = null;
let mainContainer: HTMLElement | null = null;
let footerContainer: HTMLElement | null = null;

/**
 * Initializes the application, sets up the DOM structure,
 * and subscribes to authentication changes.
 */
export function init(): void {
  const appRoot = document.getElementById('app');
  if (!appRoot) {
    console.error('Critical Error: Root element #app not found in index.html');
    return;
  }

  // Apply global layout styles to the root
  appRoot.className = 'min-h-screen flex flex-col bg-slate-900 text-slate-50 font-sans selection:bg-cyan-500/30';

  // Create persistent layout containers
  headerContainer = createElement('div', { className: 'w-full sticky top-0 z-50' });
  mainContainer = createElement('main', { className: 'w-full flex-grow flex flex-col relative' });
  footerContainer = createElement('div', { className: 'w-full mt-auto' });

  // Mount containers to root
  appRoot.appendChild(headerContainer);
  appRoot.appendChild(mainContainer);
  appRoot.appendChild(footerContainer);

  // Initial Render
  renderAppHeader();
  renderAppFooter();
  renderCurrentView();

  // Subscribe to Firebase Authentication State
  subscribeToAuthChanges((user) => {
    state.user = user;
    
    // Handle automatic routing based on auth state
    if (!user && state.currentView === 'dashboard') {
      // Kicked out of protected route
      state.currentView = 'welcome';
    } else if (user && state.currentView === 'login') {
      // Successfully logged in
      state.currentView = 'dashboard';
    }

    // Re-render UI to reflect new auth state
    renderAppHeader();
    renderCurrentView();
  });
}

/**
 * Handles view navigation and enforces route protection.
 * 
 * @param newView The target view to navigate to.
 */
function handleViewChange(newView: ViewState): void {
  // Route Protection: Prevent access to dashboard if not logged in
  if (newView === 'dashboard' && !state.user) {
    state.currentView = 'login';
  } else {
    state.currentView = newView;
  }

  // Scroll to top on view change
  window.scrollTo({ top: 0, behavior: 'smooth' });

  renderCurrentView();
  renderAppHeader(); // Re-render header to update active navigation states
}

/**
 * Renders the global Header component.
 */
function renderAppHeader(): void {
  if (!headerContainer) return;
  renderHeader({
    container: headerContainer,
    state,
    onViewChange: handleViewChange
  });
}

/**
 * Renders the global Footer component.
 */
function renderAppFooter(): void {
  if (!footerContainer) return;
  renderFooter({
    container: footerContainer,
    state,
    onViewChange: handleViewChange
  });
}

/**
 * Renders the main content area based on the current view state.
 */
function renderCurrentView(): void {
  if (!mainContainer) return;

  const props: ComponentProps = {
    container: mainContainer,
    state,
    onViewChange: handleViewChange
  };

  switch (state.currentView) {
    case 'welcome':
      renderWelcome(props);
      break;
    case 'login':
      // Redirect to dashboard if already authenticated
      if (state.user) {
        handleViewChange('dashboard');
        return;
      }
      renderLogin(props);
      break;
    case 'dashboard':
      // Double-check protection
      if (!state.user) {
        handleViewChange('login');
        return;
      }
      renderDashboard(props);
      break;
    default:
      renderWelcome(props);
  }
}

/**
 * Renders the Dashboard view (Protected Route).
 * Note: Implemented inline here as a simple placeholder for the gated content.
 * 
 * @param props Component initialization properties.
 */
function renderDashboard({ container, state }: ComponentProps): void {
  if (!container) return;
  clearContainer(container);

  const wrapper = createElement('div', {
    className: 'container mx-auto px-4 py-16 md:py-24 max-w-5xl animate-fade-in flex flex-col items-center text-center'
  });

  // Dashboard Header
  const badge = createElement('div', {
    className: 'inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono font-medium mb-6',
    text: 'Secure Connection Established'
  });

  const title = createElement('h2', {
    className: 'text-3xl md:text-5xl font-bold text-slate-50 mb-4',
    text: 'Client Dashboard'
  });

  const welcomeMsg = createElement('p', {
    className: 'text-lg text-slate-400 mb-12',
    text: `Welcome back, ${state?.user?.email || 'Client'}.`
  });

  // Dashboard Content Card
  const card = createElement('div', {
    className: 'glass-card w-full max-w-3xl p-8 md:p-12 relative overflow-hidden'
  });

  const glow = createElement('div', {
    className: 'absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-64 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none'
  });

  const cardIcon = createElement('div', {
    className: 'w-16 h-16 mx-auto bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 border border-slate-700/50'
  });
  cardIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-emerald-400">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  `;

  const cardTitle = createElement('h3', {
    className: 'text-xl font-semibold text-slate-200 mb-3 relative z-10',
    text: 'Private Workspace'
  });

  const cardText = createElement('p', {
    className: 'text-slate-400 relative z-10 max-w-lg mx-auto',
    text: 'This area is restricted to authenticated clients. In a full production environment, this dashboard would contain project files, interactive prototypes, and direct communication channels.'
  });

  card.appendChild(glow);
  card.appendChild(cardIcon);
  card.appendChild(cardTitle);
  card.appendChild(cardText);

  wrapper.appendChild(badge);
  wrapper.appendChild(title);
  wrapper.appendChild(welcomeMsg);
  wrapper.appendChild(card);

  container.appendChild(wrapper);
}

// Bootstrap the application once the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}