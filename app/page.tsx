import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "./components/BookingForm";
import FoldMountainHero from "./components/FoldMountainHero";
import HeaderNav from "./components/HeaderNav";
import SeoJsonLd from "./components/SeoJsonLd";
import SiteFooter from "./components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "./lib-seo";

const phone = process.env.NEXT_PUBLIC_TDM_PHONE || "+33680423031";
const email = process.env.NEXT_PUBLIC_TDM_EMAIL || "contact@taxidumole.com";
const heroImage = process.env.NEXT_PUBLIC_TDM_HOME_HERO_IMAGE || "/logo-taxi-du-mole.png";
const sectionImage = process.env.NEXT_PUBLIC_TDM_HOME_SECTION_IMAGE || "/logo-taxi-du-mole.png";
const floatingLogo = process.env.NEXT_PUBLIC_TDM_FLOATING_LOGO || "/logo-taxi-du-mole.png";
const mountainBg = process.env.NEXT_PUBLIC_TDM_MOUNTAIN_BG || "/montagne-bg.svg";
const mountainMid = process.env.NEXT_PUBLIC_TDM_MOUNTAIN_MID || "/montagne-bg.svg";
const mountainFore = process.env.NEXT_PUBLIC_TDM_MOUNTAIN_FORE || "/montagne-bg.svg";
const mountainYellow = process.env.NEXT_PUBLIC_TDM_MOUNTAIN_YELLOW || "/montagne-yellow-overlay.svg";

const trajetLinks = [
  {
    title: "Aéroport & gares",
    description:
      "Transferts pour les gares d’Annecy, Genève, Bellegarde, Cluses, Annemasse et arrivées/départs de l’aéroport de Genève.",
    href: "/type-de-trajet/aeroport-gares",
  },
  {
    title: "Stations de ski",
    description:
      "Transport taxi vers Morzine, Avoriaz, Les Gets, Samoëns, Megève, Chamonix, Flaine et stations limitrophes de Savoie.",
    href: "/type-de-trajet/stations-de-ski",
  },
  {
    title: "Long trajet",
    description:
      "Pour un trajet long en taxi dans la région, réservez et profitez d’une tranquillité assurée.",
    href: "/type-de-trajet/long-trajet",
  },
  {
    title: "Hôtel & loisirs",
    description:
      "Prise en charge et dépose sur votre lieu de vacances ou sur des lieux touristiques.",
    href: "/type-de-trajet/hotel-loisirs",
  },
  {
    title: "Privé / entreprises / scolaire",
    description:
      "Transport taxi pour besoins récurrents ou ponctuels pour particuliers, entreprises et scolaire.",
    href: "/type-de-trajet/prive-entreprises-scolaire",
  },
];

const homeServiceLinks = [
  { label: "Taxi conventionné", href: "/taxi-conventionne" },
  { label: "Transport touristique", href: "/transport-touristique" },
  { label: "Gares ferroviaires", href: "/gares-ferroviaires" },
  { label: "Station de ski", href: "/station-de-ski" },
  { label: "Transport touristique Haute-Savoie", href: "/transport-touristique-haute-savoie" },
  { label: "Transport vers ou depuis Genève", href: "/transport-geneve" },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Taxi Bonneville 74130 - Transferts Haute-Savoie et Genève",
  description:
    "Taxi Du Môle à Bonneville 74130: transferts vallée de l'Arve, Genève, gares, stations de ski, taxi conventionné CPAM et transport touristique.",
  path: "/",
  keywords: [
    "taxi bonneville",
    "taxi vallée de l'arve",
    "taxi haute-savoie",
    "taxi geneve",
    "taxi conventionné",
    "taxi touristique",
  ],
});

