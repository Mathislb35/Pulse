'use client';

import Link from 'next/link';
import { MessageSquare, Car, Home, Search, SlidersHorizontal } from 'lucide-react';
import {useState} from "react";

const SERVICES = [
    {
        icon: <Home className="w-5 h-5 text-[#ff3c6e]" />,
        title: 'Logement',
        desc: "Trouvez où dormir près du lieu de l'événement.",
    },
    {
        icon: <Car className="w-5 h-5 text-[#ff3c6e]" />,
        title: 'Covoiturage',
        desc: 'Organisez ou rejoignez un trajet pour arriver ensemble.',
    },
    {
        icon: <MessageSquare className="w-5 h-5 text-[#ff3c6e]" />,
        title: 'Communauté',
        desc: "Échangez avec d'autres participants sur l'événement.",
    },
];

// Données fictives — à remplacer par un appel API vers GET /events
const EVENTS = [
    {
        id: 1,
        title: 'Nuit Électro — Warehouse',
        location: 'Paris, 19e',
        category: 'Concert',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
    },
    {
        id: 2,
        title: 'Festival Solstice',
        location: "Lyon, Parc de la Tête d'Or",
        category: 'Festival',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80',
    },
    {
        id: 3,
        title: 'Soirée Rooftop',
        location: 'Marseille, Le Vieux-Port',
        category: 'Soiree',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    },
    {
        id: 4,
        title: 'Dev Meetup Pulse',
        location: 'Nantes, La Cantine',
        category: 'Soiree',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    },
    {
        id: 5,
        title: 'Vieille Charue',
        location: 'Grenoble, Belledonne',
        category: 'Festival',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80',
    },
    {
        id: 6,
        title: 'Jazz en Cave',
        location: 'Bordeaux, Saint-Pierre',
        category: 'Concert',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80',
    },
];

// Couleur du badge selon la catégorie
const CATEGORY_STYLES: Record<string, string> = {
    Concert: 'bg-[#ff3c6e]/10 text-[#ff3c6e] border-[#ff3c6e]/20',
    Festival: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Soiree: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

// Catégories pour les boutons filtres rapides
const CATEGORIES = ['Tous', 'Concert', 'Festival', 'Rave'];

// Filtres avancés dans le panneau de droite
const LOCATIONS = ['Paris', 'Lyon', 'Marseille', 'Nantes', 'Bordeaux', 'Grenoble', 'Annecy'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export default function HomePage() {

    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

    return (
        <main className="min-h-screen bg-[#080810] flex flex-col px-6 py-10 gap-12">

            {/* Hero */}
            <div className="w-full bg-[#0f0f1a] border border-white/10 rounded-sm px-12 py-10 flex flex-col lg:flex-row gap-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

                {/* Phrase d'accroche */}
                <div className="flex-1 flex flex-col justify-center gap-5">
                    <h1 className="text-white text-4xl font-bold leading-tight">
                        La plateforme ultime<br />pour vivre des évènements, ensemble.
                    </h1>
                    <p className="text-white/40 text-sm leading-relaxed max-w-sm text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tortor elit,
                        tristique at elit a, iaculis bibendum enim. Donec a augue dui.
                    </p>
                    <div className="flex gap-3 mt-2">
                        <Link href="/register" className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                            Créer un compte
                        </Link>
                    </div>
                </div>

                {/* Séparateur */}
                <div className="hidden lg:block w-px bg-white/10" />

                {/* Droite — Services en triangle */}
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                    <p className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-1 self-start">
                        Ce que Pulse propose
                    </p>

                    {/* 2 cards : Logements et covoiturage */}
                    <div className="flex gap-3 w-full">
                        {SERVICES.slice(0, 2).map((service) => (
                            <div key={service.title} className="flex-1 flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="bg-[#ff3c6e]/10 rounded-lg p-2 mt-0.5 shrink-0">
                                    {service.icon}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{service.title}</p>
                                    <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Communauté */}
                    <div className="w-full flex justify-center">
                        <div className="w-1/2 flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="bg-[#ff3c6e]/10 rounded-lg p-2 mt-0.5 shrink-0">
                                {SERVICES[2].icon}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{SERVICES[2].title}</p>
                                <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{SERVICES[2].desc}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Section événements */}
            <div className="w-full flex flex-col gap-6">

                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-white text-2xl font-bold">
                            Tous les événements
                        </h2>

                        <div className="flex gap-3">
                            <Link href="/events" className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                                Voir la liste
                            </Link>
                            <Link href="/events" className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm cursor-not-allowed">
                                Voir la carte
                            </Link>
                        </div>
                    </div>
                    {/* Sous-titre */}
                    <p className="text-white/40 text-sm mt-1 max-w-xl">
                        Découvrez tous les festivals et évènements à venir, partout dans le monde.
                    </p>
                </div>
                {/* Barre de recherche + filtres catégories + bouton filtres avancés */}
                <div className="flex items-center gap-3 flex-wrap">

                    {/* Barre de recherche*/}
                    <div className="relative flex-shrink-0 w-72">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher un événement..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors placeholder:text-white/20"
                        />
                    </div>

                    {/* Filtres catégories — milieu */}
                    <div className="flex gap-2 flex-wrap flex-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                                    activeCategory === cat
                                        ? 'bg-[#ff3c6e] border-[#ff3c6e] text-white'
                                        : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                </div>


                {/* Grille */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {EVENTS.map((event) => (
                        <div
                            key={event.id}
                            className="bg-[#0f0f1a] border border-white/10 hover:border-[#ff3c6e] rounded-2xl overflow-hidden transition-colors cursor-pointer group"
                        >
                            {/* Image */}
                            <div className="h-44 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Infos */}
                            <div className="p-4 flex flex-col gap-2">
                                {/* Badge catégorie */}
                                <span className={`w-fit text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_STYLES[event.category] ?? 'bg-white/5 text-white/40 border-white/10'}`}>
                  {event.category}
                </span>
                                {/* Titre */}
                                <h3 className="text-white font-bold text-base leading-snug">{event.title}</h3>
                                {/* Lieu */}
                                <p className="text-white/40 text-xs">📍 {event.location}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div className="w-full bg-[#0f0f1a] border border-white/10 rounded-sm px-12 py-10 flex flex-col lg:flex-row gap-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

                {/* Phrase d'accroche */}
                <div className="flex-1 flex flex-col justify-center gap-5">
                    <h1 className="text-white text-4xl font-bold leading-tight">
                        Ne manque rien des meilleurs évènements
                    </h1>
                    <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tortor elit,
                        tristique at elit a, iaculis bibendum enim. Donec a augue dui.
                    </p>
                </div>
                <Link href="/register" className="bg-[#0f0f1a] border border-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                    Créer un compte
                </Link>
                <Link href="/login" className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                    Se connecter
                </Link>

            </div>

        </main>
    );
}