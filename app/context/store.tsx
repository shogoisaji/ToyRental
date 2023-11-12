import { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  productID: string;
  productName: string;
  productImage: string[];
  quantity: number;
};

export const CartContext = createContext<(newItem: CartItem) => void>(() => {});

// export function useCartContext() {
//   return useContext(CartContext);
// }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setisLoading] = useState(false);

  async function addToCart(newItem: CartItem) {
    setisLoading(true);
    // empty cart
    if (cart.length === 0) {
      setCart([...cart, newItem]);
    } else {
      setCart([newItem]);
    }
    setisLoading(false);
  }

  return (
    <CartContext.Provider value={addToCart}>{children}</CartContext.Provider>
  );
}
