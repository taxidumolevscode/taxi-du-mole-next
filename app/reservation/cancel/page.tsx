import Link from "next/link";
import HeaderNav from "../../components/HeaderNav";
import PaymentReturnSync from "../../components/PaymentReturnSync";
import SiteFooter from "../../components/SiteFooter";

type CancelPageProps = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function ReservationCancelPage({ searchParams }: CancelPageProps) {
  const params = await searchParams;
  const reference = params.ref || "";

  return (
    <>
      <HeaderNav />
      <main className="bg-white text-slate-900">
        <section className="mx-auto max-w-4xl px-5 py-16">
          <div className="rounded-3xl border border-amber-300 bg-amber-50 p-8">
            <h1 className="text-4xl font-black text-amber-900">Paiement annulé</h1>
            <p className="mt-3 text-amber-900">
              Le paiement Stripe a été interrompu. Ta demande reste enregistrée avec un statut en attente.
            </p>
            {reference ? (
              <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.08em] text-amber-800">
                Référence: {reference}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/reserver-en-ligne" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white">
                Reprendre ma réservation
              </Link>
              <Link href="/espace-client" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900">
                Aller à l&apos;espace client
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PaymentReturnSync reference={reference} status="awaiting_payment" />
      <SiteFooter />
    </>
  );
}
