import { defineType, defineField } from "sanity";

export const homeHero = defineType({
  name: "homeHero",
  title: "1. Hero",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre principal", type: "string" }),
    defineField({ name: "subtitle", title: "Sous-titre", type: "text", rows: 2 }),
    defineField({ name: "ctaText", title: "Texte du bouton", type: "string" }),
    defineField({ name: "backgroundImage", title: "Image de fond", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Alt image hero", type: "string" }),
  ],
});
