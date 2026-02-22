"use client";

import { useEffect, useRef, useState } from "react";

type GAddressResult = {
  formatted_address?: string;
};

type GDistanceElement = {
  status?: string;
  distance?: { value: number; text: string };
};

type GDistanceMatrixResult = {
  rows?: Array<{ elements?: GDistanceElement[] }>;
};

type GMapsGlobal = {
  maps?: {
    places?: {
      Autocomplete: new (input: HTMLInputElement) => {
        addListener: (eventName: string, handler: () => void) => void;
      };
    };
    DistanceMatrixService?: new () => {
      getDistanceMatrix: (
        request: unknown,
        callback: (response: GDistanceMatrixResult, status: string) => void
      ) => void;
    };
    Geocoder?: new () => {
      geocode: (
        request: unknown,
        callback: (results: GAddressResult[] | null, status: string) => void
      ) => void;
    };
    TravelMode?: { DRIVING: string };
    UnitSystem?: { METRIC: number | string };
  };
};

declare global {
  interface Window {
    google?: GMapsGlobal;
    __TDM_GMAPS_LOADING__?: boolean;
  }
}

const phone = process.env.NEXT_PUBLIC_TDM_PHONE || "+33680423031";
const REQUEST_TIMEOUT_MS = 9000;

function rates() {
  const h = new Date().getHours();
  return h >= 19 || h < 8
    ? { label: "Tarif Nuit", pricePerKm: 3.66, baseFare: 3 }
    : { label: "Tarif Jour", pricePerKm: 2.44, baseFare: 3 };
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout_request")), ms);
    promise
      .then((v) => {
        clearTimeout(t);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(t);
        reject(e);
      });
  });
}

function loadGoogleMaps() {
  return new Promise<void>((resolve, reject) => {
    if (
      window.google?.maps?.places &&
      window.google?.maps?.DistanceMatrixService &&
      window.google?.maps?.Geocoder
    ) {
      resolve();
      return;
    }

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key) {
      reject(new Error("missing_key"));
      return;
    }

    if (window.__TDM_GMAPS_LOADING__) {
      const start = Date.now();
      const wait = () => {
        if (
          window.google?.maps?.places &&
          window.google?.maps?.DistanceMatrixService &&
          window.google?.maps?.Geocoder
        ) {
          resolve();
          return;
        }
        if (Date.now() - start > 12000) {
          reject(new Error("timeout_loading_gmaps"));
          return;
        }
        setTimeout(wait, 150);
      };
      wait();
      return;
    }

    window.__TDM_GMAPS_LOADING__ = true;
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("load_error"));
    document.head.appendChild(s);
  });
}

function getMapsOrThrow() {
  const maps = window.google?.maps;
  if (!maps) {
    throw new Error("gmaps_unavailable");
  }
  return maps;
}

function IconOrigin() {
  return <span className="h-4 w-4 rounded-full border-2 border-black bg-white" aria-hidden="true" />;
}

