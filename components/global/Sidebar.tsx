'use client'
import React from 'react'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SidebarData = ({ items }: {
    items: {
        title: string;
        url: string;
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        isActive?: boolean
        items?: {
            title: string
            url: string
        }
    }[]
}) => {
    const pathname = usePathname()

    return (
        <SidebarGroup className='p-2'>
            <SidebarMenu className="space-y-2.5">
                {items.map((item) => {
                    const isActive = item.url === '/' ? pathname === '/' : pathname.includes(item.url);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                className={`
                                    w-full h-11 rounded-lg transition-all duration-200
                                    hover:bg-[#2A2D35] hover:text-white
                                    ${isActive ? 'bg-muted font-semibold text-primary' : 'text-muted-foreground'}
                                `}
                            >
                                <Link
                                    href={item.url}
                                    className="flex items-center gap-3 w-full h-full text-sm tracking-wide"
                                >
                                    {/* Icon container ensuring perfectly aligned, crisp icons */}
                                    <div className="flex items-center justify-center w-5 h-5 min-w-[20px]">
                                        <item.icon className="w-full h-full stroke-[1.75]" />
                                    </div>
                                    <span className="truncate">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup >
    )
}

export default SidebarData