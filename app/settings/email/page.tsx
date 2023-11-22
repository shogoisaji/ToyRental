import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Email from 'app/components/email'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const EmailPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return <Email email={session.user?.email || ''} />
}

export default EmailPage
