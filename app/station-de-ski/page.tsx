import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_STATION_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Taxi station de ski Haute-Savoie",
  description:
    "Transfert taxi stations de ski depuis Bonneville: Morzine, Avoriaz, Les Gets, Samoëns, Megève, Chamonix et plus.",
  path: "/station-de-ski",
  keywords: ["taxi station de ski", "taxi morzine", "taxi avoriaz", "transfert les gets"],
});

export default function StationDeSkiPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/station-de-ski",
    pageTitle: "Taxi station de ski Haute-Savoie",
    pageDescription:
      "Trajets stations de ski avec véhicules adaptés montagne depuis vallée de l'Arve et Genève.",
    serviceType: "Transfert stations de ski",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Station de ski</h1>
            <p className="mt-4 text-slate-600">
              Transferts taxi vers les stations de ski de Haute-Savoie et Savoie: Morzine,
              Avoriaz, Les Gets, Samoëns, Megève, Chamonix, Flaine, Courchevel sur demande.
            </p>
            <p className="mt-3 text-slate-600">
              Véhicules adaptés à la montagne pour assurer vos déplacements en hiver comme en été,
              avec gestion des bagages et équipements sportifs.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image station de ski</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Transfert station de ski" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
