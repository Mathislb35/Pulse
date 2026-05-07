'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from "react";
import {
    Home,
    Megaphone,
    MessagesSquare,
    Send,
    Briefcase,
} from 'lucide-react';

const LINKS = [
    { label: 'Accueil', href: '/', icon: Home },
    { label: 'Événements', href: '/events', icon: Megaphone },
    { label: 'Communauté', href: '/community', icon: MessagesSquare },
    { label: 'Forum', href: '/forum', icon: Send },
    { label: 'Vous êtes pro ?', href: '/pro', icon: Briefcase },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#080810]/80 backdrop-blur-md border-b border-white/[0.07]">
                <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/Logo.png" alt="Logo"
                             className="w-15"
                        />
                    </Link>

                    {/* Liens */}
                    <div className="hidden md:flex items-center gap-8">
                        {LINKS.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`text-sm transition-colors ${
                                    pathname === href
                                        ? 'text-white font-semibold'
                                        : 'text-white/40 hover:text-white'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}

                        <Link
                            href="/login"
                            className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors"
                        >
                            Connexion
                        </Link>

                        <div className="flex justify-center">
                            <Link href="/profile">
                                <img
                                    src="/user-round.svg"
                                    className="w-8 bg-white/30 rounded-full"
                                    alt="profile"
                                />
                            </Link>
                        </div>
                    </div>

                </nav>
            </header>

            {/* Mobile navbar en bas */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#080810]/90 backdrop-blur-md border-t border-white/[0.07] md:hidden">
                <div className="flex justify-around items-center h-16">

                    {LINKS.map(({ href, icon: Icon }) => {
                        const isActive = pathname === href;

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex flex-col items-center justify-center text-xs ${
                                    isActive ? 'text-[#ff3c6e]' : 'text-white/40'
                                }`}
                            >
                                <Icon size={22} />
                            </Link>
                        );
                    })}

                </div>
            </nav>
        </>
    );
}