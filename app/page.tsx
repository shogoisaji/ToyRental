'use client'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import List from 'app/components/list'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Home = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <div className="text-center text-xl">
            <List />
        </div>
    )
}

export default Home
