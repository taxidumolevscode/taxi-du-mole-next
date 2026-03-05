"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getClientBookings, type ClientBookingRecord } from "../lib/client-bookings";

function formatStatus(status: ClientBookingRecord["status"]) {
  if (status === "paid_deposit") return "Acompte payé";
  if (status === "awaiting_payment") return "Paiement en attente";
  if (status === "confirmed") return "Confirmée";
  if (status === "cancelled") return "Annulée";
  return "Demande reçue";
}

export default function ClientSpacePanel() {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [bookings, setBookings] = useState<ClientBookingRecord[]>(() => getClientBookings());

  const filtered = useMemo(() => {
    return bookings.filter((item) => {
      const byEmail = email.trim() ? item.email.toLowerCase() === email.trim().toLowerCase() : true;
      const byRef = reference.trim() ? item.reference.toLowerCase() === reference.trim().toLowerCase() : true;
      return byEmail && byRef;
    });
  }, [bookings, email, reference]);

  const refresh = () => {
    setBookings(getClientBookings());
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-2xl font-black text-slate-950">Retrouver une réservation</h2>
        <p className="mt-2 text-sm text-slate-600">
          Saisis ton email et/ou ta référence (ex: TDM-XXXX). Les données sont disponibles sur cet appareil.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            placeholder="Référence"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <button
            type="button"
            onClick={refresh}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-900"
          >
            Actualiser
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
            Aucune réservation trouvée.
            <div className="mt-3">
              <Link href="/reserver-en-ligne" className="font-extrabold text-slate-900 underline">
                Créer une réservation
              </Link>
            </div>
          </div>
        ) : (
          filtered.map((item) => (
            <article key={item.reference} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-black uppercase tracking-[0.08em] text-slate-500">{item.reference}</p>
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-extrabold uppercase text-slate-800">
                  {formatStatus(item.status)}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700"><strong>Trajet:</strong> {item.pickup} {"->"} {item.destination}</p>
              <p className="mt-1 text-sm text-slate-700"><strong>Date:</strong> {item.date} à {item.time}</p>
              <p className="mt-1 text-sm text-slate-700"><strong>Client:</strong> {item.name} ({item.phone})</p>
              <p className="mt-1 text-sm text-slate-700"><strong>Email:</strong> {item.email}</p>
              <p className="mt-1 text-sm text-slate-700"><strong>Code client:</strong> {item.accessCode}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
