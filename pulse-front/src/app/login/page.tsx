'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/axios';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import React from "react";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', form);
            localStorage.setItem('token', data.access_token);
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Email ou mot de passe incorrect.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 gap-10">

            {/* Header */}
            <div className="text-center max-w-lg mt-10">
                <h1 className="text-white text-3xl font-bold">Bienvenue !</h1>
                <h2 className="text-white text-2xl font-semibold">Connectez vous ou créer votre compte</h2>
                <p className="text-white/40 text-sm mt-2">
                    Rejoignez des milliers de festivalier.ère.s et d'organisateur.ice.s pour vivre les meilleurs évènements, ensemble.
                </p>
            </div>

            {/* 3 colonnes */}
            <div className="flex items-stretch gap-4 w-full max-w-5xl">

                {/* Image de guache */}
                <div className="hidden lg:block flex-1">
                    <img
                        src="/6ad7981a45ac8e41a82d58d4dd66710d.jpg"
                        alt="image à gauche"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

                {/* Form */}
                <div className="flex-[1.5] flex flex-col justify-center">
                    <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                        <img src="/user-round.svg" className="w-20 bg-white/30 rounded-full block mx-auto" />
                        <h2 className="text-white text-xl text-center font-bold">Connexion</h2>
                        <p className="text-white/40 text-center text-sm mb-6">
                            Bon retour ! Connectez-vous à votre compte.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            <div className="flex flex-col gap-2">
                                <label className="text-white/50 text-xs uppercase tracking-widest">Adresse mail</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="votre@email.com"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-white/50 text-xs uppercase tracking-widest">Mot de passe</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <p className="text-[#f87171] text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                    {error}
                                </p>
                            )}

                            <div className="text-right -mt-2">
                                <Link href="/forgot" className="text-sm text-white/50 underline hover:text-white/70">
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#ff3c6e] hover:bg-[#e0203d] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer mt-1"
                            >
                                {loading ? 'Connexion...' : 'Se connecter'}
                            </button>

                            <p className="text-white/30 text-sm text-center mt-6">
                                Pas encore de compte ?{' '}
                                <Link href="/register" className="text-[#ff3c6e] hover:underline">
                                    S'inscrire
                                </Link>
                            </p>
                        </form>
                    </div>


                </div>

                {/* Right Image */}
                <div className="hidden lg:block flex-1">
                    <img
                        src="/4a3524857a6cbbe3ea74ae1d49e50b88.jpg"
                        alt="right"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

            </div>

            <footer className="w-full border-t border-white/10 mt-16 px-6 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">

                    {/* Logo */}
                    <div className="flex flex-col gap-4">
                        <img src="/logo.png" alt="Pulse" className="w-32" />
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
        </main>
    );
}