const { writeFileSync, mkdirSync, cpSync } = require("fs");
const { join } = require("path");

const PROJECT_ID = "pyvdxbda";
const DATASET = "production";
const API_VERSION = "2024-01-01";
const SRC = join(__dirname, "..");
const DIST = join(__dirname, "..", "dist");

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
    processSection,
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
    blogArticles,
    leadMagnet,
    blogSection,
  ] = await Promise.all([
    query('*[_type=="siteSettings"][0]'),       // settings
    query('*[_type=="homeHero"][0]'),            // hero
    query('*[_type=="mirrorSection"][0]'),       // mirror
    query('*[_type=="processSection"][0]'),      // processSection
    query('*[_type=="coachingsSection"][0]'),    // coachingsSection
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
    query('*[_type=="blogArticle"] | order(order asc)'),
    query('*[_type=="leadMagnet"][0]'),
    query('*[_type=="blogSection"][0]'),
  ]);

  return {
    settings,
    hero,
    mirror,
    processSection,
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
    blogArticles,
    leadMagnet,
    blogSection,
  };
}

// ── Helpers ──
const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nl2br = (s) => esc(s).split("\n").join("<br>");

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
      <a href="index.html" class="nav-logo"><img src="${sanityImg(settings?.logo, "images/logo-nav.png")}" alt="${esc(settings?.siteName || "Nathalie Debeir")}" class="nav-logo-img"></a>
      <button class="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="prestations.html">${esc(settings?.navPrestations || "Prestations")}</a></li>
        <li><a href="about.html">${esc(settings?.navAbout || "Qui suis-je")}</a></li>
        <li><a href="${esc(settings?.calendlyUrl || "#")}" target="_blank" rel="noopener noreferrer">${esc(settings?.navCta || "Prendre rendez-vous")}</a></li>
        ${settings?.linkedin ? `<li><a href="${esc(settings.linkedin)}" target="_blank" rel="noopener noreferrer" class="nav-linkedin" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></li>` : ''}
    </div>
  </nav>`;
}

function footerFull(settings, footer) {
  const lines = (footer?.phrase || "").split("\n");
  return `<footer class="footer">
    <div class="footer-inner">
      <p class="footer-phrase">${lines.map(esc).join("<br>")}</p>
      <div class="footer-signature">
        <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 45 Q30 10, 50 35 Q60 50, 75 25 Q85 10, 100 30 Q110 45, 125 20 Q135 5, 150 30 Q160 45, 170 25" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="footer-cta">
        <a href="${esc(settings?.calendlyUrl || "#")}" target="_blank" rel="noopener noreferrer" class="pill-button">${esc(footer?.ctaText || "Prenons le temps d'un échange →")}</a>
      </div>
      <div class="footer-bottom">
        <a href="mailto:${esc(settings?.contactEmail || "ndebeir@yahoo.fr")}">${esc(settings?.contactEmail || "ndebeir@yahoo.fr")}</a>
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
        <a href="mailto:${esc(settings?.contactEmail || "ndebeir@yahoo.fr")}">${esc(settings?.contactEmail || "ndebeir@yahoo.fr")}</a>
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
  const { settings, hero, mirror, processSection, coachingsSection, coachings, whois, testimonialsSection, testimonials, contact, footer, partnerLogos, galleryPhotos, blogArticles, leadMagnet, blogSection } = data;

  const mirrorCards = (mirror?.cards || [])
    .map((c) => `<div class="mirror-card"><p class="mirror-card-text">${nl2br(c.text)}</p></div>`)
    .join("\n        ");

  const coachingCards = (coachings || [])
    .map((c) => `<div class="coaching-card">
          <h3 class="coaching-card-title">${esc(c.title)}</h3>
          <p class="coaching-card-text">${nl2br(c.description)}</p>
        </div>`)
    .join("\n\n        ");

  const TESTIMONIAL_THRESHOLD = 400;
  const testimonialCards = (testimonials || [])
    .map((t) => {
      const text = t.text || "";
      const isLong = text.length > TESTIMONIAL_THRESHOLD;
      let preview = "";
      if (isLong) {
        const cut = text.lastIndexOf(".", TESTIMONIAL_THRESHOLD);
        preview = cut > 0 ? text.slice(0, cut + 1) : text.slice(0, TESTIMONIAL_THRESHOLD);
      }
      return `<div class="testimonial-card${isLong ? " testimonial-expandable" : ""}">
          <p class="testimonial-theme">${esc(t.theme)}</p>
          ${isLong
            ? `<p class="testimonial-text testimonial-preview">${nl2br(preview)}</p>
          <p class="testimonial-text testimonial-full">${nl2br(text)}</p>
          <button class="testimonial-toggle" onclick="this.parentElement.classList.toggle('expanded')"></button>`
            : `<p class="testimonial-text">${nl2br(text)}</p>`}
        </div>`;
    })
    .join("\n\n        ");

  const body = `
  ${nav(settings, "index")}

  <!-- HERO -->
  <section class="hero">
    <img src="${sanityImg(hero?.backgroundImage, "images/dune-sable.webp")}" alt="${esc(hero?.heroImageAlt || "Nathalie Debeir sur une dune de sable")}" class="hero-photo">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">${esc(hero?.title)}</h1>
      <p class="hero-subtitle">${nl2br(hero?.subtitle)}</p>
      <a href="${esc(settings?.calendlyUrl || "#")}" target="_blank" rel="noopener noreferrer" class="pill-button">${esc(hero?.ctaText)}</a>
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
        <p class="whois-bio">${nl2br(whois?.bio1)}</p>
        <p class="whois-bio">${nl2br(whois?.bio2)}</p>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="process">
    <div class="process-inner">
      <p class="section-label">${esc(processSection?.label || "Mon processus")}</p>
      <h2 class="section-title">${esc(processSection?.title || "Un accompagnement structuré, à votre rythme")}</h2>
      <div class="process-steps">
        <div class="process-step">
          <div class="process-step-number">1</div>
          <h3 class="process-step-title">${esc(processSection?.step1Title || "Premier échange")}</h3>
          <p class="process-step-text">${nl2br(processSection?.step1Text)}</p>
        </div>
        <div class="process-step">
          <div class="process-step-number">2</div>
          <h3 class="process-step-title">${esc(processSection?.step2Title || "Cadre & engagement")}</h3>
          <p class="process-step-text">${nl2br(processSection?.step2Text)}</p>
        </div>
        <div class="process-step">
          <div class="process-step-number">3</div>
          <h3 class="process-step-title">${esc(processSection?.step3Title || "Passage à l'action")}</h3>
          <p class="process-step-text">${nl2br(processSection?.step3Text)}</p>
        </div>
      </div>
      <p class="process-confidentiality">${nl2br(processSection?.confidentiality)}</p>
      <div class="process-cta">
        <a href="${esc(settings?.calendlyUrl || "#")}" target="_blank" rel="noopener noreferrer" class="pill-button">${esc(processSection?.ctaText || "Prendre rendez-vous")}</a>
      </div>
    </div>
  </section>

  <!-- COACHINGS -->
  <section class="coachings">
    <div class="coachings-inner">
      <h2 class="section-title">${esc(coachingsSection?.title)}</h2>
      <div class="coaching-grid">
        ${coachingCards}
      </div>
      <p class="coachings-format">${nl2br(coachingsSection?.formatText)}</p>
      <div class="section-cta">
        <a href="prestations.html" class="pill-button">${esc(coachingsSection?.ctaText)}</a>
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
        <a href="${esc(settings?.calendlyUrl || "#")}" target="_blank" rel="noopener noreferrer" class="pill-button">${esc(testimonialsSection?.ctaText)}</a>
      </div>
    </div>
  </section>



  <!-- LEAD MAGNET -->
  <section class="leadmagnet">
    <div class="leadmagnet-inner">
      <div class="leadmagnet-content">
        <p class="leadmagnet-label">${esc(leadMagnet?.label || "Ressource gratuite")}</p>
        <h2 class="leadmagnet-title">${esc(leadMagnet?.title || "Les 90 premiers jours : votre checklist prise de poste")}</h2>
        <ul class="leadmagnet-bullets">
          ${(leadMagnet?.bullets || [
            "Les 5 conversations clés à avoir dans les 2 premières semaines",
            "Le cadre pour poser votre leadership sans brusquer",
            "Les erreurs que 80% des dirigeants font — et comment les éviter",
            "Un template de plan d'action 30-60-90 jours prêt à l'emploi",
          ]).map(b => `<li>${esc(b)}</li>`).join("\n          ")}
        </ul>
        <p class="leadmagnet-social-proof">${esc(leadMagnet?.socialProof || "Utilisée par plus de 200 cadres dirigeants accompagnés en coaching.")}</p>
      </div>
      <div class="leadmagnet-card">
        <h3 class="leadmagnet-card-title">${esc(leadMagnet?.formTitle || "Recevez la checklist")}</h3>
        <p class="leadmagnet-card-sub">${esc(leadMagnet?.formSubtitle || "Directement dans votre boîte mail")}</p>
        <form class="leadmagnet-form">
          <input type="text" name="firstname" placeholder="${esc(leadMagnet?.placeholderName || "Votre prénom")}" autocomplete="given-name">
          <input type="email" name="email" placeholder="${esc(leadMagnet?.placeholderEmail || "Votre adresse email")}" required autocomplete="email">
          <button type="submit" class="leadmagnet-submit">${esc(leadMagnet?.buttonText || "Recevoir ma checklist →")}</button>
        </form>
        <p class="leadmagnet-disclaimer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          ${esc(leadMagnet?.disclaimer || "Pas de spam. Désinscription en un clic.")}
        </p>
      </div>
    </div>
  </section>

  <!-- BLOG -->
  ${(blogArticles && blogArticles.length > 0) ? `<section class="blog">
    <div class="blog-inner">
      <p class="section-label">${esc(blogSection?.label || "Blog")}</p>
      <h2 class="section-title">${esc(blogSection?.title || "Articles & réflexions")}</h2>
      <div class="blog-grid">
        ${blogArticles.map(a => {
          const url = a.linkedinUrl || "#";
          return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="blog-card">
            <div class="blog-card-header">
              <img src="${sanityImg(settings?.logo || whois?.photo, "images/portrait-nathalie.webp")}" alt="" class="blog-card-avatar">
              <div>
                <p class="blog-card-author">${esc(settings?.siteName || "Nathalie Debeir")}</p>
                <p class="blog-card-date">${a.date ? new Date(a.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""}</p>
              </div>
            </div>
            <p class="blog-card-excerpt">${esc(a.excerpt)} <span class="blog-card-more">… lire plus sur LinkedIn</span></p>
            ${a.image ? `<img src="${sanityImg(a.image)}" alt="${esc(a.title)}" class="blog-card-image">` : ""}
          </a>`;
        }).join("\n        ")}
      </div>
    </div>
  </section>` : ""}

  <!-- CONTACT -->
  <section class="contact" id="contact">
    <div class="contact-inner">
      <p class="section-label">${esc(contact?.label)}</p>
      <h2 class="section-title">${esc(contact?.title)}</h2>
      <p class="contact-intro">${nl2br(contact?.intro)}</p>
      <form class="contact-form" name="contact" method="POST" data-netlify="true">
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
        <p class="presta-desc">${nl2br(p.description)}</p>
        ${p.detail ? `<p class="presta-detail">${nl2br(p.detail)}</p>` : ""}
        ${p.extra ? `<div class="presta-extra-wrap">
          <p class="presta-extra">${nl2br(p.extra)}</p>
        </div>
        <button class="presta-extra-toggle" onclick="this.previousElementSibling.classList.toggle('expanded');this.classList.toggle('expanded')"></button>` : ""}
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
    <a href="${esc(settings?.calendlyUrl || "#")}" target="_blank" rel="noopener noreferrer" class="pill-button">${esc(prestationsPage?.ctaText)}</a>
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
        <p class="about-top-bio">${nl2br(aboutTop?.intro1)}</p>
        <p class="about-top-bio">${nl2br(aboutTop?.intro2)}</p>
      </div>
    </div>
  </section>

  <!-- BIO -->
  <div class="about-content">
    <h2 class="about-hero-title">${esc(aboutBio?.heading)}</h2>
    <div class="about-text">
      <p>${nl2br(aboutBio?.bio || [aboutBio?.paragraph1, aboutBio?.paragraph2, aboutBio?.paragraph3, aboutBio?.paragraph4].filter(Boolean).join("\n\n"))}</p>
    </div>
  </div>

  <!-- PULLQUOTE -->
  <div class="about-pullquote">
    ${nl2br(pullquote?.text)}
  </div>

  <!-- PHOTO 2 -->
  <div class="about-photo-block" style="max-width: 600px;">
    <img src="${sanityImg(aboutBio?.photo)}" alt="${esc(aboutBio?.photoAlt || "")}" class="about-photo">
  </div>

  <!-- COACHINGS RESUME -->
  <div class="about-content" style="text-align: center;">
    <h2 class="section-title">${esc(aboutBio?.coachingSectionTitle || "Des coachings pour toutes les situations")}</h2>
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
      <h2 class="section-title">${esc(aboutBio?.pressTitle || "Presse")}</h2>
      <div class="press-grid">
        ${pressCards}
      </div>
    </div>
  </section>

  ${footerFull(settings, footer)}
  ${cookieBanner(settings)}`;

  return htmlWrap(
    `Qui suis-je — ${settings?.siteName || "Nathalie Debeir"}`,
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
      <p>${nl2br(mentions?.editeur)}</p>

      <h2>Hébergement</h2>
      <p>${nl2br(mentions?.hebergement)}</p>

      <h2>Propriété intellectuelle</h2>
      <p>${nl2br(mentions?.proprieteIntellectuelle)}</p>

      <h2>Protection des données personnelles</h2>
      <p>${nl2br(mentions?.rgpd)}</p>

      <h2>Cookies</h2>
      <p>${nl2br(mentions?.cookies)}</p>

      <h2>Crédits</h2>
      <p>${nl2br(mentions?.credits)}</p>
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

  console.log("Build complete! Output in dist/");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
