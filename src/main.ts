import './style.css';
import { renderHeader } from './components/header';
import { renderHero } from './components/hero';
import { renderFeatureSpecs } from './components/featureSpecs';
import { renderProductGrid } from './components/productGrid';
import { renderFooter } from './components/footer';
import { renderCartModal } from './components/cartModal';

/**
 * Initializes the application by rendering all UI components.
 * This function acts as the main orchestrator for the DOM structure.
 */
export function init(): void {
  // 1. Find the root application container
  const appContainer = document.getElementById('app');
  
  if (!appContainer) {
    console.error('Critical Error: Root element with id "app" not found in the DOM.');
    return;
  }

  // 2. Clear any existing content (useful for HMR during development)
  appContainer.innerHTML = '';

  // 3. Create a main wrapper for the page content
  // This ensures the footer is pushed to the bottom if content is short
  const mainContent = document.createElement('main');
  mainContent.className = 'flex-grow flex flex-col w-full';

  // 4. Render Components in order
  
  // Render the global header/navigation at the top of the app
  renderHeader(appContainer);
  
  // Render the main landing page sections into the <main> tag
  renderHero(mainContent);
  renderFeatureSpecs(mainContent);
  renderProductGrid(mainContent);
  
  // Append the main content area to the app container
  appContainer.appendChild(mainContent);
  
  // Render the global footer at the bottom of the app
  renderFooter(appContainer);

  // 5. Render global overlays/modals
  // The cart modal is appended directly to the body to ensure it sits above all other z-indexes
  renderCartModal(document.body);

  // 6. Setup global event listeners (e.g., smooth scrolling for anchor links)
  setupSmoothScrolling();
}

/**
 * Sets up smooth scrolling for all internal anchor links on the page.
 */
function setupSmoothScrolling(): void {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e: Event) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href')?.substring(1);
      if (!targetId) return;
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Account for sticky header height (approx 80px)
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Bootstrap the application safely
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already ready
  init();
}