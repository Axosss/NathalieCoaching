import { defineType, defineField } from "sanity";

export const aboutPullquote = defineType({
  name: "aboutPullquote",
  title: "3. Citation",
  type: "document",
  fields: [
    defineField({ name: "text", title: "Texte de la citation", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "text" },
  },
});
