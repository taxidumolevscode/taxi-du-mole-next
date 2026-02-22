import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../../components/HeaderNav";
import SeoJsonLd from "../../components/SeoJsonLd";
import SiteFooter from "../../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_TRAJET_AEROPORT_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Taxi Aéroport Genève et gares",
  description:
    "Trajets taxi vers aéroport de Genève et gares depuis Bonneville: Annecy, Bellegarde, Cluses, Annemasse et vallée de l’Arve.",
  path: "/type-de-trajet/aeroport-gares",
  keywords: ["taxi aéroport genève", "taxi gares", "transfert annecy geneve"],
});

export default function AeroportGaresPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/type-de-trajet/aeroport-gares",
    pageTitle: "Taxi Aéroport Genève et gares",
    pageDescription:
      "Transfert taxi vers hubs aéroportuaires et ferroviaires depuis Bonneville et Haute-Savoie.",
    serviceType: "Transfert aéroport et gare",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Aéroport Genève & gares</h1>
            <p className="mt-4 text-slate-600">
              Taxi Du Môle vous accompagne vers l’aéroport de Genève et les gares majeures
              (Annecy, Genève, Bellegarde, Cluses, Annemasse) avec une organisation adaptée aux
              horaires de trains et de vols.
            </p>
            <p className="mt-3 text-slate-600">
              Départs depuis Bonneville, vallée de l’Arve et Haute-Savoie, avec prise en charge
              porte-à-porte pour limiter les temps d’attente et sécuriser votre correspondance.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image aéroport & gares</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Trajet aéroport Genève et gares" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
