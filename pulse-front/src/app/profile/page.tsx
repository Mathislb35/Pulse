'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  Ticket,
  Car,
  Calendar,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  Edit3,
  Plus,
} from 'lucide-react';
import api from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth';
import { formatImageUrl } from '../../lib/image';
import CreateEventModal from '../../component/modal-create-event';
import EventDetailModal from '../../component/modal_event';

interface UserData {
  id: number;
  nom: string;
  prenom: string;
  username: string;
  email: string;
  phone?: string;
  date_de_naissance?: string;
}

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
  Concert: 'bg-[#ff3c6e]/10 text-[#ff3c6e] border-[#ff3c6e]/20',
  Festival: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Soirée: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('informations');
  const [activeSection, setActiveSection] = useState('profil');
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { logout, user, loading: authLoading } = useAuth();

  const sidebarItems = [
    { id: 'profil', label: 'Mon profil', icon: User },
    { id: 'billets', label: 'Mes billets', icon: Ticket },
    { id: 'covoiturages', label: 'Mes covoiturages', icon: Car },
    { id: 'logements', label: 'Mes logements', icon: Calendar },
    { id: 'evenements', label: 'Mes événements', icon: Calendar },
    { id: 'favoris', label: 'Mes favoris', icon: Heart },
    { id: 'annonces', label: 'Mes annonces', icon: MessageSquare },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  const tabs = [
    { id: 'informations', label: 'Informations personnelles' },
    { id: 'securite', label: 'Sécurité' },
    { id: 'preferences', label: 'Préférences' },
    { id: 'notifications', label: 'Notifications' },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const fetchUserEvents = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/events/organizer/${user.id}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch user events:', error);
    }
  };

  useEffect(() => {
    if (user && activeSection === 'evenements') {
      fetchUserEvents();
    }
  }, [user, activeSection]);

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#080810] flex items-center justify-center">
        <p className="text-white/40">Chargement...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#080810] flex items-center justify-center">
        <p className="text-white/40">Utilisateur non trouvé</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080810] pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 bg-[#0f0f1a] border border-white/10 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#ff3c6e] mb-4 flex items-center justify-center bg-white/10">
              <User size={60} className="text-white/60" />
            </div>
            <h2 className="text-white text-lg font-bold mb-1">{user.prenom} {user.nom}</h2>
            <p className="text-white/40 text-sm mb-2">@{user.username}</p>
            <p className="text-white/30 text-xs">Membre depuis 2024</p>
          </div>

          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#ff3c6e] text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-white/60 hover:text-white hover:bg-white/5"
            >
              <LogOut size={18} />
              Se déconnecter
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeSection === 'profil' && (
            <>
              <h1 className="text-white text-2xl font-bold mb-6">Mon profil</h1>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-[#ff3c6e] border-b-2 border-[#ff3c6e] font-semibold'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'informations' && (
                <div className="bg-[#0f0f1a] border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-white text-lg font-semibold">Informations personnelles</h3>
                    <button className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                      <Edit3 size={16} />
                      Modifier
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Nom</label>
                      <p className="text-white text-sm">{user.nom}</p>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Prénom</label>
                      <p className="text-white text-sm">{user.prenom}</p>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Nom d'utilisateur</label>
                      <p className="text-white text-sm">@{user.username}</p>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Téléphone</label>
                      <p className="text-white text-sm">{user.phone || '-'}</p>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Adresse e-mail</label>
                      <p className="text-white text-sm">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Date de naissance</label>
                      <p className="text-white text-sm">{formatDate(user.date_de_naissance)}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'informations' && (
                <div className="bg-[#0f0f1a] border border-white/10 rounded-xl p-6 text-center">
                  <p className="text-white/40 text-sm">
                    Cette section sera bientôt disponible!
                  </p>
                </div>
              )}
            </>
          )}

          {activeSection === 'evenements' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-white text-2xl font-bold">Mes événements</h1>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} />
                  Créer un événement
                </button>
              </div>

              {events.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {events.map((event) => (
                    <div
                      key={event.id_events}
                      onClick={() => setSelectedEvent(event)}
                      className="bg-[#0f0f1a] border border-white/10 hover:border-[#ff3c6e]/40 rounded-2xl overflow-hidden transition-colors cursor-pointer group"
                    >
                      <div className="h-44 overflow-hidden">
                        <img
                          src={formatImageUrl(event.image_url)}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-2">
                        {event.category && (
                          <span className={`w-fit text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_STYLES[event.category] || 'bg-white/5 text-white/40 border-white/10'}`}>
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
                <div className="bg-[#0f0f1a] border border-white/10 rounded-xl p-12 text-center">
                  <p className="text-white/40 text-sm mb-4">Vous n'avez pas encore créé d'événement</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-[#ff3c6e] hover:bg-[#e0203d] text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Créer mon premier événement
                  </button>
                </div>
              )}
            </>
          )}

          {activeSection !== 'profil' && activeSection !== 'evenements' && (
            <div className="bg-[#0f0f1a] border border-white/10 rounded-xl p-6 text-center">
              <p className="text-white/40 text-sm">
                Cette section sera bientôt disponible!
              </p>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchUserEvents}
        />
      )}

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </main>
  );
}