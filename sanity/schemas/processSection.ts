import { defineType, defineField } from "sanity";

export const processSection = defineType({
  name: "processSection",
  title: "Section processus",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label (petit texte au-dessus)", type: "string" }),
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "step1Title", title: "Étape 1 — Titre", type: "string" }),
    defineField({ name: "step1Text", title: "Étape 1 — Texte", type: "text", rows: 3 }),
    defineField({ name: "step2Title", title: "Étape 2 — Titre", type: "string" }),
    defineField({ name: "step2Text", title: "Étape 2 — Texte", type: "text", rows: 3 }),
    defineField({ name: "step3Title", title: "Étape 3 — Titre", type: "string" }),
    defineField({ name: "step3Text", title: "Étape 3 — Texte", type: "text", rows: 3 }),
    defineField({ name: "confidentiality", title: "Texte confidentialité / déontologie", type: "text", rows: 3 }),
    defineField({ name: "ctaText", title: "Texte du bouton CTA", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Mon processus" };
    },
  },
});
