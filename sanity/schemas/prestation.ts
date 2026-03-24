import { defineType, defineField } from "sanity";

export const prestation = defineType({
  name: "prestation",
  title: "Prestation",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "detail", title: "Détail (italique)", type: "text", rows: 2 }),
    defineField({ name: "extra", title: "Paragraphe supplémentaire", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Description image (alt)", type: "string" }),
    defineField({ name: "order", title: "Ordre (01, 02...)", type: "number" }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