export default function Home() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/",
    pageTitle: "Taxi Bonneville 74130 - Transferts Haute-Savoie et Genève",
    pageDescription:
      "Taxi Du Môle à Bonneville pour transferts gares, aéroport Genève, stations de ski, trajets touristiques et conventionnés en Haute-Savoie.",
    serviceType: "Service de taxi local et transferts",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />

      <main className="bg-white text-slate-900">
        <FoldMountainHero
          logoSrc={floatingLogo}
          backgroundSrc={mountainBg}
          middleLayerSrc={mountainMid}
          foregroundLayerSrc={mountainFore}
          yellowMountainSrc={mountainYellow}
          phone={phone}
        />

        <section className="border-b border-slate-200 bg-[radial-gradient(50rem_20rem_at_80%_0%,rgba(255,182,0,.16),transparent_60%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pt-20">
            <div>
              <p className="template-label is-brand">
                Taxi Du Môle - Bonneville 74130
              </p>
              <h1 className="mt-4 font-[var(--font-bebas)] text-6xl leading-[0.88] tracking-tight text-black sm:text-7xl md:text-8xl">
                Soyez la bienvenue
              </h1>

              <p className="mt-5 text-lg text-slate-700">
                Taxi Du Môle, taxi à Bonneville situé à seulement 20 minutes de Genève en prenant
                l&apos;autoroute, est spécialisé dans les transferts vers les stations de ski de
                Haute-Savoie, notamment La Clusaz, Morzine, Avoriaz et Les Gets.
              </p>
              <p className="mt-4 text-slate-600">
                Disponible sur toute la zone de la vallée de l&apos;Arve en Haute-Savoie, Taxi Du Môle
                assure les transferts depuis et vers l&apos;aéroport et la gare de Genève, avec des
                véhicules adaptés à la montagne, été comme hiver. Partenaire avec les Offices de
                Tourisme des stations de ski haut-savoyardes, nous mettons notre expertise locale
                au service de vos déplacements pour un transport confortable et sur mesure.
              </p>
              <p className="mt-4 text-slate-600">
                Que vous planifiiez un voyage vers Genève, une excursion vers les hôtels ou les
                stations de ski prestigieuses de Haute-Savoie, ou un transfert vers les gares et
                aéroports locaux et genevois, nous sommes là pour vous offrir un service premium.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/reserver-en-ligne"
                  className="rounded-full bg-black px-6 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-slate-800"
                >
                  Réserver en ligne
                </Link>
                <Link
                  href="/tarifs"
                  className="rounded-full bg-[#ffb600] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-black transition hover:brightness-95"
                >
                  Voir les tarifs
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Image Hero (modifiable)
              </p>
              <div className="mt-4 flex h-80 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
                <Image
                  src={heroImage}
                  alt="Taxi du Môle à Bonneville"
                  width={520}
                  height={520}
                  className="h-auto w-full max-w-[320px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-black text-black">Un service idéal</h2>
              <p className="mt-2 text-sm text-slate-600">Ponctualité, sécurité, confort et disponibilité 24/7.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-black text-black">Une facilité d&apos;usage</h2>
              <p className="mt-2 text-sm text-slate-600">Réservation simple, confirmation rapide et suivi clair.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-black text-black">Un équipement fiable</h2>
              <p className="mt-2 text-sm text-slate-600">Véhicules adaptés montagne et paiements modernes à bord.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-4xl font-black tracking-tight text-black">Pages de service</h2>
            <p className="mt-2 text-slate-600">
              Découvrez nos pages détaillées pour le taxi conventionné, les gares ferroviaires,
              les transports touristiques et les trajets vers Genève.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {homeServiceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {trajetLinks.map((item) => (
                <article key={item.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-xl font-black text-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <Link href={item.href} className="mt-4 inline-block text-sm font-bold text-[#b07a00] hover:underline">
                    Voir la page
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image Section (modifiable)</p>
            <div className="mt-4 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image
                src={sectionImage}
                alt="Transferts taxi Haute-Savoie"
                width={420}
                height={420}
                className="h-auto w-full max-w-[250px] object-contain"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-14">
          <div className="on-dark rounded-3xl bg-black p-7 text-white">
            <h2 className="text-4xl font-black tracking-tight">Formulaire de réservation</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
                <h3 className="mt-2 text-xl font-black">Remplissez notre formulaire</h3>
                <p className="mt-2 text-sm text-white">
                  Nous vous invitons à remplir le formulaire avec toutes les informations pour une
                  prise en charge efficace répondant à vos besoins en Haute-Savoie, Savoie, Genève & Suisse.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
                <h3 className="mt-2 text-xl font-black">Confirmation puis prise en charge</h3>
                <p className="mt-2 text-sm text-white">
                  Nous confirmons par mail ou téléphone, puis il ne vous reste qu&apos;à vous présenter
                  le jour J en toute sérénité.
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm text-white">
              Contact direct : <a href={`tel:${phone}`} className="font-bold text-[#ffb600]" aria-label={`Contactez-Nous au ${phone}`}>Contactez-Nous<span className="sr-only">{phone}</span></a> •
              Email : <a href={`mailto:${email}`} className="font-bold text-[#ffb600]"> {email}</a> •
              Paiements : Espèces, CB, Paypal, Apple Pay, Sans Contact.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-2 text-slate-900">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
