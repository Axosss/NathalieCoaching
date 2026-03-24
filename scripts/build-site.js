const { writeFileSync, mkdirSync, cpSync } = require("fs");
const { join } = require("path");

const PROJECT_ID = "pyvdxbda";
const DATASET = "production";
const API_VERSION = "2024-01-01";
const SRC = join(__dirname, "..", "version-a");
const DIST = join(__dirname, "..", "version-a", "dist");

async function query(groq) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.result;
}

// ── Fetch all data ──
async function fetchAll() {
  const [
    settings,
    hero,
    mirror,
    coachingsSection,
    coachings,
    whois,
    testimonialsSection,
    testimonials,
    contact,
    footer,
    prestationsPage,
    prestations,
    aboutTop,
    aboutBio,
    pullquote,
    aboutCoachings,
    press,
    mentions,
    partnerLogos,
    galleryPhotos,
  ] = await Promise.all([
    query('*[_type=="siteSettings"][0]'),
    query('*[_type=="homeHero"][0]'),
    query('*[_type=="mirrorSection"][0]'),
    query('*[_type=="coachingsSection"][0]'),
    query('*[_type=="coaching"] | order(order asc)'),
    query('*[_type=="whois"][0]'),
    query('*[_type=="testimonialsSection"][0]'),
    query('*[_type=="testimonial"] | order(order asc)'),
    query('*[_type=="contactSection"][0]'),
    query('*[_type=="footerContent"][0]'),
    query('*[_type=="prestationsPage"][0]'),
    query('*[_type=="prestation"] | order(order asc)'),
    query('*[_type=="aboutTop"][0]'),
    query('*[_type=="aboutBio"][0]'),
    query('*[_type=="aboutPullquote"][0]'),
    query('*[_type=="aboutCoachingItem"] | order(order asc)'),
    query('*[_type=="pressArticle"] | order(order asc)'),
    query('*[_type=="mentionsLegales"][0]'),
    query('*[_type=="partnerLogo"] | order(order asc)'),
    query('*[_type=="galleryPhoto"] | order(order asc)'),
  ]);

  return {
    settings,
    hero,
    mirror,
    coachingsSection,
    coachings,
    whois,
    testimonialsSection,
    testimonials,
    contact,
    footer,
    prestationsPage,
    prestations,
    aboutTop,
    aboutBio,
    pullquote,
    aboutCoachings,
    press,
    mentions,
    partnerLogos,
    galleryPhotos,
  };
}

// ── Helpers ──
const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nl2br = (s) => (s || "").split("\n").join("<br>");

