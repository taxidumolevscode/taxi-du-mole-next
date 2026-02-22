function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[#ffb600]">
      <path d="M12 2 4 5.3V11c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V5.3L12 2Z" fill="currentColor" />
      <path d="m9.2 11.9 1.9 1.9 3.8-3.8" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const badges = [
  "Taxi conventionne CPAM",
  "Disponibilite 24/7",
  "Paiement CB et Sans Contact",
  "Transferts Geneve & Stations",
];

export default function TrustBadges() {
  return (
    <div className="trust-strip">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-2">
        {badges.map((badge) => (
          <span key={badge} className="trust-badge">
            <ShieldIcon />
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
