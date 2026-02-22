import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const heroImage = process.env.NEXT_PUBLIC_TDM_TRAJET_HERO_IMAGE || "/logo-taxi-du-mole.png";

const blocks = [
  {
    title: "Aéroport Genève & gares",
    desc: "Trajets optimisés vers aéroport, gares régionales et hubs transfrontaliers.",
    href: "/type-de-trajet/aeroport-gares",
  },
  {
    title: "Hôtel & loisirs",
    desc: "Déposes et prises en charge sur lieux d’hébergement et activités touristiques.",
    href: "/type-de-trajet/hotel-loisirs",
  },
  {
    title: "Long trajet",
    desc: "Confort premium et fiabilité pour les déplacements longue distance.",
    href: "/type-de-trajet/long-trajet",
  },
  {
    title: "Stations de ski",
    desc: "Transferts hiver/été vers les stations majeures de Haute-Savoie et Savoie.",
    href: "/type-de-trajet/stations-de-ski",
  },
  {
    title: "Privé / entreprises / scolaire",
    desc: "Organisation de trajets récurrents ou ponctuels selon votre activité.",
    href: "/type-de-trajet/prive-entreprises-scolaire",
  },
  {
    title: "Ski transfert",
    desc: "Page dédiée aux transferts ski avec destinations dynamiques.",
    href: "/ski-transfert",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Type de trajet taxi Haute-Savoie",
  description:
    "Types de trajets Taxi Du Môle: aéroport Genève, gares, hôtels, stations de ski, longs trajets et services entreprises en Haute-Savoie.",
  path: "/type-de-trajet",
  keywords: [
    "type de trajet taxi",
    "taxi aéroport genève",
    "taxi gares haute-savoie",
    "taxi stations de ski",
  ],
});

export default function TypeDeTrajetPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/type-de-trajet",
    pageTitle: "Type de trajet taxi Haute-Savoie",
    pageDescription:
      "Catalogue des trajets taxi en vallée de l'Arve: aéroport, gares, loisirs, ski, privé et professionnel.",
    serviceType: "Organisation de trajets taxi",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="font-[var(--font-bebas)] text-6xl tracking-tight text-black sm:text-7xl">
              Type de trajet
            </h1>
            <p className="mt-3 text-slate-600">
              Cette page regroupe tous les scénarios de transport taxi en Haute-Savoie dans la
              vallée de l’Arve: aéroport, gares, loisirs, longue distance, stations de ski,
              besoins privés et professionnels.
            </p>
            <p className="mt-3 text-slate-600">
              Chaque parcours est décliné en page dédiée pour faciliter le référencement local et
              améliorer l&apos;expérience utilisateur avant la réservation.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image type de trajet</p>
            <div className="mt-3 flex h-72 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={heroImage} alt="Type de trajet taxi" width={380} height={380} className="h-auto w-full max-w-[240px] object-contain" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blocks.map((item) => (
              <article key={item.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-2xl font-black text-black">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                <Link href={item.href} className="mt-4 inline-block text-sm font-bold text-[#b07a00] hover:underline">
                  Voir la page
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
