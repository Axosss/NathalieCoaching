# Configuration du projet

## 1. Sanity CMS

### Creer le projet Sanity
1. Va sur https://www.sanity.io et connecte-toi (ou cree un compte)
2. Cree un nouveau projet depuis le dashboard
3. Note le **Project ID** (ex: `abc123xyz`)
4. Le dataset par defaut est `production`

### Configurer les variables d'environnement
Copie `.env.local.example` en `.env.local` et remplis :
```
NEXT_PUBLIC_SANITY_PROJECT_ID=ton-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Configurer CORS
Dans le dashboard Sanity (manage.sanity.io) :
1. Va dans **API** > **CORS origins**
2. Ajoute `http://localhost:5555` (dev)
3. Ajoute l'URL de production quand le domaine sera pret

### Acceder au Studio
- Dev : `http://localhost:5555/studio`
- Prod : `https://[domaine]/studio`

---

## 2. Google Analytics

1. Va sur https://analytics.google.com
2. Cree une propriete GA4 pour le site
3. Recupere le **Measurement ID** (format `G-XXXXXXXXXX`)
4. Ajoute dans `.env.local` :
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 3. Google Search Console

1. Va sur https://search.google.com/search-console
2. Ajoute la propriete avec l'URL du site
3. Verifie la propriete (methode fichier HTML ou DNS)
4. Soumets le sitemap : `https://[domaine]/sitemap.xml`

---

## 4. Calendly

1. Cree un compte sur https://calendly.com
2. Cree un type d'evenement (ex: "Echange decouverte - 30 min")
3. Copie le lien de l'evenement
4. Ajoute-le dans Sanity Studio > Configuration > Liens externes > URL Calendly

---

## 5. WhatsApp

1. Dans Sanity Studio > Configuration > Liens externes
2. Renseigne le numero au format international (ex: `+33612345678`)
3. Dans `src/lib/constants.ts`, mets a jour `WHATSAPP_URL` avec le numero

---

## 6. Netlify (Deploiement)

### Premiere mise en ligne
1. Connecte le repo Git sur https://app.netlify.com
2. Build command : `npm run build`
3. Publish directory : `.next`
4. Installe le plugin `@netlify/plugin-nextjs`

### Variables d'environnement
Dans le dashboard Netlify > Site settings > Environment variables, ajoute :
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Domaine custom
1. Dans Domain settings, ajoute le domaine
2. Configure les DNS (A record ou CNAME selon le registrar)
3. Active le HTTPS (automatique avec Netlify)

### CORS Sanity pour la prod
N'oublie pas d'ajouter l'URL de prod dans Sanity > API > CORS origins

---

## 7. Contenu a remplir dans Sanity

Une fois le Studio accessible, remplis dans l'ordre :

1. **Configuration > Infos Business** : nom, tel, email, reseaux sociaux, URL
2. **Configuration > Liens externes** : URL Calendly, numero WhatsApp
3. **Page Accueil > Hero** : titre, sous-titre, description, image de fond
4. **Page Accueil > Moments miroir** : 3 items (titre + description)
5. **Page Accueil > Piliers** : Leadership, Transition, Performance
6. **Page Accueil > Parcours** : texte "Qui suis-je"
7. **Page Accueil > Galerie** : photos (compressees en WebP avant upload)

---

## 8. Checklist avant mise en ligne

- [ ] Domaine achete et configure
- [ ] Variables d'environnement sur Netlify
- [ ] CORS Sanity pour le domaine de prod
- [ ] Contenu Sanity rempli (hero, piliers, parcours, galerie)
- [ ] Google Analytics configure
- [ ] Google Search Console verifie + sitemap soumis
- [ ] Calendly configure + lien dans Sanity
- [ ] WhatsApp configure
- [ ] Mentions legales redigees
- [ ] Favicon et OG image crees
- [ ] Test mobile + desktop
- [ ] Test vitesse (PageSpeed Insights)

---

## 9. Commandes utiles

```bash
npm run dev      # Lance le serveur de dev sur localhost:5555
npm run build    # Build de production
npm run lint     # Lint du code
```

## 10. Stack technique

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Sanity CMS** (headless, Studio integre)
- **Netlify** (hebergement)
- **Google Analytics 4** (analytics, conditionne au consentement RGPD)
