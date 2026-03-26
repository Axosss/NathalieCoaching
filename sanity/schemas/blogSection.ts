import { defineType, defineField } from "sanity";

export const blogSection = defineType({
  name: "blogSection",
  title: "Section Blog",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label (ex: Blog)", type: "string" }),
    defineField({ name: "title", title: "Titre (ex: Articles & réflexions)", type: "string" }),
  ],
});