// Convert Sanity image ref to CDN URL
function sanityImg(imageField, fallback = "") {
  if (!imageField?.asset?._ref) return fallback;
  const ref = imageField.asset._ref;
  const match = ref.match(/^image-(.+)-(\d+x\d+)-(\w+)$/);
  if (!match) return fallback;
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${match[1]}-${match[2]}.${match[3]}`;
}

// ── Shared components ──
function nav(settings, activePage = "") {
  return `<nav class="nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">${esc(settings?.siteName || "Nathalie Debeir")}</a>
      <button class="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="prestations.html">${esc(settings?.navPrestations || "Prestations")}</a></li>
        <li><a href="about.html">${esc(settings?.navAbout || "À propos")}</a></li>
        <li><a href="${activePage === "index" ? "#calendly" : "index.html#calendly"}">${esc(settings?.navCta || "Prendre rendez-vous")}</a></li>
      </ul>
    </div>
  </nav>`;
}

function footerFull(settings, footer) {
  const lines = (footer?.phrase || "").split("\n");
  return `<footer class="footer" id="calendly">
    <div class="footer-inner">
      <p class="footer-phrase">${lines.map(esc).join("<br>")}</p>
      <div class="footer-signature">
        <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 45 Q30 10, 50 35 Q60 50, 75 25 Q85 10, 100 30 Q110 45, 125 20 Q135 5, 150 30 Q160 45, 170 25" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="footer-cta">
        <a href="#calendly" class="pill-button">${esc(footer?.ctaText || "Prenons le temps d'un échange →")}</a>
      </div>
      <div class="footer-bottom">
        <a href="mailto:${esc(settings?.email)}">${esc(settings?.email)}</a>
        <span class="footer-dot">·</span>
        <a href="${esc(settings?.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span class="footer-dot">·</span>
        <a href="mentions-legales.html">Mentions légales</a>
        <span class="footer-dot">·</span>
        <span>© ${new Date().getFullYear()} ${esc(settings?.companyName)}</span>
      </div>
    </div>
  </footer>`;
}

function footerMinimal(settings) {
  return `<footer class="footer">
    <div class="footer-inner">
      <div class="footer-bottom">
        <a href="mailto:${esc(settings?.email)}">${esc(settings?.email)}</a>
        <span class="footer-dot">·</span>
        <a href="${esc(settings?.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span class="footer-dot">·</span>
        <a href="mentions-legales.html">Mentions légales</a>
        <span class="footer-dot">·</span>
        <span>© ${new Date().getFullYear()} ${esc(settings?.companyName)}</span>
      </div>
    </div>
  </footer>`;
}

function cookieBanner(settings) {
  return `<div class="cookie-banner" id="cookieBanner">
    <div class="cookie-banner-inner">
      <p class="cookie-banner-text">${esc(settings?.cookieText || "Ce site utilise des cookies à des fins statistiques.")} Consultez notre <a href="mentions-legales.html">politique de cookies</a>.</p>
      <div class="cookie-buttons">
        <button class="cookie-btn cookie-btn-accept" id="cookieAccept">${esc(settings?.cookieAccept || "Accepter")}</button>
        <button class="cookie-btn cookie-btn-refuse" id="cookieRefuse">${esc(settings?.cookieRefuse || "Refuser")}</button>
      </div>
    </div>
  </div>`;
}

function htmlWrap(title, description, body) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="stylesheet" href="style.css">
</head>
<body>
${body}
  <script src="script.js"></script>
</body>
</html>`;
}

// ── Page builders ──

