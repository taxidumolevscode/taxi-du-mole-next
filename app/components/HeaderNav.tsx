"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const phone = process.env.NEXT_PUBLIC_TDM_PHONE || "+33680423031";
const logoPath = process.env.NEXT_PUBLIC_TDM_LOGO_PATH || "/logo-taxi-du-mole.png";

type NavItem = {
  href: string;
  label: string;
  children?: Array<{ href: string; label: string }>;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "ACCUEIL",
    children: [
      { href: "/taxi-conventionne", label: "Taxi conventionné" },
      { href: "/transport-touristique", label: "Transport touristique" },
      { href: "/gares-ferroviaires", label: "Gares ferroviaires" },
      { href: "/station-de-ski", label: "Station de ski" },
      {
        href: "/transport-touristique-haute-savoie",
        label: "Transport touristique Haute-Savoie",
      },
      { href: "/transport-geneve", label: "Transport vers/depuis Genève" },
    ],
  },
  {
    href: "/type-de-trajet",
    label: "TYPE DE TRAJET",
    children: [
      { href: "/type-de-trajet/aeroport-gares", label: "Aéroport Genève & gares" },
      { href: "/type-de-trajet/hotel-loisirs", label: "Hôtel & loisirs" },
      { href: "/type-de-trajet/long-trajet", label: "Long trajet" },
      { href: "/type-de-trajet/stations-de-ski", label: "Stations de ski" },
      {
        href: "/type-de-trajet/prive-entreprises-scolaire",
        label: "Privé / entreprises / scolaire",
      },
    ],
  },
  { href: "/ski-transfert", label: "SKI TRANSFERT" },
  { href: "/tarifs", label: "TARIFS" },
  { href: "/reserver-en-ligne", label: "RÉSERVER EN LIGNE" },
];

export default function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5">
        <Link href="/" className="inline-flex items-center" aria-label="Accueil Taxi du Môle">
          <div className="relative h-12 w-40 sm:h-14 sm:w-44">
            <Image
              src={logoPath}
              alt="Logo Taxi du Môle"
              fill
              priority
              sizes="(min-width: 640px) 176px, 160px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`text-xs font-extrabold uppercase tracking-[0.08em] transition ${
                  isActive(item.href) ? "text-black" : "text-slate-600 hover:text-black"
                }`}
              >
                {item.label}
              </Link>

              {item.children?.length ? (
                <div className="pointer-events-none absolute left-0 top-full z-40 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-black"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            href={`tel:${phone}`}
            aria-label={`Contactez-Nous au ${phone}`}
          >
            Contactez-Nous
            <span className="sr-only">{phone}</span>
          </a>
          <Link
            className="rounded-full bg-[#ffb600] px-5 py-2 text-sm font-extrabold text-black transition hover:brightness-95"
            href="/reserver-en-ligne"
          >
            Réserver
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-800 xl:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 xl:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <div key={item.href} className="rounded-xl border border-slate-200 p-2">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm font-extrabold text-slate-900"
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="mt-1 grid gap-1 border-t border-slate-100 pt-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <a
            href={`tel:${phone}`}
            className="mt-3 block rounded-xl bg-black px-4 py-3 text-center text-sm font-bold text-white"
            onClick={() => setMenuOpen(false)}
            aria-label={`Contactez-Nous au ${phone}`}
          >
            Contactez-Nous
            <span className="sr-only">{phone}</span>
          </a>
        </div>
      )}
    </header>
  );
}
