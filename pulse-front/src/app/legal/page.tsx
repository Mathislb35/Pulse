export default function LegalPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="border-b border-white/10">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <div className="mb-12">
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
                            Mise à jour : Mai 2026
                        </span>

                        <h1 className="mt-6 text-5xl font-bold tracking-tight">
                            Mentions légales
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-white/60">
                            Informations légales relatives à la plateforme Pulse.
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
        title: "Éditeur du site",
        content: [
            "Le site Pulse est édité par :",
            "Nom de la société : Pulse",
            "Statut juridique : SARL",
            "Capital social : 0€",
            "Siège social : 2 rue Gabriel Germain, 35000 Rennes",
            "Numéro SIRET : 147658976 00235",
            "Numéro TVA intracommunautaire : 09 654178965",
            "Adresse e-mail : contact@pulse.fr",
            "Téléphone : 0267451987",
            "Directeur de publication : PASQUIOU Athénaïs"
        ]
    },
    {
        title: "Hébergement du site",
        content: [
            "Le site Pulse est hébergé par :",
            "Nom de l’hébergeur : FIREW4LL",
            "Adresse : 1 rue de Paris, Rennes 35000",
            "Téléphone : 0287534901",
            "Site web : www.firew4ll.com"
        ]
    },
    {
        title: "Propriété intellectuelle",
        content: [
            "L’ensemble des contenus présents sur le site Pulse, incluant notamment :",
            "les textes",
            "les images",
            "les graphismes",
            "le logo",
            "l’identité visuelle",
            "les vidéos",
            "les éléments UI/UX",
            "les icônes",
            "les contenus téléchargeables",
            "sont protégés par le Code de la propriété intellectuelle.",
            "Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.",
            "Toute exploitation non autorisée du site ou de son contenu pourra faire l’objet de poursuites judiciaires."
        ]
    },
    {
        title: "Données personnelles",
        content: [
            "Les données personnelles collectées sur le site Pulse sont utilisées uniquement dans le cadre :",
            "de la gestion des comptes utilisateurs",
            "des transactions réalisées sur la plateforme",
            "de la communication avec les utilisateurs",
            "de l’amélioration des services proposés",
            "Pulse s’engage à respecter la réglementation en vigueur relative à la protection des données personnelles et le Règlement Général sur la Protection des Données (RGPD).",
            "Conformément à la législation applicable, l’utilisateur dispose :",
            "d’un droit d’accès",
            "d’un droit de rectification",
            "d’un droit de suppression",
            "d’un droit d’opposition",
            "d’un droit à la portabilité de ses données",
            "Ces droits peuvent être exercés à l’adresse suivante : reclamation@pulse.fr"
        ]
    },
    {
        title: "Cookies",
        content: [
            "Le site Pulse peut être amené à utiliser des cookies afin :",
            "d’améliorer l’expérience utilisateur",
            "de mesurer l’audience du site",
            "de proposer des contenus adaptés",
            "d’assurer le bon fonctionnement des services",
            "L’utilisateur peut modifier ses préférences de cookies directement depuis son navigateur."
        ]
    },
    {
        title: "Responsabilité",
        content: [
            "Pulse met tout en œuvre afin de fournir des informations fiables et régulièrement mises à jour.",
            "Toutefois, l’éditeur ne pourra être tenu responsable :",
            "d’erreurs ou omissions",
            "d’une interruption du site",
            "d’un dysfonctionnement technique",
            "de dommages résultant de l’utilisation du site",
            "Pulse agit comme plateforme de mise en relation entre utilisateurs et ne pourra être tenu responsable des échanges réalisés entre particuliers."
        ]
    },
    {
        title: "Droit applicable",
        content: [
            "Les présentes mentions légales sont soumises au droit français.",
            "En cas de litige, les tribunaux français seront seuls compétents."
        ]
    }
];
