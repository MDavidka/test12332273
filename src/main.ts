import './style.css';
import { renderHeader } from './components/header';
import { renderHero } from './components/hero';
import { renderPlantGallery } from './components/plant-gallery';
import { renderFeatures } from './components/features';
import { renderFooter } from './components/footer';

/**
 * Bootstraps the application by initializing all components
 * and mounting them to the root DOM element.
 */
function bootstrap(): void {
  // 1. Safely grab the root element
  const app = document.getElementById('app');
  if (!app) {
    console.error('Critical Error: Root element #app not found in the DOM.');
    return;
  }

  // Optional: Add a base layout class to the app container to ensure footer sticks to bottom
  app.className = 'min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] font-sans';

  // 2. Create isolated containers for each component to prevent innerHTML conflicts
  
  // Header
  const headerContainer = document.createElement('div');
  headerContainer.id = 'header-wrapper';
  app.appendChild(headerContainer);

  // Main Content
  const mainContainer = document.createElement('main');
  mainContainer.id = 'main-content';
  mainContainer.className = 'flex-grow flex flex-col';
  app.appendChild(mainContainer);

  // Main -> Hero
  const heroContainer = document.createElement('div');
  heroContainer.id = 'hero-wrapper';
  mainContainer.appendChild(heroContainer);

  // Main -> Plant Gallery
  const galleryContainer = document.createElement('div');
  galleryContainer.id = 'gallery-wrapper';
  mainContainer.appendChild(galleryContainer);

  // Main -> Features
  const featuresContainer = document.createElement('div');
  featuresContainer.id = 'features-wrapper';
  mainContainer.appendChild(featuresContainer);

  // Footer
  const footerContainer = document.createElement('div');
  footerContainer.id = 'footer-wrapper';
  footerContainer.className = 'mt-auto';
  app.appendChild(footerContainer);

  // 3. Render all components into their respective containers
  try {
    renderHeader(headerContainer);
    renderHero(heroContainer);
    renderPlantGallery(galleryContainer);
    renderFeatures(featuresContainer);
    renderFooter(footerContainer);
  } catch (error) {
    console.error('Error rendering components:', error);
    // Fallback error state
    app.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <div class="text-center p-8 bg-white rounded-2xl shadow-sm border border-red-100 max-w-md">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h1 class="text-xl font-bold text-stone-800 mb-2">Something went wrong</h1>
          <p class="text-stone-600 text-sm">We couldn't load the store. Please refresh the page and try again.</p>
        </div>
      </div>
    `;
  }
}

// Initialize the app once the script loads
// (Since type="module" is used in index.html, the DOM is already parsed)
bootstrap();