import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Profile from 'app/components/profile'
import { Database } from 'app/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ProfilePage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return <Profile />
}

export default ProfilePage
