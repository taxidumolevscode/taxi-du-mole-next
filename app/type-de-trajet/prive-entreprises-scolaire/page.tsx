import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../../components/HeaderNav";
import SeoJsonLd from "../../components/SeoJsonLd";
import SiteFooter from "../../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_TRAJET_PRO_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Taxi privé, entreprises et scolaire",
  description:
    "Transport taxi privé, entreprises et scolaire en Haute-Savoie: trajets récurrents ou ponctuels avec service fiable.",
  path: "/type-de-trajet/prive-entreprises-scolaire",
  keywords: ["taxi entreprise", "taxi scolaire", "taxi privé bonneville"],
});

export default function PriveEntreprisesScolairePage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/type-de-trajet/prive-entreprises-scolaire",
    pageTitle: "Taxi privé, entreprises et scolaire",
    pageDescription:
      "Solutions de transport taxi pour particuliers, professionnels et établissements scolaires.",
    serviceType: "Transport privé et professionnel",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Privé / entreprises / scolaire</h1>
            <p className="mt-4 text-slate-600">
              Organisation de trajets récurrents ou ponctuels pour particuliers, entreprises,
              établissements scolaires et partenaires institutionnels.
            </p>
            <p className="mt-3 text-slate-600">
              Taxi Du Môle structure vos déplacements avec un suivi clair, une disponibilité
              renforcée et des conditions de transport adaptées à chaque besoin.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image privé / entreprises / scolaire</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Trajets privés entreprises scolaires" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
