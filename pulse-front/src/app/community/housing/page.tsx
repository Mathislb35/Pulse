'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Home, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/axios';
import HousingDetailModal from '../../../component/modal_housing';
import CreateHousingModal from '../../../component/modal-create-housing';
import { useAuth } from '../../../hooks/useAuth';

interface User {
  id: number;
  username?: string;
  email?: string;
}

interface Event {
  id_events: number;
  title: string;
  location: string;
}

interface Housing {
  id_housing: number;
  available_places: number;
  price: number;
  description: string;
  id_events: number;
  event?: Event | null;
}

export default function HousingPage() {
  const [housings, setHousings] = useState<Housing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { isAuthenticated, requireAuth } = useAuth();
  const router = useRouter();

  const fetchHousings = async () => {
    try {
      const { data } = await api.get('/housing');
      setHousings(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des logements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHousings();
  }, []);

  const filtered = housings.filter((housing) => {
    const matchSearch = housing.description.toLowerCase().includes(search.toLowerCase()) || 
                        (housing.event && housing.event.title.toLowerCase().includes(search.toLowerCase()));
    const matchLocation = !locationSearch || (housing.event && housing.event.location.toLowerCase().includes(locationSearch.toLowerCase()));
    return matchSearch && matchLocation;
  });

  const hasActiveFilters = locationSearch.length > 0;

  return (
    <main className="min-h-screen bg-[#080810] px-6 py-10">
      <div className="flex flex-col gap-6">

        {/* En-tête */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-white text-3xl font-bold">Logements</h1>
            <p className="text-white/40 text-sm mt-1 max-w-xl">
              Trouvez un logement pour vos événements.
            </p>
          </div>
          {isAuthenticated ? (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-[#ff3c6e] text-white font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-[#e0203d] transition-colors"
            >
              Proposer un logement
            </button>
          ) : (
            <button 
              onClick={() => router.push('/login')}
              className="bg-[#ff3c6e] text-white font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-[#e0203d] transition-colors"
            >
              Se connecter pour proposer
            </button>
          )}
        </div>

        {/* Barre de recherche */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un logement..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Grille + panneau filtres */}
        <div className="flex gap-6 items-start">
          {/* Grille logements */}
          <div className="flex-1">
            {loading ? (
              <div className="w-full py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3c6e]"></div>
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.map((housing) => (
                  <div
                    key={housing.id_housing}
                    onClick={() => housing.event && setSelectedHousing(housing)}
                    className="bg-[#0f0f1a] border border-white/10 hover:border-[#ff3c6e]/40 rounded-2xl overflow-hidden transition-colors cursor-pointer group p-6"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-bold text-lg">{housing.event?.title || 'Événement'}</p>
                          <p className="text-white/40 text-xs mt-1">📍 {housing.event?.location || 'Lieu'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#ff3c6e] font-bold text-xl">{housing.price} €</p>
                          <p className="text-white/30 text-[10px]">par nuit</p>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="flex items-center gap-3">
                        <Home className="w-6 h-6 text-[#ff3c6e]" />
                        <div className="flex-1 h-px bg-white/10" />
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Users className="w-4 h-4" />
                          {housing.available_places} places disponibles
                        </div>
                      </div>

                      <p className="text-white/40 text-xs leading-relaxed">
                        {housing.description}
                      </p>

                      {/* Badge de connexion pour réservation */}
                      {!isAuthenticated && (
                        <div className="mt-2 p-2 bg-white/5 border border-white/10 rounded-lg text-center">
                          <p className="text-white/50 text-xs">Connectez-vous pour réserver</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-white/20 text-4xl mb-4">🏠</p>
                <p className="text-white/40 text-sm">Aucun logement trouvé.</p>
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
                  onClick={() => setLocationSearch('')}
                  className="text-[#ff3c6e] text-xs font-bold hover:underline cursor-pointer"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Contenu */}
            <div className="flex flex-col gap-5 p-4">
              {/* Filtre localisation */}
              <div className="flex flex-col gap-2">
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Localisation</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-3.5 h-3.5" />
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Ville..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-white text-xs outline-none focus:border-[#ff3c6e]/50 transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedHousing && (
        <HousingDetailModal
          housing={selectedHousing}
          onClose={() => setSelectedHousing(null)}
          onSuccess={fetchHousings}
        />
      )}

      {showCreateModal && (
        <CreateHousingModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchHousings}
        />
      )}
    </main>
  );
}
