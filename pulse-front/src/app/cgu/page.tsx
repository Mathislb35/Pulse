export default function CGUPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <div className="mb-12">
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
                            Mise à jour : Mai 2026
                        </span>

                        <h1 className="mt-6 text-5xl font-bold tracking-tight">
                            Conditions Générales d’Utilisation
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-white/60">
                            Conditions d’utilisation de la plateforme Pulse.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
                            >
                                <h2 className="mb-4 text-2xl font-semibold">
                                    {section.title}
                                </h2>

                                <div className="space-y-4 text-white/70">
                                    {section.content.map((text, i) => (
                                        <p key={i} className="leading-7">
                                            {text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

const sections = [
    {
        title: "ARTICLE 1 : Objet",
        content: [
            "Les présentes « Conditions Générales d’Utilisation » ont pour objet l’encadrement juridique de l’utilisation du site Pulse et de ses services.\n" +
            "Ce contrat est conclu entre :\n",
            "◦ L’éditeur du site internet, ci-après désigné « l’Éditeur » ;\n",
            "◦ Toute personne physique ou morale souhaitant accéder au site et à ses services, ci-après appelée « l’Utilisateur ».\n",
            "Les présentes Conditions Générales d’Utilisation doivent être acceptées par tout Utilisateur. L’accès au site vaut acceptation des présentes conditions.\n"
        ]
    },
    {
        title: "ARTICLE 2 : Mentions légales",
        content: [
            "Le site Pulse est édité par la société SARL Pulse située au 2 rue Gabriel Germain, 35000 Rennes.",
            "La société est représentée par PASQUIOU Athénaïs.",
            "Site web : pulse-festival.fr"
        ]
    },
    {
        title: "ARTICLE 3 : Accès aux services",
        content: [
            "L’Utilisateur du site Pulse a accès aux services suivants :\n" +
            "achat et revente de billets \n" +
            "organisation de covoiturages \n" +
            "recherche et proposition d’hébergements \n" +
            "espace communautaire et messagerie \n" +
            "consultation d’événements musicaux \n" +
            "services premium et boosts de visibilité\n" +
            "Tout utilisateur ayant accès à internet peut accéder gratuitement au site depuis n’importe quel endroit.\n" +
            "Les frais supportés par l’Utilisateur pour accéder au service (connexion internet, matériel informatique, etc.) ne sont pas à la charge de l’Éditeur.\n" +
            "Certaines fonctionnalités sont accessibles uniquement aux utilisateurs disposant d’un compte personnel :\n" +
            "publication d’annonces \n" +
            "achat ou revente de billets \n" +
            "réservation de covoiturages \n" +
            "accès aux fonctionnalités premium \n" +
            "messagerie entre utilisateurs\n" +
            "Le site et ses différents services peuvent être interrompus ou suspendus par l’Éditeur, notamment dans le cadre d’une maintenance, sans obligation de préavis.\n"
        ]
    },
    {
        title: "ARTICLE 4 : Responsabilité de l’Utilisateur",
        content: [
            "L’Utilisateur est responsable des risques liés à l’utilisation de son identifiant de connexion et de son mot de passe.\n" +
            "Le mot de passe de l’Utilisateur doit rester confidentiel. En cas de divulgation, l’Éditeur décline toute responsabilité.\n" +
            "L’Utilisateur assume l’entière responsabilité de l’utilisation qu’il fait des informations et contenus présents sur le site Pulse.\n" +
            "Le site permet aux membres de publier :\n",
            "◦ des commentaires \n",
            "◦ des annonces \n",
            "◦ des messages \n",
            "◦ des contenus communautaires \n",
            "◦ des informations liées aux événements\n",
            "L’Utilisateur s’engage à tenir des propos respectueux des autres utilisateurs et conformes à la législation française.\n" +
            "Toute publication jugée inappropriée, frauduleuse, offensive ou illégale pourra être supprimée par l’Éditeur sans justification préalable.\n" +
            "En publiant sur le site, l’Utilisateur autorise Pulse à utiliser, reproduire et diffuser ses contenus dans le cadre du fonctionnement de la plateforme et de sa communication.\n"
        ]
    },
    {
        title: "ARTICLE 5 : Responsabilité de l’Éditeur",
        content: [
            "Tout dysfonctionnement du serveur ou du réseau ne peut engager la responsabilité de l’Éditeur.\n" +
            "De même, la responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d’un tiers.\n" +
            "Pulse s’engage à mettre en œuvre tous les moyens raisonnables afin d’assurer la sécurité et la confidentialité des données personnelles des utilisateurs.\n" +
            "Pulse agit uniquement comme plateforme de mise en relation entre utilisateurs et ne pourra être tenu responsable :\n" +
            "des litiges entre utilisateurs \n" +
            "de l’annulation d’un événement \n" +
            "d’un problème lié à un covoiturage \n" +
            "d’un problème lié à un hébergement \n" +
            "d’un billet frauduleux \n" +
            "du comportement d’un utilisateur lors d’un événement\n"
        ]
    },
    {
        title: "ARTICLE 6 : Propriété intellectuelle",
        content: [
            "Les contenus présents sur le site Pulse (logos, textes, éléments graphiques, vidéos, design UI/UX, identité visuelle, etc.) sont protégés par le Code de la propriété intellectuelle.\n" +
            "Toute reproduction, diffusion, modification ou exploitation de ces contenus sans autorisation préalable est interdite.\n" +
                "Les contenus peuvent être utilisés uniquement dans un cadre privé et non commercial.\n" +
                "L’Utilisateur reste responsable des contenus qu’il publie sur la plateforme et s’engage à ne pas porter atteinte aux droits de tiers.\n" +
            "L’Éditeur se réserve le droit de modérer ou supprimer librement tout contenu publié par les utilisateurs."
        ]
    },
    {
        title: "ARTICLE 7 : Données personnelles",
        content: [
            "L’Utilisateur doit obligatoirement fournir certaines informations personnelles afin de créer un compte sur la plateforme.\n" +
            "L’adresse e-mail et le numéro de téléphone de l’Utilisateur pourra être utilisée par Pulse pour :\n" +
            "la gestion du compte utilisateur\n" +
            "l’envoi d’informations liées au service\n" +
            "les communications marketing\n" +
            "la newsletter\n" +
            "Pulse garantit le respect de la vie privée de l’Utilisateur conformément à la réglementation en vigueur et au Règlement Général sur la Protection des Données (RGPD).\n" +
                "L’Utilisateur dispose :\n" +
                "d’un droit d’accès\n" +
            "d’un droit de rectification\n" +
            "d’un droit de suppression de ses données personnelles\n" +
            "Ces droits peuvent être exercés :\n" +
                "depuis l’espace personnel\n" +
            "via le formulaire de contact\n" +
            "par e-mail à : réclamation@pulse.fr ;\n" +
            "par courrier à : 2 rue Gabriel Germain, 35000 Rennes."
        ]
    },
    {
        title: "ARTICLE 8 : Liens hypertextes",
        content: [
            "Le site Pulse peut contenir des liens hypertextes vers des sites externes.\n" +
            "L’Éditeur n’exerce aucun contrôle sur ces sites et ne pourra être tenu responsable de leur contenu ou fonctionnement.\n" +
            "Tout site tiers peut créer un lien vers une page du site Pulse sans autorisation préalable, sous réserve de ne pas porter atteinte à l’image du site.\n"
        ]
    },
    {
        title: "ARTICLE 9 : Évolution des CGU",
        content: [
            "Pulse se réserve le droit de modifier les présentes Conditions Générales d’Utilisation à tout moment et sans justification.\n" +
            "Les utilisateurs seront informés des modifications via la plateforme ou par courrier électronique.\n"
        ]
    },
    {
        title: "ARTICLE 10 : Durée du contrat",
        content: [
            "La durée du présent contrat est indéterminée.\n" +
            "Le contrat produit ses effets à l’égard de l’Utilisateur à compter du début de l’utilisation du service.\n"
        ]
    },
    {
        title: "ARTICLE 11 : Droit applicable",
        content: [
            "Les présentes Conditions Générales d’Utilisation sont soumises au droit français.",
            "En cas de litige non résolu à l’amiable entre l’Utilisateur et l’Éditeur, les tribunaux français seront seuls compétents pour régler le contentieux."
        ]
    }
];