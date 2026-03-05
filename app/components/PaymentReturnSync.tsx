"use client";

import { useEffect } from "react";
import { updateClientBookingStatus } from "../lib/client-bookings";

type PaymentReturnSyncProps = {
  reference?: string;
  status: "paid_deposit" | "awaiting_payment";
};

export default function PaymentReturnSync({ reference, status }: PaymentReturnSyncProps) {
  useEffect(() => {
    if (!reference) return;
    updateClientBookingStatus(reference, status);
  }, [reference, status]);

  return null;
}
