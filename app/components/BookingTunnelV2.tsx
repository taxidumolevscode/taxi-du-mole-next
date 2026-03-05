"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { type ClientBookingRecord, type PaymentMethod, upsertClientBooking } from "../lib/client-bookings";

type WizardData = {
  tripType: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  passengers: string;
  luggage: string;
  notes: string;
  paymentMethod: PaymentMethod;
};

const initialState: WizardData = {
  tripType: "aeroport_gares",
  pickup: "",
  destination: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  passengers: "1",
  luggage: "0",
  notes: "",
  paymentMethod: "pay_onboard",
};

const stepLabels = [
  "Trajet",
  "Passager",
  "Paiement",
];

const depositAmount = Number(process.env.NEXT_PUBLIC_TDM_DEPOSIT_EUR || "30");

export default function BookingTunnelV2() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successPayload, setSuccessPayload] = useState<{ reference: string; accessCode: string } | null>(null);

  const completion = useMemo(() => Math.round((step / 3) * 100), [step]);

  const updateValue =
    (key: keyof WizardData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const canGoStep2 =
    data.tripType.trim() &&
    data.pickup.trim() &&
    data.destination.trim() &&
    data.date.trim() &&
    data.time.trim();

  const canGoStep3 =
    canGoStep2 &&
    data.name.trim() &&
    data.email.trim() &&
    data.phone.trim() &&
    data.passengers.trim();

  const nextStep = () => {
    if (step === 1 && !canGoStep2) return;
    if (step === 2 && !canGoStep3) return;
    setStep((prev) => Math.min(3, prev + 1));
  };

  const previousStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canGoStep3) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/booking-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json()) as {
        ok?: boolean;
        error?: string;
        reference?: string;
        accessCode?: string;
        paymentMethod?: PaymentMethod;
        checkoutUrl?: string;
      };

      if (!res.ok || !payload.reference || !payload.accessCode) {
        throw new Error(payload.error || "Erreur de création de réservation.");
      }

      const record: ClientBookingRecord = {
        reference: payload.reference,
        accessCode: payload.accessCode,
        createdAt: new Date().toISOString(),
        status: payload.paymentMethod === "online_deposit" ? "awaiting_payment" : "pending",
        paymentMethod: data.paymentMethod,
        tripType: data.tripType,
        pickup: data.pickup,
        destination: data.destination,
        date: data.date,
        time: data.time,
        name: data.name,
        email: data.email,
        phone: data.phone,
        passengers: data.passengers,
        luggage: data.luggage,
        notes: data.notes,
      };

      upsertClientBooking(record);
      setSuccessPayload({ reference: payload.reference, accessCode: payload.accessCode });

      if (payload.paymentMethod === "online_deposit" && payload.checkoutUrl) {
        window.location.href = payload.checkoutUrl;
        return;
      }

      setStatus("success");
      setData(initialState);
      setStep(1);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Erreur réseau.");
    }
  };

  return (
    <div className="neo-card rounded-3xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-slate-900">Tunnel Réservation V2</h2>
        <span className="template-label">3 étapes</span>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
          <span>Progression</span>
          <span>{completion}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-200">
          <div className="h-2 rounded-full bg-[#ffb600] transition-all duration-300" style={{ width: `${completion}%` }} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-extrabold uppercase tracking-[0.08em]">
          {stepLabels.map((label, index) => (
            <div
              key={label}
              className={`rounded-xl border px-2 py-2 ${
                index + 1 <= step ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        {step === 1 && (
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-950">1. Détails du trajet</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Type de trajet</label>
                <select className="input mt-1" value={data.tripType} onChange={updateValue("tripType")}>
                  <option value="aeroport_gares">Aéroport / Gares</option>
                  <option value="station_ski">Station de ski</option>
                  <option value="longue_distance">Long trajet</option>
                  <option value="business">Pro / Entreprise</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Date</label>
                  <input className="input mt-1" type="date" value={data.date} onChange={updateValue("date")} required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Heure</label>
                  <input className="input mt-1" type="time" value={data.time} onChange={updateValue("time")} required />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Adresse de départ</label>
              <input className="input mt-1" value={data.pickup} onChange={updateValue("pickup")} required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Destination</label>
              <input className="input mt-1" value={data.destination} onChange={updateValue("destination")} required />
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-950">2. Informations passager</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Nom / Prénom</label>
                <input className="input mt-1" value={data.name} onChange={updateValue("name")} required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Téléphone</label>
                <input className="input mt-1" value={data.phone} onChange={updateValue("phone")} required />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Email</label>
              <input className="input mt-1" type="email" value={data.email} onChange={updateValue("email")} required />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Passagers</label>
                <input className="input mt-1" type="number" min={1} max={8} value={data.passengers} onChange={updateValue("passengers")} required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Bagages</label>
                <input className="input mt-1" type="number" min={0} max={16} value={data.luggage} onChange={updateValue("luggage")} />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Informations complémentaires</label>
              <textarea className="textarea mt-1" value={data.notes} onChange={updateValue("notes")} />
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-950">3. Confirmation & paiement</h3>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p><strong>Trajet:</strong> {data.pickup} {"->"} {data.destination}</p>
              <p><strong>Date:</strong> {data.date} à {data.time}</p>
              <p><strong>Client:</strong> {data.name} ({data.email})</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className={`cursor-pointer rounded-2xl border p-4 ${data.paymentMethod === "online_deposit" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"}`}>
                <input
                  type="radio"
                  className="sr-only"
                  checked={data.paymentMethod === "online_deposit"}
                  onChange={() => setData((prev) => ({ ...prev, paymentMethod: "online_deposit" }))}
                />
                <p className="text-sm font-black uppercase">Acompte en ligne</p>
                <p className="mt-1 text-sm">
                  Paiement sécurisé Stripe ({depositAmount} EUR), confirmation immédiate.
                </p>
              </label>

              <label className={`cursor-pointer rounded-2xl border p-4 ${data.paymentMethod === "pay_onboard" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"}`}>
                <input
                  type="radio"
                  className="sr-only"
                  checked={data.paymentMethod === "pay_onboard"}
                  onChange={() => setData((prev) => ({ ...prev, paymentMethod: "pay_onboard" }))}
                />
                <p className="text-sm font-black uppercase">Paiement à bord</p>
                <p className="mt-1 text-sm">
                  Validation de votre demande puis règlement au moment du trajet.
                </p>
              </label>
            </div>
          </section>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={previousStep}
            disabled={step === 1 || status === "loading"}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-800 disabled:opacity-50"
          >
            Retour
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={(step === 1 && !canGoStep2) || (step === 2 && !canGoStep3)}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50"
            >
              Étape suivante
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-[#ffb600] px-5 py-3 text-sm font-extrabold text-black disabled:opacity-50"
            >
              {status === "loading"
                ? "Traitement..."
                : data.paymentMethod === "online_deposit"
                ? "Payer l'acompte"
                : "Valider la réservation"}
            </button>
          )}
        </div>
      </form>

      {status === "success" && successPayload && (
        <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-50 p-4 text-sm text-emerald-900">
          Réservation créée. Référence: <strong>{successPayload.reference}</strong> • Code client: <strong>{successPayload.accessCode}</strong>
          <div className="mt-2">
            <Link href="/espace-client" className="font-extrabold underline">Accéder à l&apos;espace client</Link>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-2xl border border-red-500/40 bg-red-50 p-4 text-sm text-red-900">
          {errorMessage || "Impossible de finaliser la réservation."}
        </div>
      )}
    </div>
  );
}
