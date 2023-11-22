'use client'

import Image from 'next/image'

import { Json } from 'app/lib/database.types'

type CartItem = {
    productID: string
    productName: string
    productPrice: number
    productImage: string[]
    quantity: number
}

type ToyCardProps = {
    toy: CartItem
}

export const CartItemCard: React.FC<ToyCardProps> = ({ toy }) => {
    return (
        <div className="w-full max-w-2xl p-4 mt-2 rounded-2xl shadow sm:mt-6 sm:p-6 bg-blue-600">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Image
                        className="w-24 h-24 bg-white rounded-xl object-cover mr-2"
                        src={toy.productImage[0]}
                        alt={toy.productName}
                        style={{ objectFit: 'contain' }}
                    />
                    <div className="flex-col min-w-0 ms-4">
                        <div className="text-xl font-medium mb-4 text-gray-900 truncate dark:text-white">
                            {toy.productName}
                        </div>
                        <div className="text-xl font-medium text-gray-900 truncate dark:text-white">
                            ¥ {toy.productPrice} / Day
                        </div>
                    </div>
                </div>
                <div className="flex items-end text-4xl font-semibold p-4 rounded-xl text-black bg-white ">
                    {toy.quantity}
                    <div className="text-lg pl-2">個</div>
                </div>
            </div>
        </div>
    )
}
