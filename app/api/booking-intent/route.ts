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
    paymentMethod: "pay_onboard",
  });
}
