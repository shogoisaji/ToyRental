'use client'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Rental from 'app/components/rental'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const RentalPage = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/')
    }

    return <Rental />
}

export default RentalPage
