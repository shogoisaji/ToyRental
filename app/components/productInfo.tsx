import { Price } from 'app/components/price'

export const ProductInfo: React.FC<{
    name: string
    description: string
    price: number
}> = ({ name, description, price }) => {
    return (
        <div className=" font-primary">
            <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
                {name}
            </h1>
            <p className="font-medium text-lg">{description}</p>
            <div className="flex items-end text-2xl font-medium text-black mt-2">
                ¥ <div className="text-4xl px-2">{price}</div> / Day
            </div>
        </div>
    )
}
