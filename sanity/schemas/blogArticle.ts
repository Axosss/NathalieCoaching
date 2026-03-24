import { defineType, defineField } from "sanity";

export const blogArticle = defineType({
  name: "blogArticle",
  title: "Article blog",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "excerpt", title: "Extrait (aperçu)", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image du post", type: "image", options: { hotspot: true } }),
    defineField({ name: "linkedinUrl", title: "Lien LinkedIn", type: "url" }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
