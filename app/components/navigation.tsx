'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useContext } from 'react'
import useStore from 'store'
import { Database } from 'app/lib/database.types'
import { CartContext } from 'app/context/store'
type UserType = Database['public']['Tables']['profiles']['Row']

type CartItem = {
    productID: string
    productName: string
    productImage: string[]
    quantity: number
}

const Navigation = ({
    session,
    user,
}: {
    session: Session | null
    user: UserType | null
}) => {
    const { setUser } = useStore()

    // const { cartItems }:{ cartItems:CartItem[] } = useContext(CartContext)
    const contextValue = useContext(CartContext)
    const cartItems = contextValue.cartItems

    const cartAmount = (): number => {
        let amount: number = 0
        cartItems.forEach((item) => {
            amount += item.quantity
        })
        return amount
    }

    // set user from session
    useEffect(() => {
        setUser({
            id: session ? session.user.id : '',
            email: session ? session.user.email! : '',
            avatar_url: session && user ? user.avatar_url : '',
            name: session && user ? user.name : '',
            is_admin: session && user ? user.is_admin : false,
        })
    }, [session, setUser, user])

    return (
        <header className="shadow-md shadow-black-600 bg-custom-blue2">
            <div className="py-5 px-10 container max-w-screen-xl mx-auto flex items-center justify-between">
                <Link
                    href="/"
                    className="font-bold text-3xl cursor-pointer text-white"
                >
                    Toy Rental
                </Link>

                <div className="text-sm font-bold">
                    {session ? (
                        <div className="flex items-center space-x-5 text-white text-lg">
                            <Link href="/">HOME</Link>
                            <Link href="/">RENTAL</Link>
                            <Link href="/cart" className="flex">
                                CART
                                <div className="px-2 ml-1 bg-white text-black text-lg items-center rounded-2xl">
                                    {cartAmount()}
                                </div>
                            </Link>
                            <Link href="/settings/profile">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={
                                            user!.avatar_url
                                                ? user!.avatar_url
                                                : '/avatars/avatar1.png'
                                        }
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="rounded-full object-cover"
                                        alt="avatar"
                                        priority={true}
                                    />
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-5">
                            <Link href="/auth/login">ログイン</Link>
                            <Link href="/auth/signup">サインアップ</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navigation
