import { defineType, defineField } from "sanity";

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "5. Témoignages (section)",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "ctaText", title: "Texte du bouton", type: "string" }),
  ],
});
