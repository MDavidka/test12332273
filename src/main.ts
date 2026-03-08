import './style.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { ProductList } from './components/product-list';
import { SearchBar } from './components/search-bar';
import { LoginForm } from './components/login-form';
import { Product } from './types';

const siteConfig = {
  name: 'Phone Store',
  description: 'Your one-stop shop for the latest phones.',
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};

const products: Product[] = [
  { id: '1', name: 'iPhone 13', description: 'The latest iPhone with A15 Bionic chip.', price: 999, image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Samsung Galaxy S21', description: 'The best Android phone with Snapdragon 888.', price: 899, image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Google Pixel 6', description: 'The purest Android experience with Google Tensor chip.', price: 799, image: 'https://via.placeholder.com/150' },
];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header({ siteName: siteConfig.name, navItems: siteConfig.navItems }).outerHTML}
  <main class="container mx-auto py-6">
    <h1 class="text-3xl font-bold mb-4">${siteConfig.name}</h1>
    <p class="text-color-muted">${siteConfig.description}</p>
    ${SearchBar({ onSearch: (query) => console.log('Search Query:', query) }).outerHTML}
    ${ProductList({ products }).outerHTML}
    ${LoginForm({ onSubmit: (email, password) => console.log('Login:', email, password) }).outerHTML}
  </main>
  ${Footer({}).outerHTML}
`;