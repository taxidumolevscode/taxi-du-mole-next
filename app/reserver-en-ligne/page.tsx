import type { Metadata } from "next";
import BookingForm from "../components/BookingForm";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const phone = process.env.NEXT_PUBLIC_TDM_PHONE || "+33680423031";
const email = process.env.NEXT_PUBLIC_TDM_EMAIL || "contact@taxidumole.com";

export const metadata: Metadata = buildPageMetadata({
  title: "Réserver un taxi en ligne",
  description:
    "Réservation taxi en ligne à Bonneville: formulaire, téléphone 06 80 42 30 31 et email contact@taxidumole.com.",
  path: "/reserver-en-ligne",
  keywords: ["réserver taxi", "formulaire réservation taxi", "taxi bonneville contact"],
});

export default function ReserverEnLignePage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/reserver-en-ligne",
    pageTitle: "Réserver un taxi en ligne",
    pageDescription:
      "Contact et formulaire de réservation taxi pour trajets en Haute-Savoie, Genève et stations de ski.",
    serviceType: "Réservation taxi en ligne",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto max-w-7xl px-5 py-16">
          <h1 className="font-[var(--font-bebas)] text-6xl tracking-tight text-black sm:text-7xl">
            Réserver en ligne
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Réservez votre taxi en ligne pour vos transferts gare, aéroport, station de ski,
            hôtel, longue distance et besoins professionnels en Haute-Savoie.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-black text-black">Contact rapide</h2>
              <p className="mt-3 text-slate-600">
                Téléphone: <a href={`tel:${phone}`} className="font-bold text-black" aria-label={`Contactez-Nous au ${phone}`}>Contactez-Nous<span className="sr-only">{phone}</span></a>
              </p>
              <p className="mt-1 text-slate-600">
                Email: <a href={`mailto:${email}`} className="font-bold text-black">{email}</a>
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Paiements acceptés: Espèces, CB, Paypal, Apple Pay, Sans Contact.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
