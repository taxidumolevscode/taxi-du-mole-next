import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_CONVENTIONNE_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Taxi conventionné CPAM Bonneville",
  description:
    "Taxi conventionné CPAM à Bonneville: transport médical assis, assistance et accompagnement vers centres de soins en Haute-Savoie.",
  path: "/taxi-conventionne",
  keywords: ["taxi conventionné cpam", "transport médical bonneville", "taxi médical haute-savoie"],
});

export default function TaxiConventionnePage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/taxi-conventionne",
    pageTitle: "Taxi conventionné CPAM Bonneville",
    pageDescription:
      "Transport médical conventionné CPAM en Haute-Savoie depuis Bonneville et vallée de l’Arve.",
    serviceType: "Transport médical conventionné CPAM",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Taxi conventionné</h1>
            <p className="mt-4 text-slate-600">
              Taxi Du Môle assure les transports médicaux conventionnés CPAM selon conditions et
              prescription médicale. Nous organisons les déplacements vers hôpitaux, cliniques,
              centres de soins et rendez-vous spécialisés.
            </p>
            <p className="mt-3 text-slate-600">
              Notre service met l’accent sur la ponctualité, la sérénité et l’accompagnement
              adapté aux besoins de chaque patient.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image taxi conventionné</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Taxi conventionné CPAM" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
