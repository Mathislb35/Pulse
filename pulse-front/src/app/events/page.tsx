'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import api from "../../lib/axios";
import EventDetailModal from "../../component/modal_event";

interface Event {
    id_events: number;
    title: string;
    location: string;
    category: string;
    image_url: string;
    start_date: string;
    end_date: string;
    description?: string;
}

const CATEGORY_STYLES: Record<string, string> = {
    Concert:    'bg-[#ff3c6e]/10 text-[#ff3c6e] border-[#ff3c6e]/20',
    Festival:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Soiree:     'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Sport:      'bg-green-500/10 text-green-400 border-green-500/20',
    Conference: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

const CATEGORIES = ['Tous', 'Concert', 'Festival', 'Soiree', 'Sport', 'Conference'];
const LOCATIONS   = ['Paris', 'Lyon', 'Marseille', 'Nantes', 'Bordeaux', 'Grenoble', 'Annecy', 'Clisson', 'Carhaix', 'Nice'];
const MONTHS      = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await api.get('/events');
                setEvents(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des événements:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
        setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    };

    const filtered = events.filter((e) => {
        const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase());
        const matchCategory = activeCategory === 'Tous' || e.category === activeCategory;
        const matchLocation = selectedLocations.length === 0 || selectedLocations.some((l) => e.location.includes(l));
        return matchSearch && matchCategory && matchLocation;
    });

    const hasActiveFilters = selectedLocations.length > 0 || selectedMonths.length > 0;

    return (
        <main className="min-h-screen bg-[#080810] px-6 py-10">
            <div className="flex flex-col gap-6">

                {/* En-tête */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-white text-3xl font-bold">Tous les événements</h1>
                        <p className="text-white/40 text-sm mt-1 max-w-xl">
                            Découvrez tous les festivals et évènements à venir, partout dans le monde.
                        </p>
                    </div>
                    {/* Boutons vue */}
                    <div className="flex gap-2">
                        <button className="bg-[#ff3c6e] text-white font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer">
                            Liste
                        </button>
                        <button className="bg-white/5 border border-white/10 text-white/40 font-bold px-5 py-2.5 rounded-xl text-sm cursor-not-allowed">
                            Carte
                        </button>
                    </div>
                </div>

                {/* Barre de recherche + filtres catégories */}
                <div className="flex items-center gap-3 flex-wrap">

                    {/* Recherche */}
                    <div className="relative w-72 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher un événement..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors placeholder:text-white/20"
                        />
                    </div>

                    {/* Boutons catégories */}
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

                {/* Grille + panneau filtres */}
                <div className="flex gap-6 items-start">

                    {/* Grille événements */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="w-full py-20 flex justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3c6e]"></div>
                            </div>
                        ) : filtered.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filtered.map((event) => (
                                    <div
                                        key={event.id_events}
                                        onClick={() => setSelectedEvent(event)}
                                        className="bg-[#0f0f1a] border border-white/10 hover:border-[#ff3c6e]/40 rounded-2xl overflow-hidden transition-colors cursor-pointer group"
                                    >
                                        {/* Image */}
                                        <div className="h-44 overflow-hidden">
                                            <img
                                                src={event.image_url || 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80'}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        {/* Infos */}
                                        <div className="p-4 flex flex-col gap-2">
                                            {event.category && (
                                                <span className={`w-fit text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_STYLES[event.category] ?? 'bg-white/5 text-white/40 border-white/10'}`}>
                                                    {event.category}
                                                </span>
                                            )}
                                            <h3 className="text-white font-bold text-base leading-snug">{event.title}</h3>
                                            <p className="text-white/40 text-xs">📍 {event.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <p className="text-white/20 text-4xl mb-4">🔍</p>
                                <p className="text-white/40 text-sm">Aucun événement trouvé.</p>
                            </div>
                        )}
                    </div>

                    {/* Panneau filtres avancés */}
                    <div className="hidden lg:flex flex-col w-52 shrink-0 bg-[#0f0f1a] border border-white/10 rounded-2xl overflow-hidden sticky top-20">

                        {/* Header panneau */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <div className="flex items-center gap-2 text-white/70">
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Filtres</span>
                            </div>
                            {hasActiveFilters && (
                                <button
                                    onClick={() => { setSelectedLocations([]); setSelectedMonths([]); }}
                                    className="text-[#ff3c6e] text-xs font-bold hover:underline cursor-pointer"
                                >
                                    Réinitialiser
                                </button>
                            )}
                        </div>

                        {/* Contenu scrollable */}
                        <div className="overflow-y-auto max-h-[calc(100vh-180px)] flex flex-col gap-5 p-4">

                            {/* Filtre ville */}
                            <div className="flex flex-col gap-2">
                                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Ville</p>
                                {LOCATIONS.map((loc) => (
                                    <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedLocations.includes(loc)}
                                            onChange={() => toggle(selectedLocations, setSelectedLocations, loc)}
                                            className="accent-[#ff3c6e] w-3.5 h-3.5 cursor-pointer"
                                        />
                                        <span className={`text-sm transition-colors ${selectedLocations.includes(loc) ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      {loc}
                    </span>
                                    </label>
                                ))}
                            </div>

                            <div className="w-full h-px bg-white/10" />

                            {/* Filtre mois */}
                            <div className="flex flex-col gap-2">
                                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Mois</p>
                                {MONTHS.map((month) => (
                                    <label key={month} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedMonths.includes(month)}
                                            onChange={() => toggle(selectedMonths, setSelectedMonths, month)}
                                            className="accent-[#ff3c6e] w-3.5 h-3.5 cursor-pointer"
                                        />
                                        <span className={`text-sm transition-colors ${selectedMonths.includes(month) ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      {month}
                    </span>
                                    </label>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </main>
    );
}