import { defineType, defineField } from "sanity";

export const partnerLogo = defineType({
  name: "partnerLogo",
  title: "Logo partenaire",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "order", title: "Ordre", type: "number" }),
  ],
  orderings: [{ title: "Ordre", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
