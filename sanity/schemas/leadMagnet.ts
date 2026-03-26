import { defineType, defineField } from "sanity";

export const leadMagnet = defineType({
  name: "leadMagnet",
  title: "Lead Magnet",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label (ex: Ressource gratuite)", type: "string" }),
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({ name: "bullets", title: "Points clés", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "socialProof", title: "Social proof", type: "string" }),
    defineField({ name: "formTitle", title: "Titre du formulaire", type: "string" }),
    defineField({ name: "formSubtitle", title: "Sous-titre du formulaire", type: "string" }),
    defineField({ name: "placeholderName", title: "Placeholder prénom", type: "string" }),
    defineField({ name: "placeholderEmail", title: "Placeholder email", type: "string" }),
    defineField({ name: "buttonText", title: "Texte du bouton", type: "string" }),
    defineField({ name: "disclaimer", title: "Disclaimer", type: "string" }),
  ],
});
