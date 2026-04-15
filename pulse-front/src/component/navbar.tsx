'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
    { label: 'Accueil', href: '/' },
    { label: 'Événements', href: '/events' },
    { label: 'Communauté', href: '/community' },
    { label: 'Forum', href: '/forum' },
    { label: 'Vous êtes pro ?', href: '/pro' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#080810]/80 backdrop-blur-md border-b border-white/[0.07]">
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo — gauche */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff3c6e] shadow-[0_0_12px_#ff3c6e] animate-pulse" />
                    <span className="text-white font-bold text-xl tracking-tight">Pulse</span>
                </Link>

                {/* Tout le reste — droite */}
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
                </div>

            </nav>
        </header>
    );
}