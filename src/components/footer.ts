import type { ComponentProps } from '../types';
import { createElement, clearContainer } from '../utils';

/**
 * Renders the global footer component.
 * Contains copyright information and social links.
 * 
 * @param props Component initialization properties.
 */
export function renderFooter({ container }: ComponentProps): void {
  if (!container) return;

  // Clear previous footer content
  clearContainer(container);

  // Main footer wrapper
  const footer = createElement('footer', {
    className: 'w-full border-t border-slate-800 bg-slate-900/50 py-8 mt-auto transition-all duration-300'
  });

  const innerContainer = createElement('div', {
    className: 'container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4'
  });

  // --- Left Section: Copyright & Info ---
  const leftSection = createElement('div', {
    className: 'flex flex-col items-center md:items-start gap-1'
  });

  const currentYear = new Date().getFullYear();
  const copyrightText = createElement('p', {
    className: 'text-sm text-slate-400',
    text: `© ${currentYear} Marton David. All rights reserved.`
  });

  const techStackText = createElement('p', {
    className: 'text-xs text-slate-500 font-mono',
    text: 'Built with Vite, TypeScript & Tailwind'
  });

  leftSection.appendChild(copyrightText);
  leftSection.appendChild(techStackText);

  // --- Right Section: Social Links ---
  const rightSection = createElement('div', {
    className: 'flex items-center gap-5'
  });

  // GitHub Link
  const githubLink = createSocialLink(
    'https://github.com',
    'GitHub',
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />'
  );

  // LinkedIn Link
  const linkedinLink = createSocialLink(
    'https://linkedin.com',
    'LinkedIn',
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />'
  );

  // Email Link
  const emailLink = createSocialLink(
    'mailto:hello@marton.dev',
    'Email',
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />'
  );

  rightSection.appendChild(githubLink);
  rightSection.appendChild(linkedinLink);
  rightSection.appendChild(emailLink);

  // Assemble the footer
  innerContainer.appendChild(leftSection);
  innerContainer.appendChild(rightSection);
  footer.appendChild(innerContainer);
  container.appendChild(footer);
}

/**
 * Helper function to create a standardized social media icon link.
 * 
 * @param url The destination URL.
 * @param label The aria-label for accessibility.
 * @param svgPath The inner SVG path string.
 * @returns An HTMLAnchorElement containing the SVG icon.
 */
function createSocialLink(url: string, label: string, svgPath: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', label);
  link.className = 'text-slate-400 hover:text-cyan-400 transition-colors duration-200';

  // Create SVG element
  // Note: We use innerHTML here for simplicity with static, trusted SVG paths.
  // In a larger app, a dedicated Icon component or createElementNS would be preferred.
  link.innerHTML = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      class="w-5 h-5"
      aria-hidden="true"
    >
      ${svgPath}
    </svg>
  `;

  return link;
}