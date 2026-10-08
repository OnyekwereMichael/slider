import { getRecentProjects } from '@/app/actions/project'
import { onAuthenticateUser } from '@/app/actions/user'
import AppSidebar from '@/components/global/app-sidebar'
import InfoBar from '@/components/global/info-bar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'

import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const recentProjects = await getRecentProjects()
    const checkUser = await onAuthenticateUser()

    if (!checkUser.user) {
        redirect('/sign-in')
    }
    return (
        <SidebarProvider>
            <AppSidebar
                recentProjects={recentProjects?.data || []}
                user={checkUser.user}
            />
            <SidebarInset>
                <InfoBar user={checkUser.user} />
                <div className='p-4'>
                    {children}
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout