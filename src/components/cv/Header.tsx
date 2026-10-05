import { useEffect, useState } from "react";
import { ChevronDown, Download, Menu, X } from "lucide-react";
import { contact, nav } from "@/content/site";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

function Logo({ compact }: { compact?: boolean }) {
  return (
    <a href="#accueil" className="flex min-w-0 items-center gap-3">
      <span className="shrink-0 text-[2rem] font-extrabold leading-none tracking-[-0.08em] text-navy">
        Y<span className="text-brand">K</span>
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[0.95rem] font-extrabold text-navy">
          YOUCEF <span className="text-brand">KHELIFI</span>
        </span>
        <span className={cn("block truncate text-[0.68rem] text-muted-foreground", compact && "text-[0.6rem]")}>
          Plombier-chauffagiste | Installateur CVC
        </span>
      </span>
    </a>
  );
}

function LangSelect() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Langue"
        className="flex h-9 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-bold text-navy hover:bg-surface"
      >
        <span aria-hidden>🇫🇷</span> FR <ChevronDown className="size-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-50 w-36 rounded-md border border-border bg-background p-1 shadow-lg">
          <button onClick={() => setOpen(false)} className="flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-sm font-semibold text-navy hover:bg-surface">
            🇫🇷 Français
          </button>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container-site grid h-[4.25rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
        <Logo />
        <nav className="hidden h-full items-center gap-7 xl:gap-9 lg:flex" aria-label="Navigation principale">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={cn(
                "relative flex h-full items-center text-[0.8rem] font-semibold text-foreground/80 transition-colors hover:text-navy",
                active === n.id && "text-navy after:absolute after:bottom-4 after:left-0 after:h-[3px] after:w-full after:bg-brand",
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <LangSelect />
          <a href={contact.cvUrl} download className={cn(btn.brand, "hidden h-10 text-xs lg:inline-flex")}>
            Télécharger le CV <Download className="size-4" />
          </a>
          <button onClick={() => setOpen(true)} className="p-1.5 text-navy lg:hidden" aria-label="Ouvrir le menu">
            <Menu className="size-7" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy lg:hidden">
          <div className="container-site flex h-[4.25rem] items-center justify-between border-b border-background/10">
            <span className="text-lg font-extrabold text-background">YOUCEF <span className="text-brand">KHELIFI</span></span>
            <button onClick={() => setOpen(false)} className="p-1.5 text-background" aria-label="Fermer le menu"><X className="size-7" /></button>
          </div>
          <nav className="container-site flex flex-1 flex-col gap-1 py-8">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className={cn("border-b border-background/10 py-4 text-xl font-bold text-background", active === n.id && "text-brand")}>
                {n.label}
              </a>
            ))}
            <a href={contact.cvUrl} download className={cn(btn.brand, "mt-8")}>Télécharger le CV <Download className="size-4" /></a>
          </nav>
        </div>
      )}
    </header>
  );
}
