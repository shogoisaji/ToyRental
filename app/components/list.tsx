'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database, Json } from 'app/lib/database.types'
import { ListCard } from 'app/components/list-card'

type Toy = {
    created_at: string
    description: string | null
    id: string
    images: Json | null
    is_rented: boolean
    price: number
    product_name: string
}

const List = () => {
    const supabase = createClientComponentClient<Database>()
    const [toysList, setToysList] = useState<Toy[]>([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        getToys()
    }, [])

    const getToys = async () => {
        const { data: toys, error } = await supabase
            .from('toys')
            .select()
            .order('id', { ascending: false })
        if (error) {
            setMessage(error.message)
        } else {
            setToysList(toys)
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-center p-8">
            {toysList.map((toy) => (
                <ListCard toy={toy} key={toy.id} />
            ))}
        </div>
    )
}
export default List
