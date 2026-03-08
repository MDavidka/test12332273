import './style.css';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { Gallery } from './components/gallery';
import { About } from './components/about';
import { Contact } from './components/contact';
import { Footer } from './components/footer';

/**
 * Initializes the application by mounting all components to the DOM.
 * This function ensures that DOM manipulation only happens after the document is ready.
 */
export function init(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  
  if (!app) {
    console.error('Critical Error: Root element #app not found in the DOM.');
    return;
  }

  // Clear any existing content (useful for Vite HMR)
  app.innerHTML = '';

  // Ensure the app container takes up at least the full viewport height
  // and uses flexbox to push the footer to the bottom if content is short.
  app.className = 'min-h-screen flex flex-col w-full bg-[var(--color-bg)]';

  // Create a wrapper for the main content area
  const main = document.createElement('main');
  main.className = 'flex-grow flex flex-col w-full';

  try {
    // 1. Mount Header (Sticky navigation)
    app.appendChild(Header());

    // 2. Mount Main Content Sections
    main.appendChild(Hero());
    main.appendChild(Gallery());
    main.appendChild(About());
    main.appendChild(Contact());

    // Append main content to app
    app.appendChild(main);

    // 3. Mount Footer
    app.appendChild(Footer({ className: 'mt-auto' }));

  } catch (error) {
    console.error('Error mounting components:', error);
    app.innerHTML = `
      <div class="min-h-screen flex items-center justify-center text-[var(--color-text)]">
        <div class="text-center p-8 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
          <h2 class="text-2xl font-bold text-[var(--color-accent)] mb-4">Valami hiba történt</h2>
          <p>Az oldal betöltése sikertelen. Kérjük, frissítse a böngészőt!</p>
        </div>
      </div>
    `;
  }
}

// Safely bootstrap the application once the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}