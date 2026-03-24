import { defineType, defineField } from "sanity";

export const aboutBio = defineType({
  name: "aboutBio",
  title: "2. Bio complète",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Titre (Explorez...)", type: "string" }),
    defineField({ name: "bio", title: "Biographie", type: "text", rows: 12 }),
    defineField({ name: "photo", title: "Photo paysage", type: "image", options: { hotspot: true } }),
    defineField({ name: "photoAlt", title: "Description photo (alt)", type: "string" }),
    defineField({ name: "coachingSectionTitle", title: "Titre section coachings", type: "string" }),
    defineField({ name: "coachingCtaText", title: "CTA coachings", type: "string" }),
    defineField({ name: "pressLabel", title: "Label presse", type: "string" }),
    defineField({ name: "pressTitle", title: "Titre presse", type: "string" }),
  ],
});
