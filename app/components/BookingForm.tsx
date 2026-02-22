"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  infos: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  pickup: "",
  destination: "",
  infos: "",
};

function buildCalendarLink(data: FormState) {
  const title = encodeURIComponent("Réservation Taxi du Môle");
  const start = new Date(`${data.date}T${data.time}`);
  const end = new Date(start.getTime() + 30 * 60000);

  const format = (d: Date) =>
    d.getUTCFullYear() +
    String(d.getUTCMonth() + 1).padStart(2, "0") +
    String(d.getUTCDate()).padStart(2, "0") +
    "T" +
    String(d.getUTCHours()).padStart(2, "0") +
    String(d.getUTCMinutes()).padStart(2, "0") +
    "00Z";

  return (
    "https://www.google.com/calendar/render?action=TEMPLATE" +
    "&text=" +
    title +
    "&dates=" +
    format(start) +
    "/" +
    format(end) +
    "&details=" +
    encodeURIComponent(
      "Départ : " + (data.pickup || "") + "\nDestination : " + (data.destination || "")
    ) +
    "&location=" +
    encodeURIComponent(data.pickup || "")
  );
}

function buildEmailSubject(data: FormState) {
  return `Nouvelle Réservation - Taxi Du Môle - ${data.name || "Client"}`;
}

function buildEmailHtml(data: FormState) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 14px;border-bottom:1px solid #f1f5f9;font-weight:700;color:#111827;width:34%;">${label}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #f1f5f9;color:#111827;">${value || "-"}</td>
    </tr>
  `;

  return `
  <div style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:20px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="680" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="background:#111111;padding:24px 26px;border-bottom:4px solid #ffb600;">
                <div style="display:inline-block;padding:6px 12px;background:rgba(255,182,0,.2);color:#ffb600;border-radius:999px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">Nouvelle Réservation</div>
                <h1 style="margin:12px 0 0 0;color:#ffffff;font-size:30px;line-height:1.1;">Taxi Du Môle</h1>
                <p style="margin:8px 0 0 0;color:#d1d5db;font-size:14px;">Notification Automatique Depuis Le Formulaire Web</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 22px 2px 22px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                  ${row("Nom", data.name)}
                  ${row("Téléphone", data.phone)}
                  ${row("Email", data.email)}
                  ${row("Date De Départ", data.date)}
                  ${row("Heure", data.time)}
                  ${row("Adresse De Prise En Charge", data.pickup)}
                  ${row("Destination", data.destination)}
                  ${row("Informations", data.infos)}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 22px 24px 22px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #fde68a;background:#fffbeb;border-radius:12px;">
                  <tr>
                    <td style="padding:12px 14px;font-size:13px;color:#78350f;">
                      Réservation envoyée automatiquement depuis le site. Merci de confirmer le trajet au client.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M12 2 4 5.3V11c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V5.3L12 2Z" fill="currentColor" />
      <path d="m9.2 11.9 1.9 1.9 3.8-3.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BookingForm() {
  const ENDPOINT = process.env.NEXT_PUBLIC_RESERVATION_ENDPOINT || "";

  const [data, setData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const requiredValues = [
    data.name,
    data.phone,
    data.email,
    data.date,
    data.time,
    data.pickup,
    data.destination,
  ];

  const completed = requiredValues.filter((v) => v.trim().length > 0).length;
  const progress = Math.round((completed / requiredValues.length) * 100);

  const calendarLink = useMemo(() => (status === "success" ? buildCalendarLink(data) : "#"), [status, data]);

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((s) => ({ ...s, [key]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!ENDPOINT) {
      setStatus("error");
      return;
    }

    try {
      const body = new URLSearchParams();
      Object.entries(data).forEach(([k, v]) => body.append(k, v));

      body.append("email_subject", buildEmailSubject(data));
      body.append("email_html", buildEmailHtml(data));

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: body.toString(),
      });

      if (!res.ok) throw new Error("Bad response");
      setStatus("success");
      setData(initialState);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="neo-card rounded-3xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-slate-900">Réserver Votre Taxi</h2>
        <span className="template-label is-brand">Formulaire Premium</span>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-[#ffb600] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "Saisie Rapide",
          "Confirmation Immédiate",
          "Support Téléphone",
          "Paiement Moderne",
        ].map((b) => (
          <span key={b} className="trust-badge">
            <CheckIcon />
            {b}
          </span>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Nom / Prénom</label>
            <input className="input mt-1" value={data.name} onChange={onChange("name")} required />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Téléphone</label>
            <input className="input mt-1" value={data.phone} onChange={onChange("phone")} required />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Email</label>
            <input className="input mt-1" type="email" value={data.email} onChange={onChange("email")} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Date</label>
              <input className="input mt-1" type="date" value={data.date} onChange={onChange("date")} required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Heure</label>
              <input className="input mt-1" type="time" value={data.time} onChange={onChange("time")} required />
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Adresse De Prise En Charge</label>
            <input className="input mt-1" value={data.pickup} onChange={onChange("pickup")} required />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Destination</label>
            <input className="input mt-1" value={data.destination} onChange={onChange("destination")} required />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Informations Complémentaires</label>
            <textarea className="textarea mt-1" value={data.infos} onChange={onChange("infos")} />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-2xl bg-[#FFB600] py-4 text-base font-extrabold text-black transition hover:brightness-95 disabled:opacity-60"
        >
          {status === "loading" ? "Envoi En Cours…" : "Envoyer La Réservation"}
        </button>
      </form>

      <div className="mt-4 min-h-[96px] space-y-2">
        {status === "success" && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-900">
            Réservation envoyée avec succès. Confirmation en cours.
            <div className="mt-3">
              <a
                href={calendarLink}
                target="_blank"
                rel="noopener"
                className="inline-block rounded-xl bg-[#049DE1] px-5 py-3 text-sm font-extrabold text-white"
              >
                Ajouter À Google Agenda
              </a>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-900">
            Erreur lors de l’envoi. Vérifie ton ENDPOINT dans `.env.local`.
          </div>
        )}

        {status === "idle" && (
          <p className="text-center text-xs text-slate-500">
            Le formulaire envoie aussi un template HTML premium pour Gmail via `email_html`.
          </p>
        )}
      </div>
    </div>
  );
}
