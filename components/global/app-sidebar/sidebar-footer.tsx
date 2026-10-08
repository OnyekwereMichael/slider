'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { User } from '@/lib/generated/prisma'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { buySubscription } from '@/app/actions/lemonSqueezy'
import { toast } from 'sonner'

const SidebarBottom = ({ user }: { user: User }) => {
    const { isLoaded, isSignedIn } = useUser()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    if (!isLoaded || !isSignedIn) {
        return null
    }

    const handleUpgrading = async () => {
        setLoading(true)
        try {
            const res = await buySubscription(user.id)
            if (res.status !== 200) {
                throw new Error('Failed to upgrade subscription')
            }
            window.location.href = res.url
        } catch (error) {
            console.error(error)
            toast.error('Error', {
                description: 'Something went wrong. Pls try later..'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className='flex flex-col gap-y-3 items-start group-data-[collapsible=icon]:hidden'>
                    {!user?.subscription && (
                        <div className='flex flex-col items-start p-2 pb-3 gap-6  rounded-lg'>
                            <div className='flex flex-col items-start gap-1'>
                                <p className='text-base font-semibold'>
                                    Get <span className='text-vivid'>Creative AI</span>
                                </p>
                                <span className='text-[13px] dark:text-secondary'>
                                    Unlock all features including AI and more
                                </span>
                            </div>

                            <div className='w-full bg-vivid-gradient p-[1px] rounded-full'>
                                <Button
                                    className='w-full border-vivid bg-background cursor-pointer text-primary rounded-full font-medium'
                                    variant={'default'}
                                    size={'lg'}
                                    onClick={handleUpgrading}
                                >
                                    {loading ? <Loader2 className='animate-spin' /> : "Upgrade"}
                                </Button>
                            </div>
                        </div>
                    )}

                    <SidebarMenuButton
                        size={'lg'}
                        className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                    >
                        <UserButton />
                        <div className='grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
                            <span className='truncate'>{user?.name}</span>
                            <span className="truncate text-secondary opacity-80">
                                {user?.email}
                            </span>
                        </div>
                    </SidebarMenuButton>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default SidebarBottom