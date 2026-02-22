export default function TemplateTrustLabel() {
  return (
    <div className="template-trust-wrap" aria-label="Trust badge validation">
      <svg viewBox="0 0 120 120" className="template-trust-seal" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="sealGrad" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#7ef05f" />
            <stop offset="100%" stopColor="#19a327" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="54" fill="#1aa329" />
        <circle cx="60" cy="60" r="47" fill="none" stroke="#d7ffd5" strokeWidth="4" />
        <circle cx="60" cy="60" r="33" fill="url(#sealGrad)" stroke="#12861f" strokeWidth="3" />
        <path
          d="M46 62l8 8 20-20"
          fill="none"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div>
        <p className="template-label is-brand">Trust Badge</p>
        <p className="template-trust-text">Validation Verifiee</p>
      </div>
    </div>
  );
}
