export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <div className="mb-12">
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
                            Mise à jour : Mai 2026
                        </span>

                        <h1 className="mt-6 text-5xl font-bold tracking-tight">
                            Politique de confidentialité
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-white/60">
                            Politique de confidentialité relative à la plateforme Pulse.
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
        title: "Introduction",
        content: [
            "La présente politique de confidentialité a pour objectif d’informer les utilisateurs de la plateforme Pulse sur la manière dont leurs données personnelles sont collectées, utilisées, protégées et conservées.",
            "Pulse s’engage à respecter la vie privée des utilisateurs ainsi que la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD)."
        ]
    },
    {
        title: "ARTICLE 1 – IDENTITÉ DU RESPONSABLE DU TRAITEMENT",
        content: [
            "Les données personnelles collectées sur la plateforme Pulse sont traitées par :",
            "Nom de la société : Pulse",
            "Adresse du siège social : 2 rue Gabriel Germain",
            "Adresse e-mail : contact@pulse.fr",
            "Site web : pulse-festival.fr"
        ]
    },
    {
        title: "ARTICLE 2 – DONNÉES COLLECTÉES",
        content: [
            "Dans le cadre de l’utilisation de la plateforme, Pulse peut collecter différentes données personnelles, notamment :",
            "",
            "Données d’identification :",
            "nom",
            "prénom",
            "pseudonyme",
            "adresse e-mail",
            "photo de profil",
            "",
            "Données de connexion :",
            "adresse IP",
            "navigateur utilisé",
            "données de navigation",
            "historique de connexion",
            "",
            "Données liées aux services :",
            "informations liées aux billets",
            "annonces de covoiturage",
            "informations d’hébergement",
            "échanges via la messagerie",
            "préférences utilisateurs",
            "",
            "Données de paiement :",
            "Les données de paiement sont traitées via des prestataires de paiement sécurisés partenaires. Pulse ne stocke pas les informations bancaires complètes des utilisateurs."
        ]
    },
    {
        title: "ARTICLE 3 – FINALITÉS DE LA COLLECTE DES DONNÉES",
        content: [
            "Les données personnelles collectées sont utilisées afin de :",
            "créer et gérer les comptes utilisateurs",
            "permettre l’accès aux fonctionnalités de la plateforme",
            "sécuriser les transactions",
            "améliorer l’expérience utilisateur",
            "assurer le bon fonctionnement des services",
            "envoyer des communications et newsletters",
            "lutter contre la fraude et les usages abusifs",
            "respecter les obligations légales"
        ]
    },
    {
        title: "ARTICLE 4 – BASE LÉGALE DU TRAITEMENT",
        content: [
            "Le traitement des données personnelles repose sur :",
            "le consentement de l’utilisateur",
            "l’exécution des services proposés par Pulse",
            "le respect des obligations légales",
            "l’intérêt légitime de la plateforme pour assurer sa sécurité et son amélioration"
        ]
    },
    {
        title: "ARTICLE 5 – CONSERVATION DES DONNÉES",
        content: [
            "Les données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.",
            "Certaines données peuvent être conservées plus longtemps afin de respecter les obligations légales ou réglementaires applicables."
        ]
    },
    {
        title: "ARTICLE 6 – PARTAGE DES DONNÉES",
        content: [
            "Les données personnelles peuvent être transmises à :",
            "des prestataires techniques",
            "des services de paiement sécurisés",
            "des outils d’analyse d’audience",
            "des partenaires techniques nécessaires au fonctionnement de la plateforme",
            "Pulse ne revend pas les données personnelles des utilisateurs à des tiers."
        ]
    },
    {
        title: "ARTICLE 7 – SÉCURITÉ DES DONNÉES",
        content: [
            "Pulse met en œuvre des mesures techniques et organisationnelles afin d’assurer :",
            "la sécurité des données",
            "la confidentialité des informations",
            "la protection contre les accès non autorisés",
            "la prévention des pertes ou divulgations de données",
            "Malgré ces mesures, aucun système informatique ne peut garantir une sécurité absolue."
        ]
    },
    {
        title: "ARTICLE 8 – DROITS DES UTILISATEURS",
        content: [
            "Conformément au RGPD, l’utilisateur dispose des droits suivants :",
            "droit d’accès",
            "droit de rectification",
            "droit de suppression",
            "droit d’opposition",
            "droit à la limitation du traitement",
            "droit à la portabilité des données",
            "",
            "L’utilisateur peut exercer ses droits :",
            "depuis son espace personnel",
            "via le formulaire de contact",
            "par e-mail à : reclamation@pulse.fr"
        ]
    },
    {
        title: "ARTICLE 9 – COOKIES",
        content: [
            "Le site Pulse peut utiliser des cookies afin :",
            "d’améliorer l’expérience utilisateur",
            "de mesurer l’audience du site",
            "de mémoriser certaines préférences",
            "d’assurer le bon fonctionnement des services",
            "L’utilisateur peut gérer ou désactiver les cookies directement depuis les paramètres de son navigateur."
        ]
    },
    {
        title: "ARTICLE 10 – NEWSLETTER ET COMMUNICATIONS",
        content: [
            "En créant un compte sur Pulse, l’utilisateur peut accepter de recevoir :",
            "des newsletters",
            "des informations relatives aux événements",
            "des offres partenaires",
            "des actualités liées à la plateforme",
            "L’utilisateur peut se désinscrire à tout moment via le lien prévu dans les e-mails envoyés."
        ]
    },
    {
        title: "ARTICLE 11 – MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ",
        content: [
            "Pulse se réserve le droit de modifier la présente politique de confidentialité à tout moment afin de l’adapter aux évolutions légales, réglementaires ou techniques.",
            "Les utilisateurs seront informés des éventuelles modifications via la plateforme ou par e-mail."
        ]
    }
];
