import { NextResponse } from "next/server";
import Stripe from "stripe";

type BookingIntentPayload = {
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
  paymentMethod: "online_deposit" | "pay_onboard";
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const depositAmount = Number(process.env.NEXT_PUBLIC_TDM_DEPOSIT_EUR || "30");
const reservationEndpoint =
  process.env.RESERVATION_ENDPOINT || process.env.NEXT_PUBLIC_RESERVATION_ENDPOINT || "";

function buildReference() {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  const stamp = Date.now().toString(36).toUpperCase();
  return `TDM-${stamp}-${rand}`;
}

function buildAccessCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function getMissingFields(payload: Partial<BookingIntentPayload>) {
  const required: Array<keyof BookingIntentPayload> = [
    "tripType",
    "pickup",
    "destination",
    "date",
    "time",
    "name",
    "email",
    "phone",
    "passengers",
    "paymentMethod",
  ];

  return required.filter((field) => !String(payload[field] || "").trim());
}

function buildEmailSubject(payload: BookingIntentPayload, reference: string) {
  return `Nouvelle Réservation V2 - ${reference} - ${payload.name || "Client"}`;
}

function buildEmailHtml(payload: BookingIntentPayload, reference: string, accessCode: string) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#111827;width:38%;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;">${value || "-"}</td>
    </tr>
  `;

  return `
  <div style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:22px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="680" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#111827;padding:22px;border-bottom:4px solid #ffb600;">
                <h1 style="margin:0;color:#ffffff;font-size:24px;">Taxi Du Môle - Réservation V2</h1>
                <p style="margin:8px 0 0 0;color:#d1d5db;font-size:13px;">Référence ${reference} • Code client ${accessCode}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                  ${row("Référence", reference)}
                  ${row("Code client", accessCode)}
                  ${row("Mode paiement", payload.paymentMethod === "online_deposit" ? "Acompte en ligne" : "Paiement à bord")}
                  ${row("Nom", payload.name)}
                  ${row("Téléphone", payload.phone)}
                  ${row("Email", payload.email)}
                  ${row("Type trajet", payload.tripType)}
                  ${row("Départ", payload.pickup)}
                  ${row("Destination", payload.destination)}
                  ${row("Date", payload.date)}
                  ${row("Heure", payload.time)}
                  ${row("Passagers", payload.passengers)}
                  ${row("Bagages", payload.luggage)}
                  ${row("Notes", payload.notes)}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

async function sendReservationNotification(
  payload: BookingIntentPayload,
  reference: string,
  accessCode: string
) {
  if (!reservationEndpoint) return false;

  try {
    const body = new FormData();
    body.append("name", payload.name);
    body.append("phone", payload.phone);
    body.append("email", payload.email);
    body.append("date", payload.date);
    body.append("time", payload.time);
    body.append("pickup", payload.pickup);
    body.append("destination", payload.destination);
    body.append("infos", payload.notes || "");
    body.append("trip_type", payload.tripType);
    body.append("passengers", payload.passengers);
    body.append("luggage", payload.luggage);
    body.append("payment_method", payload.paymentMethod);
    body.append("booking_reference", reference);
    body.append("booking_access_code", accessCode);
    body.append("email_subject", buildEmailSubject(payload, reference));
    body.append("email_html", buildEmailHtml(payload, reference, accessCode));

    await fetch(reservationEndpoint, {
      method: "POST",
      body,
      redirect: "follow",
    });
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let payload: BookingIntentPayload;
  try {
    payload = (await req.json()) as BookingIntentPayload;
  } catch {
    return NextResponse.json({ error: "Payload JSON invalide." }, { status: 400 });
  }

  const missingFields = getMissingFields(payload);
  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Champs manquants: ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  const reference = buildReference();
  const accessCode = buildAccessCode();
  const notificationSent = await sendReservationNotification(payload, reference, accessCode);

  if (payload.paymentMethod === "online_deposit") {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY manquant. Configure la clé Stripe côté serveur." },
        { status: 503 }
      );
    }

    try {
      const stripe = new Stripe(stripeKey);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: payload.email,
        success_url: `${siteUrl}/reservation/success?ref=${encodeURIComponent(reference)}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/reservation/cancel?ref=${encodeURIComponent(reference)}`,
        metadata: {
          booking_reference: reference,
          booking_access_code: accessCode,
          pickup: payload.pickup,
          destination: payload.destination,
          date: payload.date,
          time: payload.time,
          customer_name: payload.name,
          customer_email: payload.email,
          customer_phone: payload.phone,
        },
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "eur",
              unit_amount: Math.round(Math.max(10, depositAmount) * 100),
              product_data: {
                name: `Acompte Réservation Taxi - ${reference}`,
                description: `${payload.pickup} -> ${payload.destination}`,
              },
            },
          },
        ],
      });

      return NextResponse.json({
        ok: true,
        reference,
        accessCode,
        notificationSent,
        paymentMethod: "online_deposit",
        checkoutUrl: session.url,
      });
    } catch {
      return NextResponse.json(
        { error: "Impossible de créer la session Stripe. Vérifie ta configuration." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    reference,
    accessCode,
    notificationSent,
    paymentMethod: "pay_onboard",
  });
}
