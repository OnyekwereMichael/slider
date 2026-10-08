import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { User } from '@/lib/generated/prisma'
import React from 'react'
import InfoSearchBar from './info-searchbar'
import ThemeSwitcher from '../mode-toggle'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import NewProjectButton from './new-project-button'

const InfoBar = ({ user }: { user: User }) => {
    return (
        <header className='sticky top-0 z-[10] flex shrink-0 max-sm:flex-wrap items-center gap-2 border-b border-border/60 bg-background p-4 justify-between'>
            <SidebarTrigger className='ml-1' />
            {/* <Separator
                orientation="vertical"
                className='mr-2 h-4'
            /> */}

            <div className='w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap'>
                <InfoSearchBar />
                <ThemeSwitcher />
            </div>
            <div className='flex max-sm:flex-wrap gap-4 items-center justify-end'>
                <Button variant={'default'} className=' rounded-lg hover:bg-background-80  font-medium cursor-not-allowed border border-border/60'>
                    <Upload />
                    Import
                </Button>

                <NewProjectButton user={user} />

            </div>
        </header>
    )
}

export default InfoBar