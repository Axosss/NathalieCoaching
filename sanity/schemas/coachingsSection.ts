import { defineType, defineField } from "sanity";

export const coachingsSection = defineType({
  name: "coachingsSection",
  title: "3. Mes accompagnements",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "formatText", title: "Texte format (sous les cards)", type: "string" }),
    defineField({ name: "ctaText", title: "Texte du bouton", type: "string" }),
  ],
});
