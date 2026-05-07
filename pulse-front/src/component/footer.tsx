'use client'

import Link from "next/link";
import React from "react";


const LINKS = [
    { label: 'Accueil', href: '/' },
    { label: 'Événements', href: '/events' },
    { label: 'Communauté', href: '/community' },
    { label: 'Forum', href: '/forum' },
    { label: 'Vous êtes pro ?', href: '/pro' },
];


export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 mt-16 px-6 py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">

                {/* Logo */}
                <div className="flex flex-col gap-4">
                    <Link href="/">
                        <img src="/Logo.png" alt="Pulse" className="w-32" />
                    </Link>

                </div>

                {/* Explorer */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Explorer</h3>
                    <ul className="flex flex-col gap-2 text-white/40">
                        <li><Link href="/events" className="hover:text-white">Événements</Link></li>
                        <li><Link href="/map" className="hover:text-white">Carte</Link></li>
                        <li><Link href="/artists" className="hover:text-white">Artistes</Link></li>
                    </ul>
                </div>

                {/* Communauté */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Communauté</h3>
                    <ul className="flex flex-col gap-2 text-white/40">
                        <li><Link href="/carpool" className="hover:text-white">Covoiturage</Link></li>
                        <li><Link href="/housing" className="hover:text-white">Logements</Link></li>
                        <li><Link href="/discussions" className="hover:text-white">Discussions</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
                    <div className="flex items-center gap-4 text-white/40">
                        {/* Remplace par vraies icônes */}
                        <Link href="#"><span className="hover:text-white">TikTok</span></Link>
                        <Link href="#"><span className="hover:text-white">Instagram</span></Link>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-white font-semibold mb-4">S'inscrire à la newsletter</h3>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <input
                            type="email"
                            placeholder="Entrez votre e-mail"
                            className="bg-transparent px-4 py-2 text-white text-sm outline-none w-full placeholder:text-white/30"
                        />
                        <button className="bg-[#ff3c6e] px-4 py-2 text-white text-sm font-semibold hover:bg-[#e0203d] transition">
                            S'inscrire
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 gap-4">
                <p>© {new Date().getFullYear()} Pulse. Tous droits réservés.</p>

                <div className="flex gap-4">
                    <Link href="/legal" className="hover:text-white">Mentions légales</Link>
                    <Link href="/privacy" className="hover:text-white">Confidentialité</Link>
                </div>
            </div>
        </footer>
    )
}
