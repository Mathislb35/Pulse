'use client';

import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, Calendar, MapPin, Image, Edit3, Upload, Trash2 } from 'lucide-react';
import api from '../lib/axios';
import { useAuth } from '../hooks/useAuth';

interface Commune {
  id_commune: number;
  name: string;
  postal_code: string;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateEventModal({ onClose, onSuccess }: Props) {
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [imageMethod, setImageMethod] = useState<'url' | 'upload'>('url');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, requireAuth, user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    image_url: '',
    start_date: '',
    end_date: '',
    id_commune: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const communesRes = await api.get('/communes');
        setCommunes(communesRes.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setUploadingImage(true);

    const formDataImage = new FormData();
    formDataImage.append('file', file);

    try {
      const response = await api.post('/upload/image', formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData(prev => ({
        ...prev,
        image_url: response.data.image_url
      }));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erreur lors du téléchargement de l\'image';
      setError(errorMessage);
      console.error("Erreur lors du téléchargement de l'image:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isAuthenticated) {
      requireAuth();
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/events', {
        ...formData,
        id_commune: parseInt(formData.id_commune),
        organizerId: user?.id
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la création de l\'événement. Veuillez vérifier que vous êtes connecté.';
      setError(errorMessage);
      console.error("Erreur lors de la création de l'événement:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'image_url' && e.target.value) {
      setPreviewImage(e.target.value);
    }
  };

  const clearImage = () => {
    setFormData(prev => ({
      ...prev,
      image_url: ''
    }));
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative bg-[#0a0a14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#0a0a14]/90 backdrop-blur-md border-b border-white/8">
          <button onClick={onClose} className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>
          <h2 className="text-white font-bold text-lg">Créer un événement</h2>
          <div className="w-20"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-[#f87171] px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          
          {/* Titre */}
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm font-medium">Titre</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Nom de l'événement"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
            />
          </div>

          {/* Dates de début et fin */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date de début
              </label>
              <input
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date de fin
              </label>
              <input
                type="datetime-local"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              />
            </div>
          </div>

          {/* Lieu et Commune */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Lieu
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Adresse précise"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium">Ville</label>
              <select
                name="id_commune"
                value={formData.id_commune}
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

          {/* Catégorie */}
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm font-medium">Catégorie</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="Concert">Concert</option>
              <option value="Festival">Festival</option>
              <option value="Soirée">Soirée</option>
            </select>
          </div>

          {/* Image */}
          <div className="flex flex-col gap-3">
            <label className="text-white/70 text-sm font-medium flex items-center gap-2">
              <Image className="w-4 h-4" /> Image de l'événement
            </label>

            {/* Toggle entre URL et Upload */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setImageMethod('url')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  imageMethod === 'url'
                    ? 'bg-[#ff3c6e] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setImageMethod('upload')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  imageMethod === 'upload'
                    ? 'bg-[#ff3c6e] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                Télécharger
              </button>
            </div>

            {/* URL Input */}
            {imageMethod === 'url' && (
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff3c6e]/50 transition-colors"
              />
            )}

            {/* File Upload */}
            {imageMethod === 'upload' && (
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-4 text-white/60 hover:border-[#ff3c6e]/50 hover:text-white transition-colors disabled:opacity-50"
                >
                  <Upload className="w-5 h-5" />
                  {uploadingImage ? 'Téléchargement...' : 'Choisir un fichier image'}
                </button>
              </div>
            )}

            {/* Preview */}
            {previewImage && (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Aperçu"
                  className="w-full h-48 object-cover rounded-xl border border-white/10"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-white/70 text-sm font-medium flex items-center gap-2">
              <Edit3 className="w-4 h-4" /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Description de l'événement"
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
              {loading ? 'Création...' : 'Créer l\'événement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
