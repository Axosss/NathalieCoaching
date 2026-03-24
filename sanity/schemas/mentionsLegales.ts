import { defineType, defineField } from "sanity";

export const mentionsLegales = defineType({
  name: "mentionsLegales",
  title: "Mentions légales",
  type: "document",
  fields: [
    defineField({ name: "editeur", title: "Éditeur du site", type: "text", rows: 3 }),
    defineField({ name: "hebergement", title: "Hébergement", type: "text", rows: 3 }),
    defineField({ name: "proprieteIntellectuelle", title: "Propriété intellectuelle", type: "text", rows: 4 }),
    defineField({ name: "rgpd", title: "Protection des données", type: "text", rows: 4 }),
    defineField({ name: "cookies", title: "Cookies", type: "text", rows: 3 }),
    defineField({ name: "credits", title: "Crédits", type: "text", rows: 2 }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
  ],
  preview: {
    prepare() {
      return { title: "Mentions légales" };
    },
  },
});
