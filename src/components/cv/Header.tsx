import { useEffect, useState } from "react";
import { ChevronDown, Download, Menu, X } from "lucide-react";
import { contact, header, nav } from "@/content/site";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

function Logo() {
  const [first, ...rest] = header.name.split(" ");
  const last = rest.join(" ");

  return (
    <a href="#accueil" className="flex min-w-0 items-center gap-3">
      <span className="shrink-0 text-[2rem] font-extrabold leading-none tracking-[-0.08em] text-navy">
        Y<span className="text-brand">K</span>
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[0.95rem] font-extrabold text-navy">
          {first} {last && <span className="text-brand">{last}</span>}
        </span>
        <span className="block truncate text-[0.68rem] text-muted-foreground">
          {header.professionalTitle}
        </span>
      </span>
    </a>
  );
}

const languages = [
  ["fr", "🇫🇷", "Français"],
  ["en", "🇬🇧", "English"],
  ["es", "🇪🇸", "Español"],
  ["it", "🇮🇹", "Italiano"],
] as const;

function LangSelect() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("yk-language");
    if (stored && languages.some(([code]) => code === stored)) setLanguage(stored);
  }, []);

  const current = languages.find(([code]) => code === language) ?? languages[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Langue"
        className="flex h-9 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-bold text-navy hover:bg-surface"
      >
        <span aria-hidden>{current[1]}</span>
        <span>{current[0].toUpperCase()}</span>
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-36 rounded-md border border-border bg-background p-1 shadow-lg">
          {languages.map(([code, flag, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setLanguage(code);
                window.localStorage.setItem("yk-language", code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-sm font-semibold text-navy hover:bg-surface",
                language === code && "bg-surface",
              )}
            >
              <span aria-hidden>{flag}</span>
              <span>{label}</span>
              {language === code && <span className="ml-auto text-brand">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    const elements = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container-site grid h-[4.25rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
        <Logo />

        <nav className="hidden h-full items-center gap-7 xl:gap-9 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "relative flex h-full items-center text-[0.8rem] font-semibold text-foreground/80 transition-colors hover:text-navy",
                active === item.id &&
                  "text-navy after:absolute after:bottom-4 after:left-0 after:h-[3px] after:w-full after:bg-brand",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LangSelect />

          <a
            href={header.cvUrl || contact.cvUrl || "#"}
            download={Boolean(header.cvUrl || contact.cvUrl)}
            className={cn(btn.brand, "hidden h-10 text-xs lg:inline-flex")}
          >
            Télécharger le CV
            <Download className="size-4" />
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="p-1.5 text-navy lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-7" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy lg:hidden">
          <div className="container-site flex h-[4.25rem] items-center justify-between border-b border-background/10">
            <span className="text-lg font-extrabold text-background">
              YOUCEF <span className="text-brand">KHELIFI</span>
            </span>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 text-background"
              aria-label="Fermer le menu"
            >
              <X className="size-7" />
            </button>
          </div>

          <nav className="container-site flex flex-1 flex-col gap-1 py-8">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-background/10 py-4 text-xl font-bold text-background",
                  active === item.id && "text-brand",
                )}
              >
                {item.label}
              </a>
            ))}

            <a
              href={header.cvUrl || contact.cvUrl || "#"}
              download={Boolean(header.cvUrl || contact.cvUrl)}
              className={cn(btn.brand, "mt-8")}
            >
              Télécharger le CV
              <Download className="size-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
