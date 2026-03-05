import Link from "next/link";

type StickyMobileCtaProps = {
  phone: string;
};

export default function StickyMobileCta({ phone }: StickyMobileCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-300/70 bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-18px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur md:hidden">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-2">
        <a
          href={`tel:${phone}`}
          className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-center text-sm font-extrabold text-slate-900"
          aria-label={`Contactez-Nous au ${phone}`}
        >
          Appeler
          <span className="sr-only">{phone}</span>
        </a>
        <Link
          href="/reserver-en-ligne"
          className="rounded-xl bg-[#ffb600] px-3 py-3 text-center text-sm font-extrabold text-black"
        >
          Réserver
        </Link>
      </div>
    </div>
  );
}
