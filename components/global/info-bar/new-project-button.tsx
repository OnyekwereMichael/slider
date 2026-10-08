'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Plus, Image as ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/generated/prisma'

const NewProjectButton = ({ user }: { user: User }) => {
    const router = useRouter()

    const handleCreateProject = () => {
        router.push('/project/new')
    }

    const canCreateProject = user.subscription

    return (
        <Button
            variant={'default'}
            disabled={!canCreateProject}
            onClick={() => router.push('/create-page')}
            className='bg-white rounded-lg hover:bg-background-80  font-medium cursor-pointer! border border-border/60 text-black'>
            <Plus className='h-4 w-4 ' />
            New Project
        </Button>
    )
}

export default NewProjectButton