import TrustBadges from "./TrustBadges";

export default function SiteFooter() {
  return (
    <>
      <TrustBadges />
      <footer className="border-t border-slate-800/30 bg-[#0b1220] text-white">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <p className="text-center text-sm text-white/90">
            <strong>Taxi du Môle</strong> assure aussi vos trajets liés à <strong>l&apos;assistance</strong>,
            <strong> l&apos;assurance</strong> et le <strong>transport médical</strong> en tant que
            <strong> taxi conventionné CPAM</strong> (selon conditions et prescription médicale).
          </p>
          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white/65">
            Licence : Bonneville N°3
          </p>
        </div>
      </footer>
    </>
  );
}
