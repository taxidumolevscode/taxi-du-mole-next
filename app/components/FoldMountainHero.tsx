"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type FoldMountainHeroProps = {
  logoSrc: string;
  backgroundSrc: string;
  middleLayerSrc: string;
  foregroundLayerSrc: string;
  yellowMountainSrc: string;
  phone: string;
};

export default function FoldMountainHero({
  logoSrc,
  backgroundSrc,
  middleLayerSrc,
  foregroundLayerSrc,
  yellowMountainSrc,
  phone,
}: FoldMountainHeroProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(window.scrollY / 520, 1);
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const foldStyle = useMemo(
    () => ({
      transform: `translateY(${progress * 105}px) scaleY(${1 - progress * 0.2})`,
      opacity: 1 - progress * 0.45,
    }),
    [progress]
  );

  const backStyle = useMemo(
    () => ({
      transform: `translateY(${progress * -26}px) scale(${1 + progress * 0.06})`,
    }),
    [progress]
  );

  const midStyle = useMemo(
    () => ({
      transform: `translateY(${progress * 34}px) scale(${1 + progress * 0.02})`,
      opacity: 0.88 - progress * 0.2,
    }),
    [progress]
  );

  const foreStyle = useMemo(
    () => ({
      transform: `translateY(${progress * 62}px) scale(${1 + progress * 0.025})`,
    }),
    [progress]
  );

  const yellowStyle = useMemo(
    () => ({
      transform: `translateY(${progress * 48}px)`,
      opacity: 0.4 - progress * 0.18,
    }),
    [progress]
  );

  return (
    <section className="relative h-[88vh] min-h-[720px] overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0" style={backStyle}>
        <Image
          src={backgroundSrc}
          alt="Fond montagne Taxi du Môle"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0" style={midStyle}>
        <Image
          src={middleLayerSrc}
          alt="Décor montagne superposé"
          fill
          priority
          className="object-cover mix-blend-screen opacity-70"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[58%]" style={yellowStyle}>
        <Image
          src={yellowMountainSrc}
          alt="Overlay montagne jaune"
          fill
          className="object-cover opacity-60 mix-blend-multiply"
        />
      </div>

      <div className="absolute inset-x-0 bottom-[-4%] h-[58%]" style={foreStyle}>
        <Image
          src={foregroundLayerSrc}
          alt="Premier plan montagne"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-black/28 to-black/52" />

      <div className="pointer-events-none absolute -top-20 left-[-10%] h-64 w-[48%] rounded-[100%] bg-[#ffb600]/14 blur-3xl" />
      <div className="pointer-events-none absolute top-[20%] right-[-12%] h-72 w-[52%] rounded-[100%] bg-[#ffb600]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[18%] left-[6%] h-44 w-[60%] rounded-[100%] bg-[#ffb600]/8 blur-[70px]" />
      <div className="pointer-events-none absolute bottom-[22%] left-[14%] h-24 w-[66%] rounded-[100%] bg-white/14 blur-[58px]" />
      <div className="pointer-events-none absolute bottom-[16%] right-[8%] h-20 w-[42%] rounded-[100%] bg-[#ffb600]/10 blur-[48px]" />

      <div className="absolute left-5 top-6 z-20 rounded-2xl bg-white/20 p-2 backdrop-blur-sm ring-1 ring-white/35">
        <Image src={logoSrc} alt="Logo Taxi Du Môle" width={130} height={98} className="h-auto w-[110px] object-contain sm:w-[130px]" />
      </div>

      <div className="absolute bottom-28 left-1/2 z-20 w-[min(92vw,860px)] -translate-x-1/2 text-center text-white">
        <h1 className="text-4xl font-black uppercase leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
          Taxi À Bonneville 74130
          <br />
          Transferts Haute-Savoie & Genève
        </h1>

        <div className="mx-auto mt-8 flex w-full max-w-[520px] flex-col gap-3">
          <a
            href={`tel:${phone}`}
            className="rounded-3xl bg-black/85 px-6 py-4 text-lg font-extrabold text-[#ffb600] ring-1 ring-white/20 backdrop-blur"
            aria-label={`Contactez-Nous au ${phone}`}
          >
            Contactez-Nous
            <span className="sr-only">{phone}</span>
          </a>
          <Link
            href="/reserver-en-ligne"
            className="rounded-3xl bg-[#ffb600] px-6 py-4 text-lg font-extrabold uppercase text-black transition hover:brightness-95"
          >
            Réserver En Ligne
          </Link>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-10 h-[52%] origin-top bg-[linear-gradient(to_bottom,rgba(255,255,255,.02)_0%,rgba(255,255,255,.45)_28%,rgba(255,255,255,.92)_62%,#ffffff_100%)]"
        style={foldStyle}
      />
    </section>
  );
}
