import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Sprout} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [

    {
        title: 'Plantas',
        href: '/plantas',
        icon: Sprout,
    },
];


export function AppSidebar() {
    return (
        <div >
            <Sidebar collapsible="icon" variant="inset" className='bg-emerald-400'>
                
                <SidebarContent className='bg-emerald-400 pt-5'>
                    <NavMain items={mainNavItems} />
                </SidebarContent>

                <SidebarFooter className='bg-emerald-400'>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}
