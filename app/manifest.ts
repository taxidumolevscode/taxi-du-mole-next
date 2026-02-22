import type { MetadataRoute } from "next";
import { siteName, siteUrl } from "./lib-seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} - Réservation Taxi Haute-Savoie`,
    short_name: "Taxi du Môle",
    description:
      "Taxi à Bonneville 74130: transferts vallée de l'Arve, Genève, gares, stations de ski et réservation en ligne.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffb600",
    categories: ["travel", "transportation", "business"],
    lang: "fr-FR",
    id: siteUrl,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
