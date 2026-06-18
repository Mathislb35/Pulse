'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, MapPin, Calendar, Clock, Users, ChevronLeft, MessageCircle, Home } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

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

interface Props {
  housing: Housing;
  onClose: () => void;
}

export default function HousingDetailModal({ housing, onClose }: Props) {
  const [placesToReserve, setPlacesToReserve] = useState(1);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

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
                <p className="text-white font-bold text-2xl">{housing.event?.title || 'Événement'}</p>
                <p className="text-white/40 text-sm mt-1">📍 {housing.event?.location || 'Lieu'}</p>
              </div>
              <div className="text-right">
                <p className="text-[#ff3c6e] font-bold text-3xl">{housing.price} €</p>
                <p className="text-white/30 text-[10px]">par nuit</p>
              </div>
            </div>
          </div>

          {/* Logement visuel */}
          <div className="bg-[#0f0f1e] border border-white/8 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ff3c6e]/10 flex items-center justify-center text-[#ff3c6e]">
                <Home className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Logement disponible</p>
                <p className="text-white/40 text-sm">{housing.available_places} places disponibles</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-3">Informations</p>
            <p className="text-white/50 text-sm leading-relaxed">{housing.description}</p>
          </div>

          {/* Places disponibles */}
          <div className="mb-6">
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-3">Réserver</p>
            <div className="bg-[#0f0f1e] border border-white/8 rounded-xl p-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white font-medium">{housing.available_places} places disponibles</p>
                      <p className="text-white/30 text-xs">Ne manquez pas votre place !</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPlacesToReserve(Math.max(1, placesToReserve - 1))}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:border-[#ff3c6e]/40 hover:text-[#ff3c6e] transition-all"
                      >
                        -
                      </button>
                      <span className="text-white font-bold w-8 text-center">{placesToReserve}</span>
                      <button
                        onClick={() => setPlacesToReserve(Math.min(housing.available_places, placesToReserve + 1))}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:border-[#ff3c6e]/40 hover:text-[#ff3c6e] transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/8">
                    <div>
                      <p className="text-white/40 text-xs">Total</p>
                      <p className="text-white font-bold text-lg">{housing.price * placesToReserve} €</p>
                    </div>
                    <button className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
                      Réserver
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-white/50 text-sm mb-4">Connectez-vous pour réserver ce logement</p>
                  <button 
                    onClick={() => { onClose(); router.push('/login'); }}
                    className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Se connecter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
