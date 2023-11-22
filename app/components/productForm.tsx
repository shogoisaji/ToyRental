import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from 'app/context/store'
import Link from 'next/link'

type CartItem = {
    productID: string
    productName: string
    productImage: string[]
    quantity: number
}

export const ProductForm: React.FC<{
    id: string
    name: string
    price: number
    images: string[]
}> = ({ id, name, price, images }) => {
    const [quantity, setQuantity] = useState<number>(1)
    const { addToCart } = useContext(CartContext)

    async function handleAddToCart() {
        if (quantity !== 0) {
            addToCart({
                productID: id,
                productName: name,
                productPrice: price,
                productImage: images,
                quantity: quantity,
            })
        }
    }

    function updateQuantity(e: string) {
        if (e === '') {
            setQuantity(0)
        } else {
            setQuantity(Math.floor(Number(e)))
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-start space-x-2 w-full">
                <div className="flex flex-col items-start space-y-1 flex-grow-0">
                    <label className="text-gray-600 text-xl">Qty.</label>
                    <input
                        type="number"
                        inputMode="numeric"
                        id="quantity"
                        name="quantity"
                        min="1"
                        step="1"
                        value={quantity}
                        onChange={(e) => updateQuantity(e.target.value)}
                        className="text-gray-900 text-2xl pl-2 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                    />
                </div>
            </div>
            <Link href="/">
                <button
                    className="items-center justify-center py-2 mt-4 bg-blue-600 text-white w-full rounded-md font-primary font-semibold text-xl flex"
                    aria-label="cart-button"
                    onClick={handleAddToCart}
                >
                    Add To Cart
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="w-5 ml-2"
                    />
                </button>
            </Link>
        </div>
    )
}
