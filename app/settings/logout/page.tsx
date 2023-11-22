'use client'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Logout from 'app/components/logout'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const LogoutPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return <Logout />
}

export default LogoutPage
