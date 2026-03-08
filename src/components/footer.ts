import { ComponentProps } from '../types';

export function Footer(props: ComponentProps): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = `bg-color-bg border-t border-color-muted py-6 text-center text-color-muted text-sm ${props.className || ''}`;
  footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} Phone Store. All rights reserved.</p>
  `;
  return footer;
}