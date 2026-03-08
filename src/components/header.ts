import { NavItem, ComponentProps } from '../types';

interface HeaderProps extends ComponentProps {
  siteName: string;
  navItems: NavItem[];
}

export function Header(props: HeaderProps): HTMLElement {
  const header = document.createElement('header');
  header.className = `bg-white shadow-md ${props.className || ''}`;
  header.innerHTML = `
    <div class="container mx-auto py-4 px-6 flex items-center justify-between">
      <a href="/" class="text-2xl font-bold text-color-primary">${props.siteName}</a>
      <nav>
        <ul class="flex space-x-4">
          ${props.navItems.map(item => `<li><a href="${item.href}" class="text-color-text hover:text-color-primary">${item.label}</a></li>`).join('')}
        </ul>
      </nav>
      <a href="/login" class="text-color-text hover:text-color-primary">Login</a>
    </div>
  `;
  return header;
}