function buildIndex(data) {
  const { settings, hero, mirror, coachingsSection, coachings, whois, testimonialsSection, testimonials, contact, footer, partnerLogos, galleryPhotos } = data;

  const mirrorCards = (mirror?.cards || [])
    .map((c) => `<div class="mirror-card"><p class="mirror-card-text">${esc(c.text)}</p></div>`)
    .join("\n        ");

  const coachingCards = (coachings || [])
    .map((c) => `<div class="coaching-card">
          <h3 class="coaching-card-title">${esc(c.title)}</h3>
          <p class="coaching-card-text">${esc(c.description)}</p>
        </div>`)
    .join("\n\n        ");

  const testimonialCards = (testimonials || [])
    .map((t) => `<div class="testimonial-card">
          <p class="testimonial-theme">${esc(t.theme)}</p>
          <p class="testimonial-text">${esc(t.text)}</p>
        </div>`)
    .join("\n\n        ");

  const body = `
  ${nav(settings, "index")}

  <!-- HERO -->
  <section class="hero">
    <img src="${sanityImg(hero?.backgroundImage, "images/dune-sable.webp")}" alt="${esc(hero?.heroImageAlt || "Nathalie Debeir sur une dune de sable")}" class="hero-photo">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">${esc(hero?.title)}</h1>
      <p class="hero-subtitle">${esc(hero?.subtitle)}</p>
      <a href="#calendly" class="pill-button">${esc(hero?.ctaText)}</a>
    </div>
  </section>

  <!-- MIRROR -->
  <section class="mirror">
    <div class="mirror-inner">
      <h2 class="mirror-heading">${esc(mirror?.heading)}</h2>
      <div class="mirror-grid">
        ${mirrorCards}
      </div>
      <div class="section-cta">
        <a href="#contact" class="pill-button">${esc(mirror?.ctaText)}</a>
      </div>
    </div>
  </section>

  <!-- COACHINGS -->
  <section class="coachings">
    <div class="coachings-inner">
      <p class="section-label">${esc(coachingsSection?.label)}</p>
      <h2 class="section-title">${esc(coachingsSection?.title)}</h2>
      <div class="coaching-grid">
        ${coachingCards}
      </div>
      <p class="coachings-format">${esc(coachingsSection?.formatText)}</p>
      <div class="section-cta">
        <a href="prestations.html" class="pill-button">${esc(coachingsSection?.ctaText)}</a>
      </div>
    </div>
  </section>

  <!-- QUI SUIS-JE -->
  <section class="whois">
    <div class="whois-inner">
      <div class="whois-photo">
        <img src="${sanityImg(whois?.photo, "images/portrait-nathalie.webp")}" alt="${esc(whois?.name)}" loading="lazy">
      </div>
      <div class="whois-text">
        <p class="section-label">${esc(whois?.label)}</p>
        <h2 class="whois-title">${esc(whois?.name)}</h2>
        <p class="whois-role">${esc(whois?.role)}</p>
        <p class="whois-bio">${esc(whois?.bio1)}</p>
        <p class="whois-bio">${esc(whois?.bio2)}</p>
        <a href="about.html" class="pill-button">${esc(whois?.ctaText)}</a>
      </div>
    </div>
  </section>

  <!-- TEMOIGNAGES -->
  <section class="testimonials">
    <div class="testimonials-inner">
      <p class="section-label">${esc(testimonialsSection?.label)}</p>
      <h2 class="section-title">${esc(testimonialsSection?.title)}</h2>
      <div class="testimonial-grid">
        ${testimonialCards}
      </div>
      <div class="section-cta">
        <a href="#calendly" class="pill-button">${esc(testimonialsSection?.ctaText)}</a>
      </div>
    </div>
  </section>

  <!-- LOGOS PARTENAIRES -->
  <section class="logos-banner">
    <div class="logos-track">
      ${(() => {
        const logos = (partnerLogos || []).map(l => `<img src="${sanityImg(l.logo)}" alt="${esc(l.name)}">`).join("\n        ");
        const firstSlide = `<div class="logos-slide">\n        ${logos}\n      </div>`;
        const dupeSlide = `<div class="logos-slide" aria-hidden="true">\n        ${logos}\n      </div>`;
        return [firstSlide, dupeSlide, dupeSlide, dupeSlide].join("\n      ");
      })()}
    </div>
  </section>

  <!-- GALERIE -->
  <section class="gallery">
    <div class="gallery-inner">
      <div class="gallery-grid">
        ${(galleryPhotos || []).map(g =>
            `<div class="gallery-item"><img src="${sanityImg(g.image)}" alt="${esc(g.alt)}" loading="lazy"></div>`
          ).join("\n        ")}
      </div>
      <div class="section-cta">
        <a href="#contact" class="pill-button">${esc(settings?.galleryCtaText || "Réserver ma session découverte →")}</a>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="contact" id="contact">
    <div class="contact-inner">
      <p class="section-label">${esc(contact?.label)}</p>
      <h2 class="section-title">${esc(contact?.title)}</h2>
      <p class="contact-intro">${esc(contact?.intro)}</p>
      <form class="contact-form" action="https://formspree.io/f/${esc(settings?.formspreeId)}" method="POST">
        <div class="contact-row">
          <input type="text" name="prenom" placeholder="${esc(contact?.placeholderPrenom || "Prénom")}" required>
          <input type="text" name="nom" placeholder="${esc(contact?.placeholderNom || "Nom")}" required>
        </div>
        <input type="email" name="email" placeholder="${esc(contact?.placeholderEmail || "Email")}" required>
        <input type="text" name="objet" placeholder="${esc(contact?.placeholderObjet || "Objet")}">
        <textarea name="message" placeholder="${esc(contact?.placeholderMessage || "Votre message")}" rows="5" required></textarea>
        <button type="submit" class="pill-button">${esc(contact?.buttonText)}</button>
      </form>
    </div>
  </section>

  ${footerFull(settings, footer)}
  ${cookieBanner(settings)}`;

  return htmlWrap(
    `${settings?.siteName || "Nathalie Debeir"} — Coaching Professionnel`,
    settings?.metaDescriptionHome || "Coach professionnelle certifiee, ex-membre de comite de direction. Leadership, transition, performance. Accompagnement de cadres dirigeants.",
    body
  );
}

