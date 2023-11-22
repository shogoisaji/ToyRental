import Image from 'next/image'
import Link from 'next/link'
import {
    ArchiveBoxIcon,
    ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline'
import { Json } from 'app/lib/database.types'

type Toy = {
    created_at: string
    description: string | null
    id: string
    images: Json | null
    is_rented: boolean
    price: number
    product_name: string
}

type ToyCardProps = {
    toy: Toy
}

export const ListCard: React.FC<ToyCardProps> = ({ toy }) => {
    const decodeImages = (): Array<string> | null => {
        if (toy.images && typeof toy.images === 'string') {
            return JSON.parse(toy.images)
        }
        return ['/no_image.png']
    }

    return (
        <div className="m-2 shadow-xl shadow-black-900 max-w-sm rounded-xl bg-custom-blue5">
            <Link href={`/toys/${toy.id}/detail`}>
                <div
                    className="rounded-t-xl overflow-hidden bg-white"
                    style={{
                        width: '100%',
                        height: '300px',
                        position: 'relative',
                    }}
                >
                    <Image
                        src={toy.images ? decodeImages()![0] : '/no_image.png'}
                        alt={toy.product_name}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                <div className="flex flex-col justify-between p-5">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                            {toy.product_name}
                        </h5>
                        <p className="overflow-hidden h-20 mb-5 font-normal text-gray-300">
                            {toy.description}
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        {toy.is_rented ? (
                            <ArchiveBoxXMarkIcon className="inline-block text-red-500 w-7 h-7 mr-3" />
                        ) : (
                            <ArchiveBoxIcon className="inline-block text-custom-blue7 w-7 h-7 mr-3" />
                        )}

                        <div className="text-white">
                            <span className="text-white text-lg">￥</span>
                            {toy.price}
                            <span className="text-white text-sm"> / Day</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
