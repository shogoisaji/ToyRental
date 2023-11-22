'use client'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Login from 'app/components/login'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

    return <Login />
}

export default LoginPage
