'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, Calendar, Clock, Users, MapPin, DollarSign } from 'lucide-react';
import api from '../lib/axios';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

interface Commune {
  id_commune: number;
  name: string;
  postal_code: string;
}

interface Event {
  id_events: number;
  title: string;
  location: string;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateRideModal({ onClose, onSuccess }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, requireAuth } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    departure_time: '',
    price: '',
    available_seats: '',
    description: '',
    departure_commune_id: '',
    arrival_commune_id: '',
    id_events: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, communesRes] = await Promise.all([
          api.get('/events'),
          api.get('/communes')
        ]);
        setEvents(eventsRes.data);
        setCommunes(communesRes.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isAuthenticated) {
      requireAuth();
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/rides', {
        ...formData,
        price: parseFloat(formData.price),
        available_seats: parseInt(formData.available_seats),
        departure_commune_id: parseInt(formData.departure_commune_id),
        arrival_commune_id: parseInt(formData.arrival_commune_id),
        id_events: parseInt(formData.id_events)
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la création du trajet. Veuillez vérifier que vous êtes connecté.';
      setError(errorMessage);
      console.error("Erreur lors de la création du trajet:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative bg-[#0a0a14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#0a0a14]/90 backdrop-blur-md border-b border-white/8">
          <button onClick={onClose} className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>
          <h2 className="text-white font-bold text-lg">Proposer un trajet</h2>
          <div className="w-20"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-[#f87171] px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          
          {/* Événement */}
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm font-medium">Événement</label>
            <select
              name="id_events"
              value={formData.id_events}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
            >
              <option value="">Sélectionnez un événement</option>
              {events.map(event => (
                <option key={event.id_events} value={event.id_events}>
                  {event.title} - {event.location}
                </option>
              ))}
            </select>
          </div>

          {/* Date et Heure */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <input
                type="date"
                name="departure_time"
                value={formData.departure_time.split('T')[0]}
                onChange={(e) => handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: 'departure_time',
                    value: e.target.value + (formData.departure_time.split('T')[1] ? 'T' + formData.departure_time.split('T')[1] : 'T00:00')
                  }
                })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" /> Heure
              </label>
              <input
                type="time"
                name="departure_time_time"
                value={formData.departure_time.split('T')[1] || ''}
                onChange={(e) => handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: 'departure_time',
                    value: (formData.departure_time.split('T')[0] || new Date().toISOString().split('T')[0]) + 'T' + e.target.value
                  }
                })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              />
            </div>
          </div>

          {/* Départ et Arrivée */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Ville de départ
              </label>
              <select
                name="departure_commune_id"
                value={formData.departure_commune_id}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              >
                <option value="">Sélectionnez une ville</option>
                {communes.map(commune => (
                  <option key={commune.id_commune} value={commune.id_commune}>
                    {commune.name} ({commune.postal_code})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Ville d'arrivée
              </label>
              <select
                name="arrival_commune_id"
                value={formData.arrival_commune_id}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              >
                <option value="">Sélectionnez une ville</option>
                {communes.map(commune => (
                  <option key={commune.id_commune} value={commune.id_commune}>
                    {commune.name} ({commune.postal_code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prix et Places */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Prix par place (€)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" /> Places disponibles
              </label>
              <input
                type="number"
                name="available_seats"
                value={formData.available_seats}
                onChange={handleChange}
                min="1"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Informations supplémentaires (point de rendez-vous précis, préférences, etc.)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors resize-none"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-white/10 hover:bg-white/5 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#ff3c6e] hover:bg-[#e0203d] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Création...' : 'Proposer le trajet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
