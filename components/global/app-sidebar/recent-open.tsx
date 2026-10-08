"use client"
import { useSlideStore } from '@/app/store/useSlideStore'
import NothingHere from '@/app/utils/animations/NothingHere'
import { Button } from '@/components/ui/button'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Project } from '@/lib/generated/prisma'
import { JsonValue } from '@prisma/client/runtime/client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    recentProjects: Project[]
}
const RecentOpen = ({ recentProjects }: Props) => {
    const router = useRouter()
    const { setSlides } = useSlideStore()
    const handleClick = (projectId: string, slides: JsonValue) => {
        if (!projectId || !slides) {
            toast.error("No Project Found", {
                description: 'Please try again later',
            })
            return
        }
        setSlides(JSON.parse(JSON.stringify(slides)));
        router.push(`/presentation/${projectId}`)
    }
    return <SidebarGroup>
        <SidebarGroupLabel className='text-sm'>
            Recently Opened
        </SidebarGroupLabel>

        <SidebarMenu>
            {recentProjects?.length > 0 ? (
                recentProjects.map((project) => (
                    <SidebarMenuItem key={project.id}>
                        <SidebarMenuButton
                            asChild
                            tooltip={project.title}
                            className='hover:bg-[#2A2D35] cursor-pointer'
                        >
                            <Button
                                onClick={() => handleClick(project.id, project.slides)}
                                variant={"link"}
                                className='text-sm items-center justify-start'
                            >
                                <span>{project.title}</span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))
            ) : (
                // <p>No recent projects</p>
                <>
                    <NothingHere />
                </>
            )}
        </SidebarMenu>
    </SidebarGroup>
}

export default RecentOpen