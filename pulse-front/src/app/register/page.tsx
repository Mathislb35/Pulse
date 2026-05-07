'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/axios';
import React from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ nom: '', email: '', password: '', phone: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/auth/register', form);
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#080810] flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl p-8">
                    <h1 className="text-white text-2xl font-bold mb-1">Créer un compte</h1>
                    <p className="text-white/40 text-sm mb-8">Rejoins la communauté Pulse</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Nom
                            </label>
                            <input
                                type="text"
                                name="nom"
                                value={form.nom}
                                onChange={handleChange}
                                placeholder="Ton prénom ou pseudo"
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="toi@exemple.com"
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="06 00 00 00 00"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                            />
                        </div>

                        {error && (
                            <p className="text-[#f87171] text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#ff3c6e] hover:bg-[#e0203d] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors mt-1 cursor-pointer"
                        >
                            {loading ? 'Création...' : 'Créer mon compte'}
                        </button>
                        <p className="text-white/30 text-sm text-center mt-6">
                            Déjà un compte ?{' '}
                            <Link href="/login" className="text-[#ff3c6e] hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </form>
                </div>

            </div>
        </main>
    );
}