'use client'

import { createContext, useState } from 'react'

type CartItem = {
    productID: string
    productName: string
    productPrice: number
    productImage: string[]
    quantity: number
}

type CartContextType = {
    cartItems: CartItem[]
    addToCart: (item: CartItem) => void
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: (item: CartItem) => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isLoading, setisLoading] = useState(false)

    const addToCart = async (newItem: CartItem) => {
        setisLoading(true)

        // 既存のアイテムを検索
        const existingItemIndex = cart.findIndex(
            (item) => item.productID === newItem.productID
        )

        // 既存のアイテムがある場合は数量を更新
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart]
            updatedCart[existingItemIndex] = {
                ...cart[existingItemIndex],
                quantity: cart[existingItemIndex].quantity + newItem.quantity,
            }
            setCart(updatedCart)
        } else {
            // 新しいアイテムをカートに追加
            setCart([...cart, newItem])
        }

        setisLoading(false)
    }

    return (
        <CartContext.Provider value={{ cartItems: cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}
