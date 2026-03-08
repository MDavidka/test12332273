import { ComponentProps } from '../types';

interface SearchBarProps extends ComponentProps {
  onSearch: (query: string) => void;
}

export function SearchBar(props: SearchBarProps): HTMLElement {
  const searchBar = document.createElement('div');
  searchBar.className = `mb-4 ${props.className || ''}`;
  searchBar.innerHTML = `
    <input type="text" placeholder="Search products..." class="w-full px-4 py-2 rounded-md border border-color-muted focus:outline-none focus:border-color-primary">
  `;

  const input = searchBar.querySelector('input') as HTMLInputElement;
  input.addEventListener('input', () => {
    props.onSearch(input.value);
  });

  return searchBar;
}