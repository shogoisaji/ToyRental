'use client'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import SignUp from 'app/components/signup'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SignUpPage = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

    return <SignUp />
}

export default SignUpPage
