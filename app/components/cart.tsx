'use client'

import { useContext } from 'react'
import { CartContext } from 'app/context/store'
import { CartItemCard } from 'app/components/cartItemCard'
import Link from 'next/link'

export const Cart = () => {
    const contextValue = useContext(CartContext)
    const cartItems = contextValue.cartItems

    const getTotalPrice = (): number => {
        let totalPrice: number = 0
        cartItems.forEach((item) => {
            totalPrice += item.productPrice * item.quantity
        })
        return totalPrice
    }

    const cartAmount = (): number => {
        let amount: number = 0
        cartItems.forEach((item) => {
            amount += item.quantity
        })
        return amount
    }

    return (
        <div className="flex w-full">
            <div className="flex flex-col items-center justify-center w-full h-full px-2">
                {/* <div className="w-full max-w-md p-4 rounded-lg shadow sm:p-8 bg-gray-400"> */}
                {cartItems
                    ? cartItems.map((toy) => (
                          <CartItemCard key={toy.productID} toy={toy} />
                      ))
                    : null}
                {/* </div> */}
            </div>
            <div className="flex flex-col h-screen bg-blue-400 w-96">
                <div className="flex flex-col rounded-xl bg-gray-200 p-4 m-6">
                    <div className="flex flex-col m-2">
                        <div className="text-xl">小計（税込）</div>
                        <div className="text-3xl mt-2 p-2 bg-white rounded-md">
                            ¥ {getTotalPrice()}
                        </div>
                    </div>
                    <div className="flex flex-col m-2">
                        <div className="text-xl">数量合計</div>
                        <div className="text-3xl mt-2 p-2 bg-white rounded-md">
                            {cartAmount()}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href="/cart/demo-end"
                            className="w-4/5 p-2 mt-4 bg-sky-500 text-white rounded-xl font-primary font-semibold text-xl flex
                       justify-center items-baseline  hover:bg-sky-600"
                        >
                            <button type="button" className="">
                                レジに進む
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
