import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../../components/HeaderNav";
import SeoJsonLd from "../../components/SeoJsonLd";
import SiteFooter from "../../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_TRAJET_HOTEL_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Taxi Hôtel et loisirs Haute-Savoie",
  description:
    "Transports taxi vers hôtels et loisirs en Haute-Savoie: prise en charge touristique et déplacements confort pendant le séjour.",
  path: "/type-de-trajet/hotel-loisirs",
  keywords: ["taxi hôtel", "taxi loisirs", "transport touristique taxi"],
});

export default function HotelLoisirsPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/type-de-trajet/hotel-loisirs",
    pageTitle: "Taxi Hôtel et loisirs Haute-Savoie",
    pageDescription:
      "Prise en charge taxi vers hôtels, restaurants et activités touristiques en vallée de l’Arve.",
    serviceType: "Transport hôtelier et loisirs",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Hôtel & loisirs</h1>
            <p className="mt-4 text-slate-600">
              Transport touristique et hôtelier pour vos séjours en Haute-Savoie: arrivée à
              l’hôtel, déplacements vers restaurants, activités outdoor, événements et lieux culturels.
            </p>
            <p className="mt-3 text-slate-600">
              Service flexible pour familles, couples, groupes et clientèle internationale souhaitant
              un accompagnement local fiable pendant tout le séjour.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image hôtel & loisirs</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Trajet hôtel et loisirs" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