function buildPrestations(data) {
  const { settings, prestationsPage, prestations } = data;

  const prestaBlocks = (prestations || [])
    .map((p, i) => {
      const num = String(i + 1).padStart(2, "0");
      const reverse = i % 2 === 1 ? " presta-reverse" : "";
      return `<section class="presta-section${reverse}">
    <div class="presta-inner">
      <div class="presta-text">
        <p class="presta-label">${num}</p>
        <h2 class="presta-title">${esc(p.title)}</h2>
        <p class="presta-desc">${esc(p.description)}</p>
        ${p.detail ? `<p class="presta-detail">${esc(p.detail)}</p>` : ""}
      </div>
      <div class="presta-image">
        <img src="${sanityImg(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy">
      </div>
    </div>
  </section>`;
    })
    .join("\n\n  ");

  const subtitle = (prestationsPage?.subtitle || "").split("\n").join("<br>");

  const body = `
  ${nav(settings, "prestations")}

  <!-- HERO -->
  <section class="about-hero">
    <h1 class="about-hero-title">${esc(prestationsPage?.title)}</h1>
    <p class="presta-hero-sub">${subtitle}</p>
  </section>

  ${prestaBlocks}

  <!-- CTA -->
  <section class="presta-cta">
    <p class="presta-cta-text">${esc(prestationsPage?.ctaIntro)}</p>
    <a href="index.html#calendly" class="pill-button">${esc(prestationsPage?.ctaText)}</a>
  </section>

  ${footerMinimal(settings)}
  ${cookieBanner(settings)}`;

  return htmlWrap(
    `Prestations — ${settings?.siteName || "Nathalie Debeir"}`,
    prestationsPage?.metaDescription || "Executive coaching, leadership, transition de carriere, performance, coaching interculturel. Accompagnement de cadres dirigeants par une coach certifiee.",
    body
  );
}

function buildAbout(data) {
  const { settings, aboutTop, aboutBio, pullquote, aboutCoachings, press, footer } = data;

  const coachingItems = (aboutCoachings || [])
    .map(
      (c) => `<div class="about-coaching-item">
        <span class="about-coaching-name">${esc(c.name)}</span>
        <span class="about-coaching-tagline">${esc(c.tagline)}</span>
      </div>`
    )
    .join("\n      ");

  const pressCards = (press || [])
    .map(
      (p) => `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" class="press-card">
          <div class="press-cover">
            <p class="press-cover-mag">${esc(p.magazineName)}</p>
            <div class="press-cover-sep"></div>
            <p class="press-cover-title">${esc(p.articleTitle)}</p>
          </div>
        </a>`
    )
    .join("\n\n        ");

  const body = `
  ${nav(settings, "about")}

  <!-- PORTRAIT + INTRO -->
  <section class="about-top">
    <div class="about-top-inner">
      <div class="about-top-photo">
        <img src="${sanityImg(aboutTop?.photo, "images/portrait-nathalie.webp")}" alt="${esc(aboutTop?.name)}, coach professionnelle">
      </div>
      <div class="about-top-text">
        <p class="section-label">${esc(aboutTop?.label)}</p>
        <h1 class="about-top-name">${esc(aboutTop?.name)}</h1>
        <p class="about-top-role">${esc(aboutTop?.role)}</p>
        <p class="about-top-bio">${esc(aboutTop?.intro1)}</p>
        <p class="about-top-bio">${esc(aboutTop?.intro2)}</p>
      </div>
    </div>
  </section>

  <!-- BIO -->
  <div class="about-content">
    <h2 class="about-hero-title">${esc(aboutBio?.heading)}</h2>
    <div class="about-text">
      <p>${esc(aboutBio?.paragraph1)}</p>
      <p>${esc(aboutBio?.paragraph2)}</p>
      <p>${esc(aboutBio?.paragraph3)}</p>
      <p>${esc(aboutBio?.paragraph4)}</p>
    </div>
  </div>

  <!-- PULLQUOTE -->
  <div class="about-pullquote">
    ${esc(pullquote?.text)}
  </div>

  <!-- PHOTO 2 -->
  <div class="about-photo-block" style="max-width: 800px;">
    <img src="${sanityImg(aboutBio?.photo, "images/silhouettes-coucher.webp")}" alt="${esc(aboutBio?.photoAlt || "Échange au coucher de soleil")}" class="about-photo about-photo-landscape">
  </div>

  <!-- COACHINGS RESUME -->
  <div class="about-content">
    <div class="about-text">
      <p class="about-section-title">${esc(aboutBio?.coachingSectionTitle || "Des coachings pour toutes les situations")}</p>
    </div>
    <div class="about-coaching-list">
      ${coachingItems}
    </div>
    <div class="section-cta" style="padding: 40px 0;">
      <a href="prestations.html" class="pill-button">${esc(aboutBio?.coachingCtaText || "Découvrir mes accompagnements →")}</a>
    </div>
  </div>

  <!-- PRESSE -->
  <section class="press">
    <div class="press-inner">
      <p class="section-label">${esc(aboutBio?.pressLabel || "Presse")}</p>
      <h2 class="section-title">${esc(aboutBio?.pressTitle || "Presse")}</h2>
      <div class="press-grid">
        ${pressCards}
      </div>
    </div>
  </section>

  ${footerFull(settings, footer)}
  ${cookieBanner(settings)}`;

  return htmlWrap(
    `À propos — ${settings?.siteName || "Nathalie Debeir"}`,
    aboutTop?.metaDescription || "Coach professionnelle certifiee. 25 ans de carriere executive, Secretaire Generale et Directrice Juridique de groupes internationaux.",
    body
  );
}

