import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { unstable_cache } from "next/cache";
import { CALENDLY_URL } from "./constants";

type SanityImageSource = {
  _type?: string;
  asset?: { _ref?: string; _type?: string };
  [key: string]: unknown;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const mockChainable = {
  url: () => undefined,
  width: () => mockChainable,
  height: () => mockChainable,
};

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;
export function urlFor(source: SanityImageSource) {
  if (!builder) return mockChainable;
  return builder.image(source);
}

// ============================================
// BUSINESS INFO
// ============================================
export interface SanityBusinessInfo {
  _id: string;
  name: string;
  tagline?: string;
  description?: string;
  phone?: string;
  phoneFormatted?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  social?: {
    instagram?: string;
    linkedin?: string;
  };
  url?: string;
}

export const getBusinessInfo = unstable_cache(
  async (): Promise<SanityBusinessInfo | null> => {
    if (!client) return null;
    return client.fetch(`*[_type == "businessInfo"][0]`);
  },
  ["businessInfo"],
  { revalidate: 60 }
);

// ============================================
// EXTERNAL LINKS
// ============================================
export interface SanityExternalLinks {
  _id: string;
  calendlyUrl?: string;
  whatsappNumber?: string;
}

export const getExternalLinks = unstable_cache(
  async (): Promise<SanityExternalLinks | null> => {
    if (!client) return null;
    return client.fetch(`*[_type == "externalLinks"][0]`);
  },
  ["externalLinks"],
  { revalidate: 60 }
);

export async function getCalendlyUrl(): Promise<string> {
  const externalLinks = await getExternalLinks();
  return externalLinks?.calendlyUrl || CALENDLY_URL;
}

// ============================================
// HERO CONTENT
// ============================================
export interface SanityHeroContent {
  _id: string;
  page: string;
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: SanityImageSource;
  primaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export async function getHeroContent(page: string): Promise<SanityHeroContent | null> {
  return unstable_cache(
    async () => {
      if (!client) return null;
      return client.fetch(
        `*[_type == "heroContent" && page == $page][0] {
          _id, page, title, subtitle, description, backgroundImage, primaryCta
        }`,
        { page }
      );
    },
    [`heroContent-${page}`],
    { revalidate: 60 }
  )();
}

// ============================================
// PILIERS (3 pillars)
// ============================================
export interface SanityPillar {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

export const getPillars = unstable_cache(
  async (): Promise<SanityPillar[]> => {
    if (!client) return [];
    return client.fetch(`
      *[_type == "pillar"] | order(order asc) {
        _id, title, description, icon, order
      }
    `);
  },
  ["pillars"],
  { revalidate: 60 }
);

// ============================================
// MIRROR SECTIONS
// ============================================
export interface SanityMirrorItem {
  _id: string;
  title: string;
  description: string;
  image?: SanityImageSource;
  order?: number;
}

export const getMirrorItems = unstable_cache(
  async (): Promise<SanityMirrorItem[]> => {
    if (!client) return [];
    return client.fetch(`
      *[_type == "mirrorItem"] | order(order asc) {
        _id, title, description, image, order
      }
    `);
  },
  ["mirrorItems"],
  { revalidate: 60 }
);

// ============================================
// ABOUT / PARCOURS
// ============================================
export interface SanityAbout {
  _id: string;
  title?: string;
  content?: string;
  image?: SanityImageSource;
}

export const getAbout = unstable_cache(
  async (): Promise<SanityAbout | null> => {
    if (!client) return null;
    return client.fetch(`*[_type == "about"][0]`);
  },
  ["about"],
  { revalidate: 60 }
);

// ============================================
// GALLERY PHOTOS
// ============================================
export interface SanityPhoto {
  _id: string;
  title: string;
  image: SanityImageSource;
  alt?: string;
  order?: number;
}

export const getPhotos = unstable_cache(
  async (): Promise<SanityPhoto[]> => {
    if (!client) return [];
    return client.fetch(`
      *[_type == "photo"] | order(order asc) {
        _id, title, image, "alt": image.alt, order
      }
    `);
  },
  ["photos"],
  { revalidate: 60 }
);
