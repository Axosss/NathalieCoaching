const { createClient } = require("@sanity/client");
const { readFileSync } = require("fs");
const { join } = require("path");

// Load token from .env.local
let TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) {
  try {
    const envFile = readFileSync(join(__dirname, "..", ".env.local"), "utf-8");
    const match = envFile.match(/^SANITY_TOKEN=(.+)$/m);
    if (match) TOKEN = match[1].trim();
  } catch {}
}
if (!TOKEN) {
  console.error("Set SANITY_TOKEN env var first");
  process.exit(1);
}

const client = createClient({
  projectId: "pyvdxbda",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

const documents = [
  // ── SITE SETTINGS ──
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Nathalie Debeir",
    email: "nathalie.elevateplus@gmail.com",
    linkedin: "https://linkedin.com/in/nathaliedebeircareerdevelopment",
    calendlyUrl: "",
    formspreeId: "VOTRE_ID",
    companyName: "Elevate Plus SAS",
    navPrestations: "Prestations",
    navAbout: "À propos",
    navCta: "Prendre rendez-vous",
    cookieText: "Ce site utilise des cookies à des fins statistiques.",
    cookieAccept: "Accepter",
    cookieRefuse: "Refuser",
    metaDescriptionHome: "Coach professionnelle certifiee, ex-membre de comite de direction. Leadership, transition, performance. Accompagnement de cadres dirigeants.",
    galleryCtaText: "Réserver ma session découverte →",
  },

  // ── HOME HERO ──
  {
    _id: "homeHero",
    _type: "homeHero",
    title: "Votre prochain chapitre commence par une conversation.",
    subtitle:
      "Accompagnement par une coach professionnelle certifiée, ex-membre de comité de direction.",
    ctaText: "Réserver un appel découverte gratuit de 45 mn →",
    heroImageAlt: "Nathalie Debeir sur une dune de sable",
  },

  // ── MIRROR ──
  {
    _id: "mirrorSection",
    _type: "mirrorSection",
    heading: "Vous êtes peut-être à un tournant.",
    cards: [
      {
        _key: "m1",
        text: "Vous êtes face à une difficulté qui prend trop de place et que vous souhaiteriez dépasser.",
      },
      {
        _key: "m2",
        text: "Vous souhaitez donner plus de sens à votre vie et changer de métier.",
      },
      {
        _key: "m3",
        text: "Vous managez et souhaitez travailler votre leadership pour plus d'engagement.",
      },
      {
        _key: "m4",
        text: "Vous voulez améliorer votre communication et être plus efficace avec l'autre.",
      },
    ],
    ctaText: "Parlons-en →",
  },

  // ── COACHINGS SECTION ──
  {
    _id: "coachingsSection",
    _type: "coachingsSection",
    label: "Mes accompagnements",
    title: "Des coachings pour toutes les situations",
    formatText:
      "Flash coaching ou forfait de 8 sessions — c'est vous qui choisissez.",
    ctaText: "Découvrir mes accompagnements →",
  },

  // ── COACHING CARDS ──
  {
    _id: "coaching-1",
    _type: "coaching",
    title: "Les entretiens clés de votre vie professionnelle",
    description:
      "Recherche de poste ou de mandat d'administrateur, prise de poste, préparation de votre évaluation annuelle, négociation du package salarial.",
    order: 1,
  },
  {
    _id: "coaching-2",
    _type: "coaching",
    title: "Trouver votre style de leadership",
    description:
      "Communiquer de façon transparente et authentique, savoir donner du feedback, embarquer vos équipes.",
    order: 2,
  },
  {
    _id: "coaching-3",
    _type: "coaching",
    title: "Être plus performant·e",
    description:
      "Prioriser ce qui doit l'être, déléguer, réduire le stress pour un meilleur équilibre de vie. Comprendre la politique de votre entreprise et gagner en influence.",
    order: 3,
  },
  {
    _id: "coaching-4",
    _type: "coaching",
    title: "Comprendre les différences interculturelles",
    description:
      "Évoluer dans un environnement international, adapter sa communication selon la zone géographique de son interlocuteur.",
    order: 4,
  },
  {
    _id: "coaching-5",
    _type: "coaching",
    title: "Changer de cap",
    description:
      "Naviguer dans l'arsenal juridique et réglementaire de la transition et de l'entrepreneuriat. Négociation de départ, France Travail, retraite Agirc Arrco, Urssaf, choix du statut juridique.",
    order: 5,
  },

  // ── WHOIS ──
  {
    _id: "whois",
    _type: "whois",
    label: "Qui suis-je",
    name: "Nathalie Debeir",
    role: "Coach professionnelle certifiée",
    bio1: "Après 25 ans en tant que Secrétaire Générale et Directrice Juridique de groupes internationaux — ETI et CAC40 —, je me consacre à l'accompagnement des dirigeant·es. Formée au coaching professionnel et à la Process Communication Model®.",
    bio2: "Bilingue anglais, double bagage franco-canadien. Diplômée de la Sorbonne et de McGill. Expatriation au Canada et en Chine.",
    ctaText: "En savoir plus →",
  },

  // ── TESTIMONIALS SECTION ──
  {
    _id: "testimonialsSection",
    _type: "testimonialsSection",
    label: "Témoignages",
    title: "Elles ont franchi le pas",
    ctaText: "Réserver un appel découverte →",
  },

  // ── TESTIMONIALS ──
  {
    _id: "testimonial-1",
    _type: "testimonial",
    theme: "Évolution professionnelle",
    text: "Valérie souhaitait progresser dans sa carrière. Ensemble, nous avons identifié ses forces et défini ses objectifs. Sur la base de son plan d'action, elle a amélioré ses compétences en leadership, renforcé sa communication interpersonnelle et obtenu une promotion en changeant de département.",
    order: 1,
  },
  {
    _id: "testimonial-2",
    _type: "testimonial",
    theme: "Équilibre vie privée / vie pro",
    text: "Anne-Lise ressentait un déséquilibre entre sa vie professionnelle et personnelle depuis de nombreuses années. Dans le cadre d'une nouvelle prise de poste, elle a établi des limites claires en osant dire non, amélioré sa gestion du temps et identifié des moyens concrets pour réduire son stress. Résultat : une meilleure qualité de vie et une performance accrue au travail.",
    order: 2,
  },
  {
    _id: "testimonial-3",
    _type: "testimonial",
    theme: "Transition de carrière",
    text: "Anne désirait changer de carrière. Le coaching lui a permis d'explorer ses passions, de nommer ses valeurs et de capitaliser sur ses compétences. À l'issue du processus de prise de décision et de planification de sa transition, elle a acquis la posture nécessaire pour changer d'horizon.",
    order: 3,
  },
  {
    _id: "testimonial-4",
    _type: "testimonial",
    theme: "Gestion du stress",
    text: "Lucile, membre de Codir, faisait face à des niveaux élevés de stress lors de présentations importantes. En travaillant sur la gestion de ses émotions et sa résilience, elle a amélioré son bien-être général. Son impact en réunion n'en a été que meilleur.",
    order: 4,
  },

  // ── CONTACT ──
  {
    _id: "contactSection",
    _type: "contactSection",
    label: "Contact",
    title: "Échangeons",
    intro: "Session découverte gratuite de 45 minutes — sans engagement.",
    buttonText: "Envoyer →",
    placeholderPrenom: "Prénom",
    placeholderNom: "Nom",
    placeholderEmail: "Email",
    placeholderObjet: "Objet",
    placeholderMessage: "Votre message",
  },

  // ── FOOTER ──
  {
    _id: "footerContent",
    _type: "footerContent",
    phrase: "Décidez.\nEn confiance.\nÀ votre façon.",
    ctaText: "Prenons le temps d'un échange →",
  },

  // ── PRESTATIONS PAGE ──
  {
    _id: "prestationsPage",
    _type: "prestationsPage",
    title: "Des coachings pour toutes les situations",
    subtitle:
      "Flash coaching ou forfait de 8 sessions — c'est vous qui choisissez.\nSessions en visio ou en présentiel, adaptées à votre rythme.",
    ctaText: "Réserver un appel découverte →",
    ctaIntro:
      "Session découverte gratuite de 45 minutes — sans engagement.",
    metaDescription: "Executive coaching, leadership, transition de carriere, performance, coaching interculturel. Accompagnement de cadres dirigeants par une coach certifiee.",
  },

  // ── PRESTATIONS ──
  {
    _id: "prestation-1",
    _type: "prestation",
    title: "Les entretiens clés de votre vie professionnelle",
    description:
      "Recherche de poste ou de mandat d'administrateur, prise de poste, préparation de votre évaluation annuelle, négociation du package salarial.",
    detail:
      "J'identifie vos forces, travaille votre posture et prépare chaque entretien pour maximiser votre impact.",
    imageAlt: "Route sinueuse en montagne",
    order: 1,
  },
  {
    _id: "prestation-2",
    _type: "prestation",
    title: "Trouver votre style de leadership",
    description:
      "Communiquer de façon transparente et authentique, savoir donner du feedback, embarquer vos équipes.",
    detail:
      "Approche basée sur la Process Communication Model®, développée par le Dr Taibi Kahler en partenariat avec la NASA pour préparer les équipages d'astronautes à mieux travailler ensemble.",
    imageAlt: "Se démarquer avec authenticité",
    order: 2,
  },
  {
    _id: "prestation-3",
    _type: "prestation",
    title: "Être plus performant·e",
    description:
      "Prioriser ce qui doit l'être, déléguer, réduire le stress pour un meilleur équilibre de vie. Comprendre la politique de votre entreprise et gagner en influence.",
    detail:
      "Une offre dédiée aux femmes, basée sur 25 années d'expérience à des postes clés dans l'industrie métallurgique, chimique et automobile.",
    imageAlt: "Avancer avec détermination",
    order: 3,
  },
  {
    _id: "prestation-4",
    _type: "prestation",
    title: "Comprendre les différences interculturelles",
    description:
      "Évoluer dans un environnement international, adapter sa communication selon la zone géographique de son interlocuteur.",
    detail:
      "Expatriation au Canada et en Chine — je connais les réseaux et les codes culturels.",
    imageAlt: "Chemin enneigé au Canada",
    order: 4,
  },
  {
    _id: "prestation-5",
    _type: "prestation",
    title: "Changer de cap",
    description:
      "Naviguer dans l'arsenal juridique et réglementaire de la transition et de l'entrepreneuriat. Négociation de départ, France Travail, retraite Agirc Arrco, Urssaf, choix du statut juridique.",
    detail:
      "Je vous accompagne à chaque étape : de la prise de décision à la planification de votre transition, jusqu'à l'acquisition de la posture nécessaire pour réussir.",
    imageAlt: "Arbre dans l'océan — résilience",
    order: 5,
  },

  // ── ABOUT TOP ──
  {
    _id: "aboutTop",
    _type: "aboutTop",
    label: "À propos",
    name: "Nathalie Debeir",
    role: "Coach professionnelle certifiée",
    intro1:
      "Je vous apporte de nouvelles perspectives, vous aide à renforcer votre leadership et votre influence, à définir votre identité professionnelle ou à explorer de nouvelles options — gestion de carrière et équilibre de vie, avec une offre dédiée aux femmes, y compris lors de leur prise de poste.",
    intro2:
      "J'interviens notamment sur des enjeux de transition ou de repositionnement professionnel, en vous aidant à naviguer dans l'arsenal juridique et réglementaire de la transition et de l'entrepreneuriat.",
    metaDescription: "Coach professionnelle certifiee. 25 ans de carriere executive, Secretaire Generale et Directrice Juridique de groupes internationaux.",
  },

  // ── ABOUT BIO ──
  {
    _id: "aboutBio",
    _type: "aboutBio",
    heading: "Explorez le champ des possibles",
    paragraph1:
      "Après 25 ans d'une carrière industrielle riche en expériences humaines en tant que Secrétaire Générale et Directrice Juridique de groupes internationaux — ETI et CAC40 —, je me consacre désormais à l'accompagnement des dirigeant·es. Formée au coaching professionnel et à la Process Communication Model®.",
    paragraph2:
      "Bilingue anglais, j'ai un double bagage culturel et professionnel franco-canadien. Diplômée de deux Masters en droit — Sorbonne et McGill — et certifiée administratrice de sociétés par l'IFA et Sciences Po.",
    paragraph3:
      "Je capitalise sur mon expérience des comités de direction, de la gouvernance, du développement d'équipes multiculturelles de plus de 100 personnes, des opérations stratégiques internationales et de l'expatriation au Canada et en Chine.",
    paragraph4:
      "J'interviens auprès du Pôle Carrières de Sciences Po Alumni en qualité de DRH-coach. Ancien membre de conseils d'administration — Cercle Montesquieu, Cercle des Dirigeants d'Entreprises Franco-Québécois —, je suis aujourd'hui impliquée dans des associations d'aide à la réinsertion des migrants et de défense des droits des femmes.",
    coachingSectionTitle: "Des coachings pour toutes les situations",
    coachingCtaText: "Découvrir mes accompagnements →",
    pressLabel: "Presse",
    pressTitle: "Presse",
  },

  // ── PULLQUOTE ──
  {
    _id: "aboutPullquote",
    _type: "aboutPullquote",
    text: "Mon accompagnement est bienveillant et empathique, tout en vous faisant sortir de votre zone de confort. Il repose sur la confiance et l'action, en mettant l'accent sur vos forces et motivations pour atteindre des résultats concrets et mesurables.",
  },

  // ── ABOUT COACHING ITEMS ──
  {
    _id: "aboutCoaching-1",
    _type: "aboutCoachingItem",
    name: "Executive coaching",
    tagline: "Tout commence par la prise de recul",
    order: 1,
  },
  {
    _id: "aboutCoaching-2",
    _type: "aboutCoachingItem",
    name: "Changer de cap",
    tagline: "Tout commence par une idée",
    order: 2,
  },
  {
    _id: "aboutCoaching-3",
    _type: "aboutCoachingItem",
    name: "Coaching carrière internationale",
    tagline: "Tout commence par une rencontre",
    order: 3,
  },
  {
    _id: "aboutCoaching-4",
    _type: "aboutCoachingItem",
    name: "Leadership",
    tagline: "Tout commence par Process Comm Model",
    order: 4,
  },

  // ── PRESS ARTICLES ──
  {
    _id: "press-1",
    _type: "pressArticle",
    magazineName: "Décideurs Magazine",
    articleTitle: "« L'IPO est une vraie réussite franco-chinoise »",
    url: "https://www.decideurs-magazine.com/finance/30203-nathalie-debeir-l-ipo-est-une-vraie-reussite-franco-chinoise.html",
    order: 1,
  },
  {
    _id: "press-2",
    _type: "pressArticle",
    magazineName: "Le Monde du Droit",
    articleTitle: "Nathalie Debeir, Directrice juridique, Adisseo",
    url: "https://www.lemondedudroit.fr/interviews/14178-nathalie-debeir-directrice-juridique-adisseo.html",
    order: 2,
  },
  {
    _id: "press-3",
    _type: "pressArticle",
    magazineName: "Actuel Direction Juridique",
    articleTitle: "Ces ex-DJ qui ont réinventé leurs carrières",
    url: "https://www.actuel-direction-juridique.fr/content/professions-ces-ex-dj-qui-ont-reinvente-leurs-carrieres",
    order: 3,
  },
  {
    _id: "press-4",
    _type: "pressArticle",
    magazineName: "La Lettre des Juristes d'Affaires",
    articleTitle: "Nathalie Debeir, directeur juridique adjoint de Renault",
    url: "https://www.lja.fr/mouvements-nominations/nathalie-debeir-devient-directeur-juridique-adjoint-de-renault-526839.php",
    order: 4,
  },
  {
    _id: "press-5",
    _type: "pressArticle",
    magazineName: "Cercle Montesquieu",
    articleTitle: "Le secrétariat général de Nathalie Debeir",
    url: "https://www.cercle-montesquieu.fr/global/gene/link.php?doc_id=211",
    order: 5,
  },
  {
    _id: "press-6",
    _type: "pressArticle",
    magazineName: "Cercle Montesquieu",
    articleTitle: "Interview croisée — Direction juridique",
    url: "https://www.cercle-montesquieu.fr/global/gene/link.php?doc_id=145",
    order: 6,
  },

  // ── MENTIONS LEGALES ──
  {
    _id: "mentionsLegales",
    _type: "mentionsLegales",
    editeur:
      "Elevate Plus SAS\nNathalie Debeir\nEmail : nathalie.elevateplus@gmail.com",
    hebergement:
      "Netlify, Inc.\n512 2nd Street, Suite 200\nSan Francisco, CA 94107, États-Unis",
    proprieteIntellectuelle:
      "L'ensemble du contenu de ce site (textes, images, logos, design) est la propriété exclusive d'Elevate Plus SAS, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.",
    rgpd: "Les informations recueillies via le formulaire de contact sont destinées uniquement à répondre à votre demande. Elles ne sont ni cédées ni vendues à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à nathalie.elevateplus@gmail.com.",
    cookies:
      "Ce site utilise Google Analytics à des fins statistiques. Un bandeau de consentement vous est présenté lors de votre première visite. Vous pouvez à tout moment modifier vos préférences.",
    credits: "Photographies : Nathalie Debeir",
    metaDescription: "Mentions légales du site Elevate Plus — Nathalie Debeir, coaching professionnel.",
  },
];

async function run() {
  const transaction = client.transaction();
  for (const doc of documents) {
    transaction.createOrReplace(doc);
  }
  const result = await transaction.commit();
  console.log(`Imported ${documents.length} documents.`, result.documentIds?.length || "");
}

run().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