function buildMentions(data) {
  const { settings, mentions } = data;

  const body = `
  ${nav(settings, "mentions")}

  <div class="legal-page">
    <div class="legal-inner">
      <h1 class="legal-title">Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>${nl2br(esc(mentions?.editeur))}</p>

      <h2>Hébergement</h2>
      <p>${nl2br(esc(mentions?.hebergement))}</p>

      <h2>Propriété intellectuelle</h2>
      <p>${esc(mentions?.proprieteIntellectuelle)}</p>

      <h2>Protection des données personnelles</h2>
      <p>${esc(mentions?.rgpd)}</p>

      <h2>Cookies</h2>
      <p>${esc(mentions?.cookies)}</p>

      <h2>Crédits</h2>
      <p>${esc(mentions?.credits)}</p>
    </div>
  </div>

  ${footerMinimal(settings)}
  ${cookieBanner(settings)}`;

  return htmlWrap(
    `Mentions légales — ${settings?.siteName || "Nathalie Debeir"}`,
    mentions?.metaDescription || "Mentions légales du site Elevate Plus — Nathalie Debeir, coaching professionnel.",
    body
  );
}

// ── Main ──
async function build() {
  console.log("Fetching content from Sanity...");
  const data = await fetchAll();

  // Check if we got data
  if (!data.settings && !data.hero) {
    console.error("No data found in Sanity. Run the import script first.");
    process.exit(1);
  }

  console.log("Building pages...");

  // Create dist directory
  mkdirSync(DIST, { recursive: true });

  // Generate HTML files
  writeFileSync(join(DIST, "index.html"), buildIndex(data));
  writeFileSync(join(DIST, "about.html"), buildAbout(data));
  writeFileSync(join(DIST, "prestations.html"), buildPrestations(data));
  writeFileSync(join(DIST, "mentions-legales.html"), buildMentions(data));

  // Copy static assets
  const assetsToCopy = ["style.css", "script.js", "images", "studio"];
  for (const asset of assetsToCopy) {
    try {
      cpSync(join(SRC, asset), join(DIST, asset), { recursive: true });
    } catch (e) {
      console.warn(`Warning: Could not copy ${asset}: ${e.message}`);
    }
  }

  // Copy favicon files if they exist
  for (const file of ["favicon.ico", "favicon.svg", "favicon.png"]) {
    try {
      cpSync(join(SRC, file), join(DIST, file));
    } catch {}
  }

  // Copy netlify.toml
  try {
    cpSync(join(SRC, "netlify.toml"), join(DIST, "netlify.toml"));
  } catch {}

  console.log("Build complete! Output in version-a/dist/");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
