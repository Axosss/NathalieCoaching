import { defineType, defineField } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "7. Contact",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "intro", title: "Texte d'intro", type: "string" }),
    defineField({ name: "buttonText", title: "Texte du bouton", type: "string" }),
    defineField({ name: "placeholderPrenom", title: "Placeholder prénom", type: "string" }),
    defineField({ name: "placeholderNom", title: "Placeholder nom", type: "string" }),
    defineField({ name: "placeholderEmail", title: "Placeholder email", type: "string" }),
    defineField({ name: "placeholderObjet", title: "Placeholder objet", type: "string" }),
    defineField({ name: "placeholderMessage", title: "Placeholder message", type: "string" }),
  ],
});
