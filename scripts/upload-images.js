const { createClient } = require("@sanity/client");
const { readFileSync } = require("fs");
const { join, basename, extname } = require("path");

// Load token
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

const IMG_DIR = join(__dirname, "..", "version-a", "images");

// Map: which images go to which documents
const imageUploads = [
  // Home hero
  { file: "dune-sable.webp", docId: "homeHero", field: "backgroundImage" },
  // Whois portrait
  { file: "portrait-nathalie.webp", docId: "whois", field: "photo" },
  // About portrait (same image, we'll reuse the asset)
  { file: "portrait-nathalie.webp", docId: "aboutTop", field: "photo" },
  // Prestation images
  { file: "route-montagne.webp", docId: "prestation-1", field: "image" },
  { file: "fleur-orange.webp", docId: "prestation-2", field: "image" },
  { file: "dune-desert-large.webp", docId: "prestation-3", field: "image" },
  { file: "chemin-neige.webp", docId: "prestation-4", field: "image" },
  { file: "arbre-ocean.webp", docId: "prestation-5", field: "image" },
  // Gallery photos
  { file: "route-montagne.webp", docId: "gallery-1", field: "image", createDoc: { _type: "galleryPhoto", alt: "Route sinueuse en montagne", order: 1 } },
  { file: "fleur-orange.webp", docId: "gallery-2", field: "image", createDoc: { _type: "galleryPhoto", alt: "Fleur orange dans un champ bleu", order: 2 } },
  { file: "arbre-ocean.webp", docId: "gallery-3", field: "image", createDoc: { _type: "galleryPhoto", alt: "Arbre dans l'océan", order: 3 } },
  { file: "chemin-neige.webp", docId: "gallery-4", field: "image", createDoc: { _type: "galleryPhoto", alt: "Chemin enneigé au Canada", order: 4 } },
  { file: "lac-volcanique.webp", docId: "gallery-5", field: "image", createDoc: { _type: "galleryPhoto", alt: "Lac volcanique turquoise", order: 5 } },
  { file: "silhouettes-coucher.webp", docId: "gallery-6", field: "image", createDoc: { _type: "galleryPhoto", alt: "Silhouettes au coucher de soleil", order: 6 } },
  // Partner logos
  { file: "logos/sciences-po.svg", docId: "logo-1", field: "logo", createDoc: { _type: "partnerLogo", name: "Sciences Po Alumni", order: 1 } },
  { file: "logos/progress-associes.svg", docId: "logo-2", field: "logo", createDoc: { _type: "partnerLogo", name: "Progress Associés", order: 2 } },
  { file: "logos/pcm.svg", docId: "logo-3", field: "logo", createDoc: { _type: "partnerLogo", name: "Process Communication Model", order: 3 } },
  { file: "logos/icf.svg", docId: "logo-4", field: "logo", createDoc: { _type: "partnerLogo", name: "International Coaching Federation", order: 4 } },
];

// Cache uploaded assets to avoid duplicates
const assetCache = new Map();

async function uploadImage(filePath) {
  if (assetCache.has(filePath)) return assetCache.get(filePath);

  const ext = extname(filePath).slice(1);
  const contentType = ext === "svg" ? "image/svg+xml" : `image/${ext === "webp" ? "webp" : "jpeg"}`;
  const buffer = readFileSync(filePath);

  console.log(`  Uploading ${basename(filePath)}...`);
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(filePath),
    contentType,
  });

  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  assetCache.set(filePath, ref);
  return ref;
}

async function run() {
  console.log("Uploading images to Sanity CDN...\n");

  for (const item of imageUploads) {
    const filePath = join(IMG_DIR, item.file);
    try {
      const imageRef = await uploadImage(filePath);

      if (item.createDoc) {
        // Create or replace the document with the image
        await client.createOrReplace({
          _id: item.docId,
          ...item.createDoc,
          [item.field]: imageRef,
        });
        console.log(`  → Created ${item.docId} with ${item.file}`);
      } else {
        // Patch existing document with the image
        await client.patch(item.docId).set({ [item.field]: imageRef }).commit();
        console.log(`  → Patched ${item.docId}.${item.field} with ${item.file}`);
      }
    } catch (err) {
      console.error(`  ✗ Failed ${item.file} → ${item.docId}: ${err.message}`);
    }
  }

  console.log("\nDone! All images uploaded to Sanity CDN.");
}

run().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
