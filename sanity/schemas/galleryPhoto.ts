import { defineType, defineField } from "sanity";

export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Photo galerie",
  type: "document",
  fields: [
    defineField({ name: "alt", title: "Description (alt)", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
