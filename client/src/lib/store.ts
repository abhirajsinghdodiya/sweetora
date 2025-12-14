import { create } from 'zustand';
import { initialSweets, Sweet } from './data';

interface CartItem extends Sweet {
  quantity: number;
}

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface SweetStore {
  sweets: Sweet[];
  cart: CartItem[];
  user: User | null;
  login: (username: string, role: 'admin' | 'user') => void;
  register: (username: string) => void;
  logout: () => void;
  addToCart: (sweet: Sweet) => void;
  removeFromCart: (sweetId: number) => void;
  updateCartQuantity: (sweetId: number, delta: number) => void;
  clearCart: () => void;
  updateStock: (sweetId: number, newStock: number) => void;
  addSweet: (sweet: Omit<Sweet, 'id'>) => void;
  deleteSweet: (id: number) => void;
  updateSweet: (id: number, updates: Partial<Sweet>) => void;
}

export const useStore = create<SweetStore>((set) => ({
  sweets: initialSweets,
  cart: [],
  user: null,

  login: (username, role) => set({ user: { id: '1', username, role } }),
  register: (username) => set({ user: { id: '1', username, role: 'user' } }),
  logout: () => set({ user: null, cart: [] }),

  addToCart: (sweet) => set((state) => {
    const existing = state.cart.find(item => item.id === sweet.id);
    if (existing) {
      return {
        cart: state.cart.map(item => 
          item.id === sweet.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...sweet, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  updateCartQuantity: (id, delta) => set((state) => ({
    cart: state.cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        // Check stock limit
        const sweet = state.sweets.find(s => s.id === id);
        if (sweet && newQty > sweet.stock) return item;
        return { ...item, quantity: newQty };
      }
      return item;
    })
  })),

  clearCart: () => set({ cart: [] }),

  updateStock: (id, stock) => set((state) => ({
    sweets: state.sweets.map(s => s.id === id ? { ...s, stock } : s)
  })),

  addSweet: (sweet) => set((state) => ({
    sweets: [...state.sweets, { ...sweet, id: Math.max(0, ...state.sweets.map(s => s.id)) + 1 }]
  })),

  deleteSweet: (id) => set((state) => ({
    sweets: state.sweets.filter(s => s.id !== id)
  })),
  
  updateSweet: (id, updates) => set((state) => ({
    sweets: state.sweets.map(s => s.id === id ? { ...s, ...updates } : s)
  }))
}));
