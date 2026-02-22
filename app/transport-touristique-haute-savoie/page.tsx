import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_HS_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Transport touristique en Haute-Savoie",
  description:
    "Taxi touristique en Haute-Savoie depuis Bonneville: circuits montagne, villages, hôtels et destinations loisirs.",
  path: "/transport-touristique-haute-savoie",
  keywords: ["transport touristique haute-savoie", "taxi tourisme bonneville", "taxi vallée arve"],
});

export default function TransportTouristiqueHauteSavoiePage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/transport-touristique-haute-savoie",
    pageTitle: "Transport touristique en Haute-Savoie",
    pageDescription:
      "Service taxi local pour excursions et déplacements touristiques en Haute-Savoie.",
    serviceType: "Transport touristique local",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">
              Transport touristique Haute-Savoie
            </h1>
            <p className="mt-4 text-slate-600">
              Taxi Du Môle propose un service touristique premium dans toute la Haute-Savoie,
              depuis Bonneville et la vallée de l’Arve vers les points d’intérêt les plus demandés.
            </p>
            <p className="mt-3 text-slate-600">
              Idéal pour séjours loisir, circuits montagne, escapades lac et déplacements de confort
              avec chauffeur local.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image touristique Haute-Savoie</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Transport touristique Haute-Savoie" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
