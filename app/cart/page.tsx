'use client'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Cart } from 'app/components/cart'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const CartPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return <Cart />
}

export default CartPage
