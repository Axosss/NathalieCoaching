import { defineType, defineField } from "sanity";

export const mirrorSection = defineType({
  name: "mirrorSection",
  title: "2. Vous êtes peut-être à un tournant",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Titre de section", type: "string" }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "text", title: "Texte", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({ name: "ctaText", title: "Texte du bouton", type: "string" }),
  ],
});
