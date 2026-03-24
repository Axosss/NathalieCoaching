import { defineType, defineField } from "sanity";

export const coaching = defineType({
  name: "coaching",
  title: "Coaching (card)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
