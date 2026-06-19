'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, Home, Clock, Users, Search, SlidersHorizontal, Calendar } from 'lucide-react';
import api from '../../lib/axios';
import RideDetailModal from '../../component/modal_ride';
import HousingDetailModal from '../../component/modal_housing';

interface User {
  id: number;
  username?: string;
  email?: string;
}

interface Event {
  id_events: number;
  title: string;
  location: string;
  category?: string;
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

interface Housing {
  id_housing: number;
  available_places: number;
  price: number;
  description: string;
  id_events: number;
  event?: Event | null;
}

const CATEGORIES = ['Tous', 'Concert', 'Festival', 'Rave'];

export default function CommunityPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [housings, setHousings] = useState<Housing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'rides' | 'housing'>('rides');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);

  const fetchData = async () => {
    try {
      const [ridesRes, housingsRes] = await Promise.all([
        api.get('/rides'),
        api.get('/housing')
      ]);
      setRides(ridesRes.data);
      setHousings(housingsRes.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRides = rides.filter((ride) => {
    const matchSearch = ride.description.toLowerCase().includes(search.toLowerCase()) || 
                        (ride.event?.title.toLowerCase().includes(search.toLowerCase()) || false);
    const matchCategory = activeCategory === 'Tous' || ride.event?.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const filteredHousings = housings.filter((housing) => {
    const matchSearch = housing.description.toLowerCase().includes(search.toLowerCase()) || 
                        (housing.event?.title.toLowerCase().includes(search.toLowerCase()) || false);
    const matchCategory = activeCategory === 'Tous' || housing.event?.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-[#080810] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* Hero Banner */}
        <div className="w-full bg-[#0f0f1a] border border-white/10 rounded-sm p-8 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-white text-3xl font-bold">Participez à l'aventure !</h1>
            <p className="text-white/40 text-sm max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tortor elit, tristique at elit a, iaculis bibendum enim. Donec a augue dui.
            </p>
            <div className="flex gap-4">
              <Link href="/community/rides" className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
                Proposer un trajet
              </Link>
              <Link href="/community/housing" className="border border-[#ff3c6e] text-[#ff3c6e] hover:bg-[#ff3c6e] hover:text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
                Proposer un logement
              </Link>
            </div>
          </div>
          <div className="lg:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80" 
              alt="Concert" 
              className="w-full h-48 object-cover rounded-xl border border-white/10"
            />
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-shrink-0 w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un festival, une ville, un artiste..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors placeholder:text-white/20"
            />
          </div>
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
          <button className="ml-auto flex items-center gap-2 border border-white/10 text-white/50 hover:text-white hover:border-white/20 px-4 py-2.5 rounded-xl text-sm transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Plus de filtres
          </button>
        </div>

        {/* Tabs */}
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-0 bg-[#0f0f1a] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('rides')}
              className={`px-8 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'rides'
                  ? 'bg-white/10 text-white border-b-2 border-[#ff3c6e]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Covoiturage
            </button>
            <button
              onClick={() => setActiveTab('housing')}
              className={`px-8 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'housing'
                  ? 'bg-white/10 text-white border-b-2 border-[#ff3c6e]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Logement
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            {activeTab === 'rides' ? (
              <Car className="w-6 h-6 text-[#ff3c6e]" />
            ) : (
              <Home className="w-6 h-6 text-[#ff3c6e]" />
            )}
            <h2 className="text-white text-xl font-bold">
              {activeTab === 'rides' ? 'Covoiturage' : 'Logement'}
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-md text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tortor elit, tristique at elit a, iaculis bibendum enim. Donec a augue dui.
          </p>

          {loading ? (
            <div className="w-full py-20 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3c6e]"></div>
            </div>
          ) : activeTab === 'rides' ? (
            filteredRides.length > 0 ? (
              <div className="w-full grid grid-cols-1 gap-4">
                {filteredRides.map((ride) => (
                  <div
                    key={ride.id_rides}
                    className="bg-[#0f0f1a] border border-white/10 hover:border-[#ff3c6e]/40 rounded-sm p-6 transition-colors"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/30">
                            <Users className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-white/40 text-xs">{ride.user.username || 'Utilisateur'}</p>
                          </div>
                        </div>
                        <div className="flex-1 text-center">
                          <h3 className="text-white font-bold text-xl">{ride.event?.title || 'Événement'}</h3>
                          <p className="text-white/40 text-xs mt-1">{ride.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {ride.event?.category && (
                          <span className="bg-[#ff3c6e] text-white text-xs font-bold px-3 py-1 rounded">
                            {ride.event.category}
                          </span>
                        )}
                        <span className="bg-[#ff3c6e] text-white text-xs font-bold px-3 py-1 rounded">
                          Covoiturage
                        </span>
                        {ride.event?.location && (
                          <span className="bg-[#ff3c6e] text-white text-xs font-bold px-3 py-1 rounded">
                            {ride.event.location}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Users className="w-4 h-4" />
                          {ride.available_seats} places restantes
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Calendar className="w-4 h-4" />
                          {new Date(ride.departure_time).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedRide(ride); }}
                          className="bg-[#ff3c6e] text-white font-bold px-5 py-2 rounded text-sm hover:bg-[#e0203d] transition-colors"
                        >
                          Réserver le trajet
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full py-20 text-center">
                <p className="text-white/40 text-sm">Aucun trajet trouvé.</p>
              </div>
            )
          ) : (
            filteredHousings.length > 0 ? (
              <div className="w-full grid grid-cols-1 gap-4">
                {filteredHousings.map((housing) => (
                  <div
                    key={housing.id_housing}
                    className="bg-[#0f0f1a] border border-white/10 hover:border-[#ff3c6e]/40 rounded-sm p-6 transition-colors"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/30">
                            <Home className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-white/40 text-xs">Utilisateur</p>
                          </div>
                        </div>
                        <div className="flex-1 text-center">
                          <h3 className="text-white font-bold text-xl">{housing.event?.title || 'Événement'}</h3>
                          <p className="text-white/40 text-xs mt-1">{housing.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {housing.event?.category && (
                          <span className="bg-[#ff3c6e] text-white text-xs font-bold px-3 py-1 rounded">
                            {housing.event.category}
                          </span>
                        )}
                        <span className="bg-[#ff3c6e] text-white text-xs font-bold px-3 py-1 rounded">
                          Logement
                        </span>
                        {housing.event?.location && (
                          <span className="bg-[#ff3c6e] text-white text-xs font-bold px-3 py-1 rounded">
                            {housing.event.location}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Users className="w-4 h-4" />
                          {housing.available_places} places restantes
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedHousing(housing); }}
                          className="bg-[#ff3c6e] text-white font-bold px-5 py-2 rounded text-sm hover:bg-[#e0203d] transition-colors"
                        >
                          Réserver le logement
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full py-20 text-center">
                <p className="text-white/40 text-sm">Aucun logement trouvé.</p>
              </div>
            )
          )}

          <Link 
            href={activeTab === 'rides' ? '/community/rides' : '/community/housing'} 
            className="text-white/50 hover:text-white text-sm font-semibold transition-colors"
          >
            Voir plus de {activeTab === 'rides' ? 'trajets' : 'logements'}
          </Link>
        </div>

      </div>

      {selectedRide && (
        <RideDetailModal
          ride={selectedRide}
          onClose={() => setSelectedRide(null)}
          onSuccess={fetchData}
        />
      )}

      {selectedHousing && (
        <HousingDetailModal
          housing={selectedHousing}
          onClose={() => setSelectedHousing(null)}
          onSuccess={fetchData}
        />
      )}
    </main>
  );
}
