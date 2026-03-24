import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { deskStructure } from "./sanity/deskStructure";

const projectId = "pyvdxbda";
const dataset = "production";

export default defineConfig({
  name: "nathalie-coaching-pro",
  title: "Nathalie Coaching Pro - Admin",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