function IconDestination() {
  return <span className="h-4 w-4 rounded-[4px] border-2 border-black bg-white" aria-hidden="true" />;
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M6.8 3h3L11 7.2 8.9 9.1a15.5 15.5 0 0 0 6 6l1.9-2.1L21 14.2v3c0 .8-.6 1.5-1.4 1.6A16.8 16.8 0 0 1 5.2 4.4C5.3 3.6 6 3 6.8 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M12 2 4 5.3V11c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V5.3L12 2Z" fill="currentColor" />
      <path d="m9.2 11.9 1.9 1.9 3.8-3.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Estimator() {
  const originRef = useRef<HTMLInputElement | null>(null);
  const destRef = useRef<HTMLInputElement | null>(null);

  const [gmapsReady, setGmapsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await loadGoogleMaps();
        const maps = getMapsOrThrow();

        if (!originRef.current || !destRef.current || !maps.places) return;

        new maps.places.Autocomplete(originRef.current);
        new maps.places.Autocomplete(destRef.current);

        if (mounted) {
          setGmapsReady(true);
          setOutput("Google Maps chargé");
        }
      } catch {
        if (mounted) {
          setOutput("Google Maps ne charge pas. Contactez-Nous.");
        }
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  const useCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setOutput("Géolocalisation non supportée.");
      return;
    }

    try {
      await loadGoogleMaps();
    } catch {
      setOutput("Google Maps ne charge pas.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        try {
          const maps = getMapsOrThrow();
          if (!maps.Geocoder) throw new Error("geocoder_unavailable");
          const geocoder = new maps.Geocoder();

          geocoder.geocode(
            {
              location: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              },
            },
            (res, status: string) => {
              if (status === "OK" && res?.[0]?.formatted_address && originRef.current) {
                originRef.current.value = res[0].formatted_address;
                setOutput("Position détectée");
              } else {
                setOutput("Adresse impossible à obtenir.");
              }
            }
          );
        } catch {
          setOutput("Erreur géolocalisation.");
        }
      },
      () => setOutput("Autorisation refusée."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const distanceMatrixOnce = async (origin: string, dest: string) => {
    await loadGoogleMaps();
    return new Promise<{ response: GDistanceMatrixResult; status: string }>((resolve) => {
      const maps = getMapsOrThrow();
      if (!maps.DistanceMatrixService || !maps.TravelMode || !maps.UnitSystem) {
        throw new Error("distance_matrix_unavailable");
      }
      const svc = new maps.DistanceMatrixService();
      svc.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [dest],
          travelMode: maps.TravelMode.DRIVING,
          unitSystem: maps.UnitSystem.METRIC,
        },
        (response, status: string) => resolve({ response, status })
      );
    });
  };

  const calculateFare = async () => {
    const origin = originRef.current?.value?.trim() || "";
    const dest = destRef.current?.value?.trim() || "";

    if (!origin || !dest) {
      setOutput("Merci d’indiquer une adresse de départ et une destination.");
      return;
    }

    setLoading(true);
    setOutput("Calcul en cours…");

    try {
      let dm = await withTimeout(distanceMatrixOnce(origin, dest), REQUEST_TIMEOUT_MS);

      if (dm.status === "UNKNOWN_ERROR") {
        setOutput("Nouvel essai…");
        dm = await withTimeout(distanceMatrixOnce(origin, dest), REQUEST_TIMEOUT_MS);
      }

      if (dm.status !== "OK") {
        setOutput(`Erreur Google Distance Matrix : ${dm.status}. Contactez-Nous.`);
        setLoading(false);
        return;
      }

      const el = dm.response?.rows?.[0]?.elements?.[0];
      const elStatus = el?.status;

      if (!el || elStatus !== "OK") {
        setOutput(`Itinéraire introuvable : ${elStatus || "NO_RESULT"}.`);
        setLoading(false);
        return;
      }

      if (!el.distance?.value || !el.distance?.text) {
        setOutput("Distance indisponible pour ce trajet.");
        setLoading(false);
        return;
      }

      const r = rates();
      const km = el.distance.value / 1000;
      const price = r.baseFare + km * r.pricePerKm;

      setOutput(`${r.label} • Distance : ${el.distance.text} • Tarif estimé : ${price.toFixed(2)} €`);
    } catch {
      setOutput("Aucune réponse Google. Réessayez ou Contactez-Nous.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") calculateFare();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f5f7fb] p-4">
      <div className="relative grid gap-2">
        <div className="relative flex items-center gap-2 rounded-xl bg-[#f9f9f9] px-3 py-3 ring-1 ring-slate-200">
          <IconOrigin />
          <input
            ref={originRef}
            onKeyDown={onKeyDown}
            placeholder="Lieu de prise en charge (Bonneville, Vallée de l’Arve…)"
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <button
            type="button"
            onClick={useCurrentLocation}
            className="rounded-lg p-1 text-slate-600 transition hover:bg-slate-100"
            aria-label="Utiliser ma position actuelle"
            title="Utiliser ma position actuelle"
          >
            <IconPin />
          </button>
        </div>

        <div className="pointer-events-none absolute left-[17px] top-[38px] h-[33px] w-[2px] bg-black/15" />

        <div className="flex items-center gap-2 rounded-xl bg-[#f9f9f9] px-3 py-3 ring-1 ring-slate-200">
          <IconDestination />
          <input
            ref={destRef}
            onKeyDown={onKeyDown}
            placeholder="Destination (aéroport Genève, gare, clinique…)"
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={calculateFare}
          disabled={loading || !gmapsReady}
          className="rounded-2xl bg-[#ffb600] px-5 py-3 text-base font-extrabold text-black transition hover:brightness-95 disabled:opacity-60"
        >
          {loading ? "Calcul..." : "Voir Les Prix"}
        </button>

        <a
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-base font-extrabold text-[#ffb600]"
          href={`tel:${phone}`}
          aria-label={`Contactez-Nous au ${phone}`}
        >
          <IconPhone />
          Contactez-Nous
          <span className="sr-only">{phone}</span>
        </a>
      </div>

      <div className="mt-3 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <IconShield />
          {gmapsReady ? "Google prêt" : "Chargement Google..."}
        </span>
      </div>

      <p className="mt-3 min-h-[1.2em] text-center text-base font-semibold text-slate-700">{output}</p>
    </div>
  );
}
