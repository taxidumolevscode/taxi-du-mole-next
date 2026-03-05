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
    label: "Accueil",
    children: [
      { href: "/taxi-conventionne", label: "Taxi CPAM" },
      { href: "/transport-touristique", label: "Tourisme" },
      { href: "/gares-ferroviaires", label: "Gares" },
      { href: "/station-de-ski", label: "Stations ski" },
      {
        href: "/transport-touristique-haute-savoie",
        label: "Haute-Savoie",
      },
      { href: "/transport-geneve", label: "Geneve" },
    ],
  },
  {
    href: "/type-de-trajet",
    label: "Trajets",
    children: [
      { href: "/type-de-trajet/aeroport-gares", label: "Aeroport & gares" },
      { href: "/type-de-trajet/hotel-loisirs", label: "Hotel & loisirs" },
      { href: "/type-de-trajet/long-trajet", label: "Long trajet" },
      { href: "/type-de-trajet/stations-de-ski", label: "Stations" },
      {
        href: "/type-de-trajet/prive-entreprises-scolaire",
        label: "Prive & pro",
      },
    ],
  },
  { href: "/ski-transfert", label: "Ski" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/reserver-en-ligne", label: "Reservation" },
  { href: "/espace-client", label: "Espace Client" },
];

export default function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
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

        <nav className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.06em] leading-none transition ${
                  isActive(item.href) ? "text-slate-950" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>

              {item.children?.length ? (
                <div className="pointer-events-none absolute left-0 top-full z-40 mt-3 w-72 rounded-2xl border border-slate-200/75 bg-white/96 p-2 opacity-0 shadow-2xl backdrop-blur group-hover:pointer-events-auto group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
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
            className="whitespace-nowrap rounded-full border border-slate-300/80 bg-white/85 px-5 py-2 text-sm font-semibold text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:bg-white"
            href={`tel:${phone}`}
            aria-label={`Contactez-Nous au ${phone}`}
          >
            Contactez-Nous
            <span className="sr-only">{phone}</span>
          </a>
          <Link
            className="rounded-full border border-amber-300/40 bg-gradient-to-r from-amber-300 to-amber-400 px-5 py-2 text-sm font-extrabold text-black shadow-[0_14px_28px_-20px_rgba(161,98,7,0.8)] transition hover:brightness-105"
            href="/reserver-en-ligne"
          >
            Réserver
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300/80 bg-white/85 text-slate-800 xl:hidden"
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
        <div className="border-t border-slate-200/75 bg-white/92 px-5 py-4 backdrop-blur-xl xl:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <div key={item.href} className="rounded-xl border border-slate-200/80 bg-white/90 p-2">
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
