import { defineType, defineField } from "sanity";

export const aboutTop = defineType({
  name: "aboutTop",
  title: "1. Portrait + Intro",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "name", title: "Nom", type: "string" }),
    defineField({ name: "role", title: "Rôle", type: "string" }),
    defineField({ name: "intro1", title: "Intro paragraphe 1", type: "text", rows: 4 }),
    defineField({ name: "intro2", title: "Intro paragraphe 2", type: "text", rows: 4 }),
    defineField({ name: "photo", title: "Photo portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
  ],
});
