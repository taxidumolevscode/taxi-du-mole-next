import Link from "next/link";
import HeaderNav from "../../components/HeaderNav";
import PaymentReturnSync from "../../components/PaymentReturnSync";
import SiteFooter from "../../components/SiteFooter";

type SuccessPageProps = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function ReservationSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const reference = params.ref || "";

  return (
    <>
      <HeaderNav />
      <main className="bg-white text-slate-900">
        <section className="mx-auto max-w-4xl px-5 py-16">
          <div className="rounded-3xl border border-emerald-300 bg-emerald-50 p-8">
            <h1 className="text-4xl font-black text-emerald-900">Paiement confirmé</h1>
            <p className="mt-3 text-emerald-900">
              Merci. Ton acompte est validé et ta réservation a bien été enregistrée.
            </p>
            {reference ? (
              <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.08em] text-emerald-800">
                Référence: {reference}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/espace-client" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white">
                Voir mon espace client
              </Link>
              <Link href="/" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900">
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PaymentReturnSync reference={reference} status="paid_deposit" />
      <SiteFooter />
    </>
  );
}
