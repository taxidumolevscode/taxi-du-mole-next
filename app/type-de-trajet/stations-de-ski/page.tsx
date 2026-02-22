import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../../components/HeaderNav";
import SeoJsonLd from "../../components/SeoJsonLd";
import SiteFooter from "../../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_TRAJET_STATION_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Trajets taxi stations de ski",
  description:
    "Transport taxi vers stations de ski en Haute-Savoie et Savoie: Morzine, Avoriaz, Les Gets, Samoëns, Megève, Chamonix.",
  path: "/type-de-trajet/stations-de-ski",
  keywords: ["taxi stations de ski", "transfert ski", "taxi chamonix", "taxi megève"],
});

export default function StationsDeSkiPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/type-de-trajet/stations-de-ski",
    pageTitle: "Trajets taxi stations de ski",
    pageDescription:
      "Transferts taxi stations avec véhicule adapté montagne depuis Genève et vallée de l’Arve.",
    serviceType: "Trajet station de ski",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Stations de ski</h1>
            <p className="mt-4 text-slate-600">
              Transferts taxi vers les stations de ski de Haute-Savoie et des zones limitrophes de
              Savoie: Morzine, Avoriaz, Les Gets, Samoëns, Megève, Chamonix, Flaine et autres sur demande.
            </p>
            <p className="mt-3 text-slate-600">
              Départs depuis Bonneville, Genève et vallée de l’Arve. Véhicules adaptés, conduite
              montagne et anticipation des contraintes météo.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image stations de ski</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Trajet stations de ski" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
