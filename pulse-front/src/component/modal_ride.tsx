'use client';

import { useEffect, useState } from 'react';
import { X, MapPin, Calendar, Clock, Users, ChevronLeft, MessageCircle } from 'lucide-react';

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
  event: Event;
}

interface Props {
  ride: Ride;
  onClose: () => void;
}

export default function RideDetailModal({ ride, onClose }: Props) {
  const [seatsToReserve, setSeatsToReserve] = useState(1);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0a0a14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#0a0a14]/90 backdrop-blur-md border-b border-white/8">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-bold text-2xl">{ride.event.title}</p>
                <p className="text-white/40 text-sm mt-1">📍 {ride.event.location}</p>
              </div>
              <div className="text-right">
                <p className="text-[#ff3c6e] font-bold text-3xl">{ride.price} €</p>
                <p className="text-white/30 text-[10px]">par place</p>
              </div>
            </div>
          </div>

          {/* Itinéraire visuel */}
          <div className="bg-[#0f0f1e] border border-white/8 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#ff3c6e]" />
                <div className="w-0.5 h-16 bg-white/20" />
                <div className="w-4 h-4 rounded-full bg-purple-400" />
              </div>
              <div className="flex-1 flex flex-col justify-between h-20">
                <div>
                  <p className="text-white font-medium">Départ</p>
                  <p className="text-white/40 text-sm">
                    {new Date(ride.departure_time).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à {new Date(ride.departure_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium">Arrivée</p>
                  <p className="text-white/40 text-sm">{ride.event.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conducteur */}
          <div className="mb-6">
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-3">Conducteur</p>
            <div className="flex items-center gap-3 bg-[#0f0f1e] border border-white/8 rounded-xl p-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 text-2xl">
                {ride.user.username ? ride.user.username.charAt(0).toUpperCase() : '?'}
              </div>
              <div>
                <p className="text-white font-medium">{ride.user.username || 'Utilisateur'}</p>
                <p className="text-white/40 text-xs">{ride.user.email}</p>
              </div>
              <button className="ml-auto flex items-center gap-2 border border-white/10 hover:border-[#ff3c6e]/40 text-white/50 hover:text-[#ff3c6e] px-4 py-2 rounded-lg text-xs transition-all">
                <MessageCircle className="w-3.5 h-3.5" /> Contacter
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-3">Informations</p>
            <p className="text-white/50 text-sm leading-relaxed">{ride.description}</p>
          </div>

          {/* Places disponibles */}
          <div className="mb-6">
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-3">Réserver</p>
            <div className="bg-[#0f0f1e] border border-white/8 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">{ride.available_seats} places disponibles</p>
                  <p className="text-white/30 text-xs">Ne manquez pas votre place !</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSeatsToReserve(Math.max(1, seatsToReserve - 1))}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:border-[#ff3c6e]/40 hover:text-[#ff3c6e] transition-all"
                  >
                    -
                  </button>
                  <span className="text-white font-bold w-8 text-center">{seatsToReserve}</span>
                  <button
                    onClick={() => setSeatsToReserve(Math.min(ride.available_seats, seatsToReserve + 1))}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:border-[#ff3c6e]/40 hover:text-[#ff3c6e] transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <div>
                  <p className="text-white/40 text-xs">Total</p>
                  <p className="text-white font-bold text-lg">{ride.price * seatsToReserve} €</p>
                </div>
                <button className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
