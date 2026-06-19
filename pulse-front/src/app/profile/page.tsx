'use client';

import React, { useState, useEffect } from 'react';
import {
    User,
    Ticket,
    Car,
    Calendar,
    Heart,
    MessageSquare,
    Settings,
    LogOut,
    Edit3,
} from 'lucide-react';
import api from '../../lib/axios';

interface UserData {
    id: number;
    nom: string;
    prenom: string;
    username: string;
    email: string;
    phone?: string;
    date_de_naissance?: string;
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('informations');
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const sidebarItems = [
        { label: 'Mon profil', icon: User, active: true },
        { label: 'Mes billets', icon: Ticket, active: false },
        { label: 'Mes covoiturages', icon: Car, active: false },
        { label: 'Mes logements', icon: Calendar, active: false },
        { label: 'Mes favoris', icon: Heart, active: false },
        { label: 'Mes annonces', icon: MessageSquare, active: false },
        { label: 'Paramètres', icon: Settings, active: false },
        { label: 'Se déconnecter', icon: LogOut, active: false },
    ];

    const tabs = [
        { id: 'informations', label: 'Informations personnelles' },
        { id: 'securite', label: 'Sécurité' },
        { id: 'preferences', label: 'Préférences' },
        { id: 'notifications', label: 'Notifications' },
    ];

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/profile');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#080810] flex items-center justify-center">
                <p className="text-white/40">Chargement...</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-[#080810] flex items-center justify-center">
                <p className="text-white/40">Utilisateur non trouvé</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#080810] pt-20 pb-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0 bg-[#0f0f1a] border border-white/10 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#ff3c6e] mb-4 flex items-center justify-center bg-white/10">
                            <User size={60} className="text-white/60" />
                        </div>
                        <h2 className="text-white text-lg font-bold mb-1">{user.prenom} {user.nom}</h2>
                        <p className="text-white/40 text-sm mb-2">@{user.username}</p>
                        <p className="text-white/30 text-xs">Membre depuis 2024</p>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {sidebarItems.map((item, index) => (
                            <button
                                key={index}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                                    item.active
                                        ? 'bg-[#ff3c6e] text-white font-semibold'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <h1 className="text-white text-2xl font-bold mb-6">Mon profil</h1>

                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-3 text-sm transition-colors whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'text-[#ff3c6e] border-b-2 border-[#ff3c6e] font-semibold'
                                        : 'text-white/40 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'informations' && (
                        <div className="bg-[#0f0f1a] border border-white/10 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-white text-lg font-semibold">Informations personnelles</h3>
                                <button className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <Edit3 size={16} />
                                    Modifier
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Nom</label>
                                    <p className="text-white text-sm">{user.nom}</p>
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Prénom</label>
                                    <p className="text-white text-sm">{user.prenom}</p>
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Nom d'utilisateur</label>
                                    <p className="text-white text-sm">@{user.username}</p>
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Téléphone</label>
                                    <p className="text-white text-sm">{user.phone || '-'}</p>
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Adresse e-mail</label>
                                    <p className="text-white text-sm">{user.email}</p>
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Date de naissance</label>
                                    <p className="text-white text-sm">{formatDate(user.date_de_naissance)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'informations' && (
                        <div className="bg-[#0f0f1a] border border-white/10 rounded-xl p-6 text-center">
                            <p className="text-white/40 text-sm">
                                Cette section sera bientôt disponible!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}