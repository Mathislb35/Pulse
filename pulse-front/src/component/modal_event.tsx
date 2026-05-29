'use client';

import { useEffect, useState, useRef } from 'react';
import { X, MapPin, Calendar, Clock, Ticket, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────── */
interface Event {
    id: number;
    title: string;
    location: string;
    category: string;
    image: string;
    // Champs optionnels enrichis (à brancher sur ton API)
    date?: string;
    time?: string;
    description?: string;
    price?: string;
    spots?: number;
    tags?: string[];
    artists?: { name: string; genre: string }[];
    tracks?: { title: string; duration: string }[];
    rideshares?: { from: string; date: string; seats: number; price: string }[];
    lodgings?: { distance: string; type: string; price: string; rating: string; reviews: number }[];
}

interface Props {
    event: Event;
    onClose: () => void;
}

/* ─── Styles badge catégorie ─────────────────────────── */
const CATEGORY_STYLES: Record<string, string> = {
    Concert: 'bg-[#ff3c6e]/10 text-[#ff3c6e] border-[#ff3c6e]/20',
    Festival: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Soiree: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

/* ─── Données de démo (fallback si l'API ne les fournit pas encore) ── */
const DEFAULT_ARTISTS = Array.from({ length: 8 }, (_, i) => ({ name: `Artiste ${i + 1}`, genre: 'Electro' }));
const DEFAULT_TRACKS = [
    { title: 'Lorem Ipsum – dolor', duration: '5:54' },
    { title: 'Lorem Ipsum – dolor', duration: '6:31' },
    { title: 'Lorem Ipsum – dolor', duration: '5:21' },
    { title: 'Lorem Ipsum – dolor', duration: '4:20' },
    { title: 'Lorem Ipsum – dolor', duration: '3:12' },
];
const DEFAULT_RIDESHARES = Array.from({ length: 3 }, () => ({
    from: 'Lyon',
    date: '21 juin · 8h00',
    seats: 3,
    price: '25 €',
}));
const DEFAULT_LODGINGS = Array.from({ length: 3 }, () => ({
    distance: '1,2 km du festival',
    type: 'Chambre privée',
    price: '45 € / nuit',
    rating: '4,8',
    reviews: 23,
}));

/* ─── Composant ──────────────────────────────────────── */
export default function EventDetailModal({ event, onClose }: Props) {
    const [isFav, setIsFav] = useState(false);
    const artistsScrollRef = useRef<HTMLDivElement>(null);

    // Fermeture avec Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const artists = event.artists ?? DEFAULT_ARTISTS;
    const tracks = event.tracks ?? DEFAULT_TRACKS;
    const rideshares = event.rideshares ?? DEFAULT_RIDESHARES;
    const lodgings = event.lodgings ?? DEFAULT_LODGINGS;

    const scrollArtists = (dir: 1 | -1) => {
        artistsScrollRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' });
    };

    return (
        /* Overlay */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            {/* Modale */}
            <div
                className="relative bg-[#0a0a14] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >

                {/* ── Topbar ── */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#0a0a14]/90 backdrop-blur-md border-b border-white/8">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" /> Retour
                    </button>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 border border-white/10 hover:border-[#ff3c6e]/40 text-white/40 hover:text-[#ff3c6e] px-3 py-1.5 rounded-lg text-xs transition-all">
                            Partager
                        </button>
                        <button
                            onClick={() => setIsFav(f => !f)}
                            className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-lg text-xs transition-all ${isFav ? 'border-[#ff3c6e]/30 text-[#ff3c6e] bg-[#ff3c6e]/8' : 'border-white/10 text-white/40 hover:text-[#ff3c6e] hover:border-[#ff3c6e]/30'}`}
                        >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#ff3c6e]' : ''}`} />
                            {isFav ? 'Ajouté aux favoris' : 'Ajouter aux favoris'}
                        </button>
                    </div>
                </div>

                {/* ── Hero ── */}
                <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-6 p-6">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full aspect-[4/3] object-cover rounded-xl border border-white/10"
                    />
                    <div className="flex flex-col gap-3">
                        <span className={`w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_STYLES[event.category] ?? 'bg-white/5 text-white/40 border-white/10'}`}>
                            {event.category}
                        </span>
                        <h2 className="text-white font-bold text-2xl leading-tight">{event.title}</h2>
                        <div className="flex flex-wrap gap-3 text-white/40 text-xs">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date ?? '21 – 23 juin 2026'}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
                        </div>
                        {event.tags && (
                            <div className="flex flex-wrap gap-1.5">
                                {event.tags.map(t => (
                                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-white/50">{t}</span>
                                ))}
                            </div>
                        )}
                        <p className="text-white/50 text-sm leading-relaxed">
                            {event.description ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tortor elit, tristique at elit a, iacullis bibendum enim. Donec a augue dui.'}
                        </p>
                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-2 py-2">
                            {[['80+', 'Artistes'], ['3', 'Scènes'], ['15 000', 'Festivaliers'], ['18+', 'Âge min']].map(([val, label]) => (
                                <div key={label} className="flex flex-col gap-0.5">
                                    <span className="text-white font-bold text-lg leading-none">{val}</span>
                                    <span className="text-white/30 text-[10px] uppercase tracking-wider">{label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 flex-wrap mt-auto">
                            <button className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-1.5">
                                <Ticket className="w-4 h-4" /> Voir les billets
                            </button>
                            <button className="border border-white/15 hover:bg-white/5 text-white px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-1.5">
                                Site officiel <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Artistes ── */}
                <div className="border-t border-white/8 px-6 py-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-white font-bold text-sm uppercase tracking-widest">Les artistes</p>
                            <p className="text-white/40 text-xs mt-0.5">Découvrez la programmation</p>
                        </div>
                        <button className="text-white/40 hover:text-[#ff3c6e] text-xs flex items-center gap-1 transition-colors">
                            Voir tous les artistes <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => scrollArtists(-1)} className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#ff3c6e]/40 hover:text-[#ff3c6e] text-white/50 flex items-center justify-center transition-all">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div ref={artistsScrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide py-2 flex-1">
                            {artists.map((a, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
                                    <div className="w-16 h-16 rounded-full bg-white/5 border-2 border-white/10 group-hover:border-[#ff3c6e] flex items-center justify-center text-white/20 transition-colors text-2xl overflow-hidden">
                                        🎵
                                    </div>
                                    <span className="text-white text-xs font-medium text-center whitespace-nowrap">{a.name}</span>
                                    <span className="text-white/40 text-[10px] text-center">{a.genre}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => scrollArtists(1)} className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#ff3c6e]/40 hover:text-[#ff3c6e] text-white/50 flex items-center justify-center transition-all">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* ── Playlist ── */}
                <div className="border-t border-white/8 px-6 py-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-white font-bold text-sm uppercase tracking-widest">Playlist officielle</p>
                            <p className="text-white/40 text-xs mt-0.5">Écoutez les artistes du festival</p>
                        </div>
                        <button className="flex items-center gap-1.5 border border-green-500/30 text-green-400 hover:bg-green-500/8 px-3 py-1.5 rounded-lg text-xs transition-all">
                            🎵 Ouvrir sur Spotify
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
                        <div className="w-full sm:w-36 aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl cursor-pointer group relative overflow-hidden">
                            🎵
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-[#ff3c6e] flex items-center justify-center text-white text-lg">▶</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-0">
                            <p className="text-white font-bold mb-0.5">Lorem Ipsum dolor</p>
                            <p className="text-white/40 text-xs mb-3">Playlist officielle · 50 titres</p>
                            {tracks.map((t, i) => (
                                <div key={i} className="grid grid-cols-[20px_1fr_auto] items-center gap-3 py-2 border-b border-white/5 last:border-0 hover:bg-white/3 rounded-md px-1 cursor-pointer transition-colors group">
                                    <span className="text-white/25 text-xs text-center group-hover:hidden">{i + 1}</span>
                                    <span className="text-white/25 text-xs text-center hidden group-hover:block">▶</span>
                                    <span className="text-white/70 text-xs">{t.title}</span>
                                    <span className="text-white/30 text-xs">{t.duration}</span>
                                </div>
                            ))}
                            <button className="text-white/30 hover:text-[#ff3c6e] text-xs mt-3 text-center w-full transition-colors">
                                Voir la playlist complète
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Covoiturage + Logements ── */}
                <div className="border-t border-white/8 grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">

                    {/* Covoiturage */}
                    <div className="bg-[#0f0f1e] border border-white/8 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-white/60 text-lg mb-1">🚗</p>
                                <p className="text-white font-bold text-sm uppercase tracking-wider">Covoiturage</p>
                                <p className="text-white/30 text-xs mt-0.5">Trouvez un trajet pour vous rendre au festival.</p>
                            </div>
                            <button className="text-white/30 hover:text-[#ff3c6e] text-[10px] flex items-center gap-0.5 transition-colors whitespace-nowrap">
                                Voir tous <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {rideshares.map((r, i) => (
                                <div key={i} className="flex items-center gap-2 bg-white/3 border border-white/5 rounded-lg p-2.5">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-xs font-medium">{r.from} → Rennes</p>
                                        <p className="text-white/30 text-[10px] mt-0.5">📅 {r.date} · 👥 {r.seats} places</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[#ff3c6e] font-bold text-sm">{r.price}</p>
                                        <p className="text-white/25 text-[9px]">par place</p>
                                    </div>
                                    <button className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md transition-colors shrink-0">
                                        Voir
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full text-center text-white/25 hover:text-[#ff3c6e] text-xs mt-3 transition-colors">
                            Voir plus de trajets
                        </button>
                    </div>

                    {/* Logements */}
                    <div className="bg-[#0f0f1e] border border-white/8 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-white/60 text-lg mb-1">🏠</p>
                                <p className="text-white font-bold text-sm uppercase tracking-wider">Logements à proximité</p>
                                <p className="text-white/30 text-xs mt-0.5">Trouvez un logement près du festival.</p>
                            </div>
                            <button className="text-white/30 hover:text-[#ff3c6e] text-[10px] flex items-center gap-0.5 transition-colors whitespace-nowrap">
                                Voir tous <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                            {lodgings.map((l, i) => (
                                <div key={i} className="min-w-[130px] border border-white/8 hover:border-[#ff3c6e]/30 rounded-xl overflow-hidden bg-white/3 cursor-pointer transition-colors group shrink-0">
                                    <div className="h-20 bg-white/5 flex items-center justify-center text-2xl relative">
                                        🏡
                                        <button className="absolute top-2 right-2 text-white/30 hover:text-[#ff3c6e] text-sm transition-colors">♡</button>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-white/30 text-[10px]">{l.distance}</p>
                                        <p className="text-white text-xs font-medium mt-0.5">{l.type}</p>
                                        <p className="text-white/40 text-[10px] mt-0.5">{l.price}</p>
                                        <p className="text-white/30 text-[10px] mt-0.5">⭐ {l.rating} ({l.reviews})</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}