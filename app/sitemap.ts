import type { MetadataRoute } from "next";
import { siteUrl } from "./lib-seo";

const routes = [
  "/",
  "/taxi-conventionne",
  "/transport-touristique",
  "/gares-ferroviaires",
  "/station-de-ski",
  "/transport-touristique-haute-savoie",
  "/transport-geneve",
  "/type-de-trajet",
  "/type-de-trajet/aeroport-gares",
  "/type-de-trajet/hotel-loisirs",
  "/type-de-trajet/long-trajet",
  "/type-de-trajet/stations-de-ski",
  "/type-de-trajet/prive-entreprises-scolaire",
  "/ski-transfert",
  "/tarifs",
  "/reserver-en-ligne",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
