import {
    Ticket,
    Megaphone,
    Users,
    ShieldCog,
    HousePlus,
    BarChart3,
    Globe,
} from "lucide-react";

const features = [
    { name: "Billetterie intégré", icon: Ticket, description: "Vendez vos billets en ligne simplements,\n" + "en toute sécurité." },
    { name: "Visibilité maximale", icon: Megaphone, description: "Votre événement mis en avant\n" +
            "auprès d’une communauté\n" +
            "engagée de festivaliers." },
    { name: "Communauté engagée", icon: Users, description: "Interagissez avec votre audience\n" +
            "avant, pendant et après\n" +
            "l’événement." },
    { name: "Outils de gestion", icon: ShieldCog, description: "Gérez vos événements,\n" +
        "équipes, accès et données\n" +
        "depuis un seul tableau de bord" },
    { name: "Services partenaires", icon: HousePlus, description: "Proposez facilement du\n" +
            "covoiturage, des logements\n" +
            "et plus encore." },
    { name: "Données & rapports", icon: BarChart3, description: "Analysez vos performances\n" +
            "et prenez les meilleures\n" +
            "décisions." },
];

export default function LandingPage() {
    return (
        <main className="bg-[#080810] text-white">
            {/* HERO */}
            <section className="border-b border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-24 lg:flex-row">
                    {/* LEFT */}
                    <div className="flex-1">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#ff3c6e]">
                            Professionnels de l’événementiel
                        </p>

                        <h1 className="text-4xl font-bold leading-tight">
                            Développez vos événements.
                            <br />
                            Touchez plus.
                            <br />
                            Gérez mieux.
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                            Rejoignez la plateforme tout-en-un dédiée aux
                            festivals, forums et événements professionnels.
                            Centralisez votre gestion, développez votre
                            visibilité et améliorez l’expérience participant.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <button className="rounded-xl bg-[#ff3c6e] hover:bg-[#e0203d] px-6 py-3 text-sm text-white font-bold transition hover:bg-pink-400">
                                Rejoindre la plateforme
                            </button>

                            <button className="rounded-xl border border-white/10 bg-[#0f0f1a] px-6 py-3 text-sm text-white font-bold transition hover:border-pink-500/40">
                                Demander une démo
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1">
                        <div className="rounded-3xl border border-white/10 bg-[#0f0f1a] p-4 shadow-2xl">
                            <div className="aspect-video rounded-2xl bg-zinc-800" />

                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="rounded-2xl border border-white/5 bg-[#151522] p-4">
                                    <p className="text-sm text-zinc-500">
                                        Participants
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-white">
                                        12k
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/5 bg-[#151522] p-4">
                                    <p className="text-sm text-zinc-500">
                                        Billets
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-white">
                                        8.4k
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/5 bg-[#151522] p-4">
                                    <p className="text-sm text-zinc-500">
                                        Satisfaction
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-white">
                                        98%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-4xl font-bold text-white">
                            Tout ce qu’il vous faut,
                            <br />
                            réuni au même endroit
                        </h2>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {features.map(({ name, icon: Icon, description }) => (
                            <div
                                key={name}
                                className="group flex flex-col items-center text-center rounded-xl border border-white/10 bg-[#0f0f1a] p-4 transition hover:border-[#ff3c6e] hover:bg-[#141420]"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                                    <Icon className="h-4 w-4 text-[#ff3c6e]" />
                                </div>

                                <h3 className="mt-3 text-sm font-bold text-white">
                                    {name}
                                </h3>

                                <p className="mt-2 text-sm font-medium text-zinc-500">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ORGANISATEURS */}
            <section className="overflow-hidden py-28">
                <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">
                    {/* LEFT */}
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#ff3c6e]">
                            Pour tous les organisateurs
                        </p>

                        <h2 className="mt-5 text-5xl font-bold leading-tight text-white">
                            Une solution adaptée
                            <br />
                            à chaque événement
                        </h2>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
                            Que vous organisiez un salon professionnel, un
                            festival, un forum étudiant ou une conférence, la
                            plateforme s’adapte à vos besoins et à votre
                            audience.
                        </p>

                        <ul className="mt-10 space-y-4 text-zinc-300">
                            <li>• Gestion simplifiée des participants</li>
                            <li>• Billetterie et inscriptions centralisées</li>
                            <li>• Communication en temps réel</li>
                            <li>• Tableaux de bord et statistiques</li>
                        </ul>
                    </div>

                    {/* RIGHT */}
                    <div className="relative flex h-[500px] w-full items-center justify-center">
                        {/* IMAGE 1 */}
                        <div className="absolute left-0 top-10 h-72 w-56 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                                alt="Événement"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* IMAGE 2 */}
                        <div className="absolute right-0 top-0 z-10 h-80 w-64 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1511578314322-379afb476865?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                                alt="Conférence"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* IMAGE 3 */}
                        <div className="absolute bottom-0 left-24 h-72 w-60 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                                alt="Salon professionnel"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* FLOATING CARD */}
                        <div className="absolute bottom-10 z-20 rounded-2xl border border-white/10 bg-[#0f0f1a]/95 px-6 py-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                            <p className="text-lg font-semibold text-white">
                                De 100 à 100 000+ participants
                            </p>

                            <p className="mt-2 text-sm leading-6 text-zinc-400">
                                Nous accompagnons tous les formats
                                d’événements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white">
                            Ils nous font confiance
                        </h2>
                    </div>

                    <div className="mt-16 grid gap-6 lg:grid-cols-3">
                        {[
                            {
                                name: 'Alice D.',
                                role: 'Directrice • Sunset Festival',
                                text: 'La plateforme nous a permis d’augmenter notre visibilité et de simplifier toute notre organisation.',
                            },
                            {
                                name: 'Romain B.',
                                role: 'Fondateur • Web Day',
                                text: 'Une solution intuitive et très efficace pour gérer nos événements professionnels.',
                            },
                            {
                                name: 'Julie R.',
                                role: 'Responsable • Electro Park',
                                text: 'Le meilleur outil que nous ayons utilisé pour gérer notre communauté.',
                            },
                        ].map((testimonial) => (
                            <div
                                key={testimonial.name}
                                className="rounded-3xl border border-white/10 bg-[#0f0f1a] p-8"
                            >
                                <p className="text-lg leading-8 text-zinc-300">
                                    “{testimonial.text}”
                                </p>

                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-zinc-700" />

                                    <div>
                                        <p className="font-semibold text-white">
                                            {testimonial.name}
                                        </p>

                                        <p className="text-sm text-zinc-500">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
                        {[
                            '500+ événements',
                            '1M+ participants',
                            '3 pays couverts',
                            '98% satisfaction',
                        ].map((stat) => (
                            <div
                                key={stat}
                                className="rounded-2xl border border-white/10 bg-[#0f0f1a] p-6 text-center"
                            >
                                <p className="text-2xl font-bold text-white">
                                    {stat}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/10 py-24">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
                    <div>
                        <h2 className="text-4xl font-bold text-white">
                            Rejoignez-nous dès aujourd’hui
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-zinc-400">
                            Créez votre compte gratuitement et commencez à gérer
                            vos événements plus efficacement.
                        </p>

                        <ul className="mt-8 space-y-3 text-zinc-300">
                            <li>• Accès rapide à la plateforme</li>
                            <li>• Tableau de bord complet</li>
                            <li>• Outils de gestion avancés</li>
                            <li>• Sans engagement</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#0f0f1a] p-8">
                        <div className="aspect-video rounded-2xl bg-zinc-800" />

                        <button className="mt-6 w-full rounded-xl bg-[#ff3c6e] py-4 font-bold text-white transition hover:bg-pink-400">
                            Créer mon compte
                        </button>

                        <p className="mt-4 text-center text-sm text-zinc-500">
                            En créant un compte vous acceptez nos conditions.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}