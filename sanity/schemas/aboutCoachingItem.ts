import { defineType, defineField } from "sanity";

export const aboutCoachingItem = defineType({
  name: "aboutCoachingItem",
  title: "Coaching résumé (À propos)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom du coaching", type: "string" }),
    defineField({ name: "tagline", title: "Tagline (Tout commence par...)", type: "string" }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
