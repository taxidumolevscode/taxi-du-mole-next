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

      <main className="pb-10 text-slate-900">
        <section className="tdm-shell grid gap-7 pb-8 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-16">
          <div>
            <p className="tdm-kicker">Haute-Savoie & Savoie</p>
            <h1 className="tdm-display mt-4 text-6xl text-slate-950 sm:text-7xl md:text-8xl">
              Ski Transfert
            </h1>

            <p className="mt-5 max-w-2xl text-slate-700">
              Taxi Du Môle organise vos transferts ski depuis Bonneville,
              Genève et la vallée de l&apos;Arve vers les stations de
              Haute-Savoie et Savoie. Service adapté bagages, matériel et
              conditions hivernales.
            </p>

            <p className="mt-4 max-w-2xl text-slate-700">
              Découvrez nos destinations ski avec une organisation claire,
              rapide et adaptée à vos besoins.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/reserver-en-ligne" className="tdm-btn tdm-btn-primary">
                Réserver Un Transfert
              </Link>
              <Link href="/tarifs" className="tdm-btn tdm-btn-accent">
                Voir Les Tarifs
              </Link>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="tdm-surface p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.11em] text-slate-500">Disponibilité</p>
                <p className="mt-2 text-xl font-black text-slate-950">24/7</p>
              </div>
              <div className="tdm-surface p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.11em] text-slate-500">Départ</p>
                <p className="mt-2 text-xl font-black text-slate-950">Bonneville / Genève</p>
              </div>
              <div className="tdm-surface p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.11em] text-slate-500">Équipement</p>
                <p className="mt-2 text-xl font-black text-slate-950">Montagne & bagages</p>
              </div>
            </div>
          </div>

          <div className="tdm-surface p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
              Image ski transfert
            </p>

            <div className="mt-3 flex h-72 items-center justify-center rounded-2xl bg-[linear-gradient(155deg,#ffffff_0%,#eef4ff_100%)] ring-1 ring-slate-200">
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

        <section className="tdm-shell pb-14">
          <div className="tdm-surface p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="tdm-display text-4xl text-slate-950 sm:text-5xl">
                Stations disponibles
              </h2>
              <Link href="/reserver-en-ligne" className="tdm-link">
                Demander Un Transfert
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stations.map((station) => (
                <article
                  key={station.name}
                  className="group rounded-2xl border border-slate-200/80 bg-white/92 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_35px_-28px_rgba(15,23,42,0.55)]"
                >
                  <h3 className="text-xl font-black text-slate-950">
                    {station.name}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {station.region}
                  </p>

                  <Link
                    href="/reserver-en-ligne"
                    className="tdm-link mt-3"
                  >
                    Demander Un Transfert
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tdm-shell pb-8">
          <div className="tdm-surface-dark p-7 text-white md:p-9">
            <h2 className="tdm-display text-4xl sm:text-5xl">
              Trajet fluide jusqu&apos;aux pistes
            </h2>
            <p className="mt-4 max-w-3xl text-white/85">
              Process clair: réservation, confirmation, prise en charge ponctuelle.
              Vous voyagez sereinement, même en forte affluence hivernale.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/reserver-en-ligne" className="tdm-btn tdm-btn-accent">
                Je Réserve Maintenant
              </Link>
              <Link href="/" className="tdm-btn border border-white/30 bg-white/10 text-white">
                Retour À L&apos;Accueil
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
