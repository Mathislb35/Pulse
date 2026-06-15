'use client';

import Link from 'next/link';
import { Car, Users, MessageCircle } from 'lucide-react';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#080810] px-6 py-10">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-white text-3xl font-bold">Communauté</h1>
          <p className="text-white/40 text-sm mt-1 max-w-xl">
            Rejoignez la communauté Pulse et connectez-vous avec d'autres participants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/community/rides" 
            className="bg-[#0f0f1a] border border-white/10 hover:border-[#ff3c6e]/40 rounded-2xl p-6 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ff3c6e]/10 flex items-center justify-center text-[#ff3c6e]">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg group-hover:text-[#ff3c6e] transition-colors">Trajets</h3>
                <p className="text-white/40 text-sm">Trouvez ou proposez un covoiturage</p>
              </div>
            </div>
          </Link>

          <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl p-6 opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white/50 font-bold text-lg">Membres</h3>
                <p className="text-white/30 text-sm">Découvrez les membres de la communauté</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
