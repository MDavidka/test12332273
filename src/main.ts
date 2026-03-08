import './style.css';
import { renderHeader } from './components/header';
import { renderHero } from './components/hero';
import { renderFlowerCatalog } from './components/flower-catalog';
import { renderFooter } from './components/footer';

/**
 * Initializes the application by orchestrating the rendering of all components.
 * This function ensures the DOM is manipulated safely and sequentially.
 */
export function init(): void {
  // Locate the root element defined in index.html
  const app = document.getElementById('app');

  if (!app) {
    console.error('Critical Error: Root element #app not found. Please ensure index.html contains <div id="app"></div>');
    return;
  }

  // Clear any existing content (useful for Vite's Hot Module Replacement)
  app.innerHTML = '';

  // Apply base layout classes to the root element to ensure a sticky footer
  // and consistent global typography/colors based on our design tokens.
  app.className = 'min-h-screen flex flex-col bg-bg text-text font-body selection:bg-primary/20 selection:text-primary-hover transition-colors duration-300';

  // 1. Render the Global Header (Navigation)
  renderHeader(app);

  // 2. Create a semantic <main> container for the core page content
  // 'flex-grow' ensures it takes up available space, pushing the footer to the bottom
  const mainContent = document.createElement('main');
  mainContent.className = 'flex-grow flex flex-col w-full';
  app.appendChild(mainContent);

  // 3. Render the Page Sections into the <main> container
  renderHero(mainContent);
  renderFlowerCatalog(mainContent);

  // 4. Render the Global Footer
  renderFooter(app);
}

// Execute the initialization function
// Note: In a Vite module script, this runs after the HTML is parsed, 
// so the #app element is guaranteed to be available.
init();