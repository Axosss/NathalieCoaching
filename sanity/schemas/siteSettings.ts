import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuration générale",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Nom du site", type: "string" }),
    defineField({ name: "linkedin", title: "URL LinkedIn", type: "url" }),
    defineField({ name: "calendlyUrl", title: "URL Calendly", type: "url" }),
    defineField({ name: "companyName", title: "Raison sociale", type: "string" }),
    defineField({ name: "navPrestations", title: "Lien nav Prestations", type: "string" }),
    defineField({ name: "navAbout", title: "Lien nav À propos", type: "string" }),
    defineField({ name: "navCta", title: "Lien nav CTA", type: "string" }),
    defineField({ name: "cookieText", title: "Texte bandeau cookies", type: "string" }),
    defineField({ name: "cookieAccept", title: "Bouton accepter cookies", type: "string" }),
    defineField({ name: "cookieRefuse", title: "Bouton refuser cookies", type: "string" }),
    defineField({ name: "metaDescriptionHome", title: "Meta description accueil", type: "text", rows: 2 }),
    defineField({ name: "contactEmail", title: "Email de contact", type: "string" }),
    defineField({ name: "galleryCtaText", title: "CTA galerie", type: "string" }),
  ],
});
