import { defineType, defineField } from "sanity";

export const prestationsPage = defineType({
  name: "prestationsPage",
  title: "Page Prestations (en-tête)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "subtitle", title: "Sous-titre", type: "text", rows: 2 }),
    defineField({ name: "ctaText", title: "Texte du bouton CTA", type: "string" }),
    defineField({ name: "ctaIntro", title: "Texte au-dessus du CTA", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
  ],
});
