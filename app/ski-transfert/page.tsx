import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import stations from "../data/skiStations.json";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const heroImage =
  process.env.NEXT_PUBLIC_TDM_SKI_HERO_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Ski transfert Haute-Savoie et Savoie",
  description:
    "Ski transfert depuis Bonneville et Genève vers Morzine, Avoriaz, Les Gets, Samoëns, La Clusaz, Megève, Chamonix et autres stations.",
  path: "/ski-transfert",
  keywords: [
    "ski transfert",
    "taxi station de ski",
    "taxi morzine",
    "taxi avoriaz",
    "taxi les gets",
  ],
});

export default function SkiTransfertPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/ski-transfert",
    pageTitle: "Ski transfert Haute-Savoie et Savoie",
    pageDescription:
      "Transferts taxi stations de ski avec véhicules adaptés montagne depuis vallée de l'Arve et Genève.",
    serviceType: "Transfert station de ski en taxi",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />

      <main className="bg-white text-slate-900">
        {/* HERO SECTION */}
        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="font-[var(--font-bebas)] text-6xl tracking-tight text-black sm:text-7xl">
              Ski Transfert
            </h1>

            <p className="mt-3 text-slate-600">
              Taxi Du Môle organise vos transferts ski depuis Bonneville,
              Genève et la vallée de l&apos;Arve vers les stations de
              Haute-Savoie et Savoie. Service adapté bagages, matériel et
              conditions hivernales.
            </p>

            <p className="mt-3 text-slate-600">
              Découvrez nos destinations ski avec une organisation claire,
              rapide et adaptée à vos besoins.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Image ski transfert
            </p>

            <div className="mt-3 flex h-72 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image
                src={heroImage}
                alt="Transfert stations de ski"
                width={380}
                height={380}
                className="h-auto w-full max-w-[240px] object-contain"
              />
            </div>
          </div>
        </section>

        {/* STATIONS SECTION */}
        <section className="mx-auto max-w-7xl px-5 pb-16">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-black text-black">
              Stations disponibles
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stations.map((station) => (
                <article
                  key={station.name}
                  className="rounded-2xl bg-white p-4 ring-1 ring-slate-200"
                >
                  <h3 className="text-lg font-black text-black">
                    {station.name}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {station.region}
                  </p>

                  <Link
                    href="/reserver-en-ligne"
                    className="mt-3 inline-block text-sm font-bold text-[#b07a00] hover:underline"
                  >
                    Demander un transfert
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}