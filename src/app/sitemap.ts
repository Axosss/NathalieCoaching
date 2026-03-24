import { MetadataRoute } from "next";
import { BUSINESS_INFO } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS_INFO.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
