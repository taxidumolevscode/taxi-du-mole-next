"use client";

export type PaymentMethod = "online_deposit" | "pay_onboard";
export type BookingStatus = "pending" | "awaiting_payment" | "paid_deposit" | "confirmed" | "cancelled";

export type ClientBookingRecord = {
  reference: string;
  accessCode: string;
  createdAt: string;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
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
};

const STORAGE_KEY = "tdm_client_bookings_v2";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getClientBookings(): ClientBookingRecord[] {
  if (!canUseStorage()) return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as ClientBookingRecord[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => entry && typeof entry.reference === "string");
  } catch {
    return [];
  }
}

function setClientBookings(records: ClientBookingRecord[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function upsertClientBooking(record: ClientBookingRecord) {
  const current = getClientBookings();
  const withoutCurrent = current.filter((item) => item.reference !== record.reference);
  const next = [record, ...withoutCurrent].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  setClientBookings(next);
}

export function updateClientBookingStatus(reference: string, status: BookingStatus) {
  const current = getClientBookings();
  const next = current.map((item) => {
    if (item.reference !== reference) return item;
    return { ...item, status };
  });
  setClientBookings(next);
}
