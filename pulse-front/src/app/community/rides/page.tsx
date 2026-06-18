'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Clock, Users } from 'lucide-react';
import api from '../../../lib/axios';
import RideDetailModal from '../../../component/modal_ride';
import CreateRideModal from '../../../component/modal-create-ride';

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

interface Ride {
  id_rides: number;
  departure_time: string;
  price: number;
  available_seats: number;
  description: string;
  departure_commune_id: number;
  arrival_commune_id: number;
  id_users: number;
  id_events: number;
  user: User;
  event?: Event | null;
}

export default function RidesPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [departureSearch, setDepartureSearch] = useState('');
  const [arrivalSearch, setArrivalSearch] = useState('');
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchRides = async () => {
    try {
      const { data } = await api.get('/rides');
      setRides(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des trajets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const filtered = rides.filter((ride) => {
    const matchSearch = ride.description.toLowerCase().includes(search.toLowerCase()) || 
                        ride.event.title.toLowerCase().includes(search.toLowerCase());
    const matchDeparture = !departureSearch || ride.event.location.toLowerCase().includes(departureSearch.toLowerCase());
    const matchArrival = !arrivalSearch || ride.event.location.toLowerCase().includes(arrivalSearch.toLowerCase());
    return matchSearch && matchDeparture && matchArrival;
  });

  const hasActiveFilters = departureSearch.length > 0 || arrivalSearch.length > 0;

  return (
    <main className="min-h-screen bg-[#080810] px-6 py-10">
      <div className="flex flex-col gap-6">

        {/* En-tête */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-white text-3xl font-bold">Trajets</h1>
            <p className="text-white/40 text-sm mt-1 max-w-xl">
              Trouvez un covoiturage pour vous rendre à vos événements.
            </p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-[#ff3c6e] text-white font-bold px-5 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-[#e0203d] transition-colors"
          >
            Proposer un trajet
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un trajet..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Grille + panneau filtres */}
        <div className="flex gap-6 items-start">
          {/* Grille trajets */}
          <div className="flex-1">
            {loading ? (
              <div className="w-full py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3c6e]"></div>
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.map((ride) => (
                  <div
                    key={ride.id_rides}
                    onClick={() => ride.event && setSelectedRide(ride)}
                    className="bg-[#0f0f1a] border border-white/10 hover:border-[#ff3c6e]/40 rounded-2xl overflow-hidden transition-colors cursor-pointer group p-6"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-bold text-lg">{ride.event?.title || 'Événement'}</p>
                          <p className="text-white/40 text-xs mt-1">📍 {ride.event?.location || 'Lieu'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#ff3c6e] font-bold text-xl">{ride.price} €</p>
                          <p className="text-white/30 text-[10px]">par place</p>
                        </div>
                      </div>

                      {/* Itinéraire */}
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#ff3c6e] shrink-0" />
                        <div className="flex-1 h-px bg-white/10" />
                        <div className="w-3 h-3 rounded-full bg-purple-400 shrink-0" />
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Clock className="w-4 h-4" />
                          {new Date(ride.departure_time).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Users className="w-4 h-4" />
                          {ride.available_seats} places disponibles
                        </div>
                      </div>

                      <p className="text-white/40 text-xs leading-relaxed">
                        {ride.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-white/20 text-4xl mb-4">🚗</p>
                <p className="text-white/40 text-sm">Aucun trajet trouvé.</p>
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
                  onClick={() => { setDepartureSearch(''); setArrivalSearch(''); }}
                  className="text-[#ff3c6e] text-xs font-bold hover:underline cursor-pointer"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Contenu */}
            <div className="flex flex-col gap-5 p-4">
              {/* Filtre départ */}
              <div className="flex flex-col gap-2">
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Départ</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-3.5 h-3.5" />
                  <input
                    type="text"
                    value={departureSearch}
                    onChange={(e) => setDepartureSearch(e.target.value)}
                    placeholder="Ville de départ..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-white text-xs outline-none focus:border-[#ff3c6e]/50 transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              {/* Filtre arrivée */}
              <div className="flex flex-col gap-2">
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Arrivée</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-3.5 h-3.5" />
                  <input
                    type="text"
                    value={arrivalSearch}
                    onChange={(e) => setArrivalSearch(e.target.value)}
                    placeholder="Ville d'arrivée..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-white text-xs outline-none focus:border-[#ff3c6e]/50 transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedRide && (
        <RideDetailModal
          ride={selectedRide}
          onClose={() => setSelectedRide(null)}
        />
      )}

      {showCreateModal && (
        <CreateRideModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchRides}
        />
      )}
    </main>
  );
}
