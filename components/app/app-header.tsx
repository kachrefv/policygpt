"use client";

import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { UserAvatar } from './user-avatar';
import { User } from 'next-auth';

// This component is primarily for mobile view
export const AppHeader = ({ user }: { user: User }) => {
    return (
        <div className="flex justify-between items-center p-4 border-b lg:hidden">
            {/* In a real app, this would control a mobile sidebar state */}
            <button className="p-2 rounded-lg hover:bg-ios-panel-contrast">
                <Menu className="h-6 w-6" />
            </button>
            <Logo />
            <UserAvatar user={user} />
        </div>
    );
};