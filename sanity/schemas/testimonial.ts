import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({ name: "theme", title: "Thème", type: "string" }),
    defineField({ name: "text", title: "Texte", type: "text", rows: 5 }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
