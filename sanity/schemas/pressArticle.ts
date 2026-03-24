import { defineType, defineField } from "sanity";

export const pressArticle = defineType({
  name: "pressArticle",
  title: "Article presse",
  type: "document",
  fields: [
    defineField({ name: "magazineName", title: "Nom du magazine", type: "string" }),
    defineField({ name: "articleTitle", title: "Titre de l'article", type: "string" }),
    defineField({ name: "url", title: "URL de l'article", type: "url" }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
