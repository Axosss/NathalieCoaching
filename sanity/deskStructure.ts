import { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Contenu")
    .items([
      // ── CONFIGURATION ──
      S.listItem()
        .title("⚙️ Configuration")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),

      S.divider(),

      // ── PAGE ACCUEIL ──
      S.listItem()
        .title("Page Accueil")
        .child(
          S.list()
            .title("Page Accueil")
            .items([
              S.listItem()
                .title("1. Hero")
                .schemaType("homeHero")
                .child(
                  S.document()
                    .schemaType("homeHero")
                    .documentId("homeHero")
                ),
              S.listItem()
                .title("2. Vous êtes peut-être à un tournant")
                .schemaType("mirrorSection")
                .child(
                  S.document()
                    .schemaType("mirrorSection")
                    .documentId("mirrorSection")
                ),
              S.listItem()
                .title("3. Mon processus")
                .schemaType("processSection")
                .child(
                  S.document()
                    .schemaType("processSection")
                    .documentId("processSection")
                ),
              S.listItem()
                .title("4. Mes accompagnements (textes section)")
                .schemaType("coachingsSection")
                .child(
                  S.document()
                    .schemaType("coachingsSection")
                    .documentId("coachingsSection")
                ),
              S.listItem()
                .title("3. Mes accompagnements (cards)")
                .schemaType("coaching")
                .child(
                  S.documentTypeList("coaching")
                    .title("Coachings")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("4. Qui suis-je")
                .schemaType("whois")
                .child(
                  S.document()
                    .schemaType("whois")
                    .documentId("whois")
                ),
              S.listItem()
                .title("5. Témoignages (textes section)")
                .schemaType("testimonialsSection")
                .child(
                  S.document()
                    .schemaType("testimonialsSection")
                    .documentId("testimonialsSection")
                ),
              S.listItem()
                .title("5. Témoignages (cards)")
                .schemaType("testimonial")
                .child(
                  S.documentTypeList("testimonial")
                    .title("Témoignages")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("6. Logos partenaires")
                .schemaType("partnerLogo")
                .child(
                  S.documentTypeList("partnerLogo")
                    .title("Logos")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("7. Galerie photos")
                .schemaType("galleryPhoto")
                .child(
                  S.documentTypeList("galleryPhoto")
                    .title("Galerie")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("8. Blog / Articles")
                .schemaType("blogArticle")
                .child(
                  S.documentTypeList("blogArticle")
                    .title("Articles")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("9. Contact")
                .schemaType("contactSection")
                .child(
                  S.document()
                    .schemaType("contactSection")
                    .documentId("contactSection")
                ),
              S.listItem()
                .title("10. Footer")
                .schemaType("footerContent")
                .child(
                  S.document()
                    .schemaType("footerContent")
                    .documentId("footerContent")
                ),
            ])
        ),

      S.divider(),

      // ── PAGE PRESTATIONS ──
      S.listItem()
        .title("Page Prestations")
        .child(
          S.list()
            .title("Page Prestations")
            .items([
              S.listItem()
                .title("1. En-tête")
                .schemaType("prestationsPage")
                .child(
                  S.document()
                    .schemaType("prestationsPage")
                    .documentId("prestationsPage")
                ),
              S.listItem()
                .title("2. Prestations (fiches)")
                .schemaType("prestation")
                .child(
                  S.documentTypeList("prestation")
                    .title("Prestations")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
            ])
        ),

      S.divider(),

      // ── PAGE À PROPOS ──
      S.listItem()
        .title("Page À propos")
        .child(
          S.list()
            .title("Page À propos")
            .items([
              S.listItem()
                .title("1. Portrait + Intro")
                .schemaType("aboutTop")
                .child(
                  S.document()
                    .schemaType("aboutTop")
                    .documentId("aboutTop")
                ),
              S.listItem()
                .title("2. Bio complète")
                .schemaType("aboutBio")
                .child(
                  S.document()
                    .schemaType("aboutBio")
                    .documentId("aboutBio")
                ),
              S.listItem()
                .title("3. Citation")
                .schemaType("aboutPullquote")
                .child(
                  S.document()
                    .schemaType("aboutPullquote")
                    .documentId("aboutPullquote")
                ),
              S.listItem()
                .title("4. Coachings résumé")
                .schemaType("aboutCoachingItem")
                .child(
                  S.documentTypeList("aboutCoachingItem")
                    .title("Coachings")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("5. Presse")
                .schemaType("pressArticle")
                .child(
                  S.documentTypeList("pressArticle")
                    .title("Articles presse")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
            ])
        ),

      S.divider(),

      // ── MENTIONS LÉGALES ──
      S.listItem()
        .title("Mentions légales")
        .schemaType("mentionsLegales")
        .child(
          S.document()
            .schemaType("mentionsLegales")
            .documentId("mentionsLegales")
        ),
    ]);
