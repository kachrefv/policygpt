"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { LayoutDashboard, User, Moon, Sun, LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { User as AuthUser } from 'next-auth';

interface AppSidebarProps {
    user: AuthUser;
    className?: string;
}

export const AppSidebar = ({ user, className }: AppSidebarProps) => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/account', label: 'Account', icon: User },
    ];

    return (
        <aside className={cn("fixed inset-y-0 left-0 w-64 bg-ios-panel border-r flex-shrink-0 p-4 flex-col justify-between z-50 hidden lg:flex", className)}>
            <div>
                <div className="p-2 mb-8">
                    <Logo />
                </div>
                <nav className="space-y-2">
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href} className={cn(
                            'flex items-center px-3 py-2 rounded-lg',
                            pathname === item.href ? 'bg-ios-blue text-white' : 'hover:bg-ios-panel-contrast'
                        )}>
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t pt-4 space-y-2">
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-ios-panel-contrast">
                    {theme === 'dark' ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
                    Toggle Theme
                </button>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center px-3 py-2 rounded-lg text-ios-text-secondary hover:bg-ios-panel-contrast">
                    <LogOut className="h-5 w-5 mr-3" />
                    Log Out
                </button>
            </div>
        </aside>
    );
};