'use client'
import { images } from "@/app/constant"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenuButton } from "@/components/ui/sidebar"
import { Project, User } from "@/lib/generated/prisma"
import Image from "next/image"

import { data } from "@/lib/constants"
import SidebarData from "../Sidebar"
import RecentOpen from "./recent-open"
import SidebarBottom from "./sidebar-footer"

const AppSidebar = ({ recentProjects, user, ...props }: {
    recentProjects: Project[],
    user: User
} & React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar
            collapsible="icon"
            className="max-w-[212px] bg-background"
            {...props}>
            <SidebarHeader className="pt-6 ml-[-45px] pb-0 border-b border-border/60">
                <SidebarMenuButton className="data-[state=open]:text-sidebar-accent-foreground" size={"lg"}>

                    <div className="flex  items-center justify-center  ">
                        <Image src={images.sliderLogo.src} alt="Slider" width={180} height={180} />
                    </div>
                    <span className="truncate text-primary text-3xl font-semibold"></span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className=" ">
                <SidebarData items={data.SidebarData} />
                <RecentOpen recentProjects={recentProjects} />
            </SidebarContent>
            <SidebarFooter>
                <SidebarBottom user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar