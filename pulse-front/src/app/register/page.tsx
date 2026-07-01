'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/axios';
import React from "react";
import { Phone, Calendar } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ 
        nom: '', 
        prenom: '', 
        username: '', 
        email: '', 
        password: '', 
        phone: '',
        date_de_naissance: '',
        acceptCGU: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.acceptCGU) {
            setError('Vous devez accepter les CGU et la politique de confidentialité.');
            return;
        }

        setLoading(true);

        try {
            const { acceptCGU, ...formData } = form;
            await api.post('/auth/register', formData);
            router.push('/login');
        } catch (err: any) {
            const errorMessage = Array.isArray(err.response?.data?.message) 
                ? err.response?.data?.message.join(', ') 
                : err.response?.data?.message || 'Une erreur est survenue.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#080810] flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-lg">

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
                                placeholder="Votre nom"
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Prénom
                            </label>
                            <input
                                type="text"
                                name="prenom"
                                value={form.prenom}
                                onChange={handleChange}
                                placeholder="Votre prénom"
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Choisissez un nom d'utilisateur"
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Adresse e-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="votre@email.com"
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Téléphone
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="XX XX XX XX XX"
                                    className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20 w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                Date de naissance
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                                <input
                                    type="date"
                                    name="date_de_naissance"
                                    value={form.date_de_naissance}
                                    onChange={handleChange}
                                    className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm outline-none focus:border-[#ff3c6e]/60 transition-colors placeholder:text-white/20 w-full"
                                />
                            </div>
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

                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                name="acceptCGU"
                                id="acceptCGU"
                                checked={form.acceptCGU}
                                onChange={handleChange}
                                className="mt-1 w-4 h-4 accent-[#ff3c6e] cursor-pointer"
                            />
                            <label htmlFor="acceptCGU" className="text-white/40 text-sm leading-relaxed">
                                J'accepte les{' '}
                                <Link href="/cgu" className="text-[#ff3c6e] hover:underline">
                                    CGU
                                </Link>{' '}
                                et la{' '}
                                <Link href="/cgu" className="text-[#ff3c6e] hover:underline">
                                    politique de confidentialité
                                </Link>
                            </label>
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