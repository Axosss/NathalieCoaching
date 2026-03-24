import { defineType, defineField } from "sanity";

export const whois = defineType({
  name: "whois",
  title: "4. Qui suis-je",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "name", title: "Nom", type: "string" }),
    defineField({ name: "role", title: "Rôle", type: "string" }),
    defineField({ name: "bio1", title: "Bio paragraphe 1", type: "text", rows: 4 }),
    defineField({ name: "bio2", title: "Bio paragraphe 2", type: "text", rows: 4 }),
    defineField({ name: "photo", title: "Photo portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "ctaText", title: "Texte du bouton", type: "string" }),
  ],
});
