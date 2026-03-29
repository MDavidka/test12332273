import './style.css';
import { renderHeader } from './components/header';
import { renderHero } from './components/hero';
import { renderCatalog } from './components/catalog';
import { renderFeatures } from './components/features';
import { renderFooter } from './components/footer';

/**
 * Initializes the application by setting up the DOM structure
 * and rendering all components in the correct order.
 */
export function initApp(): void {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Critical Error: Root element #app not found in the DOM.');
    return;
  }

  // Create semantic containers for our components to prevent innerHTML overwrites
  const headerContainer = document.createElement('div');
  const mainContainer = document.createElement('main');
  const heroContainer = document.createElement('div');
  const catalogContainer = document.createElement('div');
  const featuresContainer = document.createElement('div');
  const footerContainer = document.createElement('div');

  // Assemble the DOM structure
  mainContainer.appendChild(heroContainer);
  mainContainer.appendChild(catalogContainer);
  mainContainer.appendChild(featuresContainer);

  app.appendChild(headerContainer);
  app.appendChild(mainContainer);
  app.appendChild(footerContainer);

  // Render each component into its respective container
  renderHeader(headerContainer);
  renderHero(heroContainer);
  renderCatalog(catalogContainer);
  renderFeatures(featuresContainer);
  renderFooter(footerContainer);

  // Initialize smooth scrolling for anchor links
  setupSmoothScrolling();
}

/**
 * Sets up smooth scrolling for all internal anchor links
 */
function setupSmoothScrolling(): void {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e: Event) {
      e.preventDefault();
      
      const targetId = (this as HTMLAnchorElement).getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Safely execute the initialization when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}