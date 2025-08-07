"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export const LandingHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#faq', label: 'FAQ' },
    ];

    return (
        <header className="bg-ios-bg/80 dark:bg-ios-bg/80 backdrop-blur-lg sticky top-0 z-40 border-b">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Logo />
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="hover:text-ios-blue transition">
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Link href="/login" className="text-ios-blue hover:underline text-sm md:text-base">Log In</Link>
                    <Button asChild>
                        <Link href="/dashboard">Get Started Free</Link>
                    </Button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg">
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden animate-fade-in">
                    <div className="px-6 pt-2 pb-4 space-y-2">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block hover:text-ios-blue transition">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};