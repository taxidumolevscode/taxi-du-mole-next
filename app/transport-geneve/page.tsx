import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_GENEVE_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Transport taxi vers ou depuis Genève",
  description:
    "Transferts taxi entre Bonneville, vallée de l’Arve et Genève: aéroport, gares, hôtels et rendez-vous professionnels.",
  path: "/transport-geneve",
  keywords: ["taxi genève", "transfert genève bonneville", "taxi aéroport genève"],
});

export default function TransportGenevePage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/transport-geneve",
    pageTitle: "Transport taxi vers ou depuis Genève",
    pageDescription:
      "Service taxi transfrontalier entre Haute-Savoie et Genève pour déplacements privés et professionnels.",
    serviceType: "Transfert taxi transfrontalier",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Transport vers ou depuis Genève</h1>
            <p className="mt-4 text-slate-600">
              Liaison régulière entre Bonneville, vallée de l’Arve et Genève pour aéroport,
              gare, hôtels, rendez-vous privés ou professionnels.
            </p>
            <p className="mt-3 text-slate-600">
              Service transfrontalier organisé pour optimiser vos horaires de départ et limiter
              le stress des trajets internationaux.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image transport Genève</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Transport taxi Genève" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
