'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, Users, DollarSign, Home } from 'lucide-react';
import api from '../lib/axios';
import { useAuth } from '../hooks/useAuth';

interface Event {
  id_events: number;
  title: string;
  location: string;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateHousingModal({ onClose, onSuccess }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, requireAuth } = useAuth();
  const [formData, setFormData] = useState({
    price: '',
    available_places: '',
    description: '',
    id_events: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await api.get('/events');
        setEvents(eventsRes.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des événements:", err);
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
      await api.post('/housing', {
        ...formData,
        price: parseFloat(formData.price),
        available_places: parseInt(formData.available_places),
        id_events: parseInt(formData.id_events)
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la création du logement. Veuillez vérifier que vous êtes connecté.';
      setError(errorMessage);
      console.error("Erreur lors de la création du logement:", err);
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
          <h2 className="text-white font-bold text-lg">Proposer un logement</h2>
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

          {/* Prix et Places */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Prix par nuit (€)
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
                name="available_places"
                value={formData.available_places}
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
              rows={4}
              placeholder="Informations supplémentaires (adresse, équipements, préférences, etc.)"
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
              {loading ? 'Création...' : 'Proposer le logement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
