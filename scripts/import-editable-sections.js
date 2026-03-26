const { createClient } = require("@sanity/client");
const { readFileSync } = require("fs");
const { join } = require("path");

let TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) {
  try {
    const envFile = readFileSync(join(__dirname, "..", ".env.local"), "utf-8");
    const match = envFile.match(/^SANITY_TOKEN=(.+)$/m);
    if (match) TOKEN = match[1].trim();
  } catch {}
}
if (!TOKEN) {
  console.error("Set SANITY_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: "pyvdxbda",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

async function run() {
  // 1. Lead Magnet
  console.log("Creating leadMagnet document...");
  await client.createOrReplace({
    _id: "leadMagnet",
    _type: "leadMagnet",
    label: "Ressource gratuite",
    title: "Les 90 premiers jours : votre checklist prise de poste",
    bullets: [
      "Les 5 conversations clés à avoir dans les 2 premières semaines",
      "Le cadre pour poser votre leadership sans brusquer",
      "Les erreurs que 80% des dirigeants font — et comment les éviter",
      "Un template de plan d'action 30-60-90 jours prêt à l'emploi",
    ],
    socialProof: "Utilisée par plus de 200 cadres dirigeants accompagnés en coaching.",
    formTitle: "Recevez la checklist",
    formSubtitle: "Directement dans votre boîte mail",
    placeholderName: "Votre prénom",
    placeholderEmail: "Votre adresse email",
    buttonText: "Recevoir ma checklist →",
    disclaimer: "Pas de spam. Désinscription en un clic.",
  });
  console.log("  → leadMagnet OK");

  // 2. Blog Section
  console.log("Creating blogSection document...");
  await client.createOrReplace({
    _id: "blogSection",
    _type: "blogSection",
    label: "Blog",
    title: "Articles & réflexions",
  });
  console.log("  → blogSection OK");

  // 3. Add contactEmail to siteSettings
  console.log("Patching siteSettings with contactEmail...");
  await client.patch("siteSettings").set({ contactEmail: "ndebeir@yahoo.fr" }).commit();
  console.log("  → contactEmail OK");

  console.log("\nDone! All editable sections imported.");
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
