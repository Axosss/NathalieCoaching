const { createClient } = require("@sanity/client");
const { readFileSync } = require("fs");
const { join, basename } = require("path");

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

const LOGO_PATH = "/Users/axoss/Downloads/Canva logo.webp";

async function run() {
  // 1. Upload new logo
  console.log("Uploading Elevate+ logo...");
  const buffer = readFileSync(LOGO_PATH);
  const asset = await client.assets.upload("image", buffer, {
    filename: "elevate-plus-logo.webp",
    contentType: "image/webp",
  });
  console.log(`  → Uploaded as ${asset._id}`);

  const imageRef = { _type: "image", asset: { _type: "reference", _ref: asset._id } };

  // 2. Update the partner logo document (id: logo-2 = Progress Associés)
  console.log("Updating partner logo document...");
  await client
    .patch("logo-2")
    .set({ name: "Elevate Plus", logo: imageRef })
    .commit();

  console.log("  → Updated logo-2: name='Elevate Plus' + new logo");
  console.log("\nDone! Run 'npm run build' to regenerate the site.");
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
