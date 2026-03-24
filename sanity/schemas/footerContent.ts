import { defineType, defineField } from "sanity";

export const footerContent = defineType({
  name: "footerContent",
  title: "8. Footer",
  type: "document",
  fields: [
    defineField({ name: "phrase", title: "Phrase (3 lignes)", type: "text", rows: 3 }),
    defineField({ name: "ctaText", title: "Texte du bouton", type: "string" }),
  ],
});
