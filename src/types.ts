export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  price: number;
  image: string;
  description: string;
  careLevel: 'Easy' | 'Medium' | 'Hard';
  lightRequirement: string;
  waterRequirement: string;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  orderComplete: boolean;
}

export type StateChangeListener = (state: StoreState) => void;

export interface PaymentDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface ComponentProps {
  className?: string;
}

export interface HeaderProps extends ComponentProps {
  siteName: string;
  onCartClick: () => void;
}

export interface ProductCardProps extends ComponentProps {
  plant: Plant;
  onAddToCart: (plant: Plant) => void;
}

export interface ProductListProps extends ComponentProps {
  plants: Plant[];
  onAddToCart: (plant: Plant) => void;
}

export interface CartProps extends ComponentProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (plantId: string) => void;
  onUpdateQuantity: (plantId: string, quantity: number) => void;
  onCheckoutClick: () => void;
}

export interface CheckoutProps extends ComponentProps {
  isOpen: boolean;
  totalAmount: number;
  onClose: () => void;
  onPaymentSubmit: (details: PaymentDetails) => Promise<void>;
}