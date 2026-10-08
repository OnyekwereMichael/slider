export const dynamic = 'force-dynamic'

import { redirect } from "next/navigation"
import { onAuthenticateUser } from "../actions/user"


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const auth = await onAuthenticateUser()
    if (!auth.user) {
        redirect('/signin')
    }

    if (auth.status !== 200 && auth.status !== 201) {
        return <div>
            {children}
        </div>
    }
    return (
        <div className="w-full min-h-screen">
            {children}
        </div>
    )
}

export default Layout