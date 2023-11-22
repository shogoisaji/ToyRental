'use client'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Detail } from 'app/components/detail'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const DetailPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return <Detail id={id} />
}

export default DetailPage
