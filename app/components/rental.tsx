'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database, Json } from 'app/lib/database.types'
import useStore from 'store'

type Toy = {
    created_at: string
    description: string | null
    id: string
    images: Json | null
    is_rented: boolean
    price: number
    product_name: string
}

const Rental = () => {
    const supabase = createClientComponentClient<Database>()
    const [toysList, setToysList] = useState<Toy[]>([])
    const [message, setMessage] = useState('')
    const { user } = useStore()

    useEffect(() => {
        getToys()
    }, [])

    const getToys = async () => {
        const { data: toys, error } = await supabase
            .from('toys')
            .select('*')
            .order('id', { ascending: false })
        if (error) {
            setMessage(error.message)
        } else {
            setToysList(toys)
        }
    }

    //   const decodeImages = (): Array<string> | null => {
    //     if (toy.images && typeof toy.images === 'string') {
    //         return JSON.parse(toy.images)
    //     }
    //     return ['/no_image.png']
    // }

    return (
        <div>
            {toysList.map((toys) => (
                <div key={toys.id}>
                    <h2>{toys.product_name}</h2>
                    <p>{toys.description}</p>
                    {/* <Image
            src={toys.images ? toys.images[0] : "/avatars/avatar1.png"}
            alt={toys.product_name}
            width={100}
            height={100}
          /> */}
                </div>
            ))}
        </div>
    )
}
export default Rental
