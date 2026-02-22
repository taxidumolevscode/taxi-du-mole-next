import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_TOURISTIQUE_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Transport touristique Haute-Savoie",
  description:
    "Transport touristique taxi en Haute-Savoie: excursions, hôtels, loisirs et trajets sur mesure depuis Bonneville.",
  path: "/transport-touristique",
  keywords: ["transport touristique", "taxi tourisme haute-savoie", "taxi excursion bonneville"],
});

export default function TransportTouristiquePage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/transport-touristique",
    pageTitle: "Transport touristique Haute-Savoie",
    pageDescription:
      "Service taxi touristique local pour excursions, hôtels, restaurants et activités en Haute-Savoie.",
    serviceType: "Transport touristique en taxi",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Transport touristique</h1>
            <p className="mt-4 text-slate-600">
              Service taxi touristique en Haute-Savoie pour vos excursions vers les villages,
              panoramas, hôtels, restaurants et activités de montagne.
            </p>
            <p className="mt-3 text-slate-600">
              Taxi Du Môle propose un transport local fiable pour profiter pleinement de votre séjour,
              en solo, en couple, en famille ou en groupe.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image transport touristique</p>
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
