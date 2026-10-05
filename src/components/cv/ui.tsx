import { Phone, Mail, Download } from "lucide-react";
import { contact } from "@/content/site";
import { cn } from "@/lib/utils";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 7 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.9 9.88zm8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z" />
    </svg>
  );
}

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-md px-5 h-12 text-sm font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const btn = {
  brand: cn(base, "bg-brand text-brand-foreground hover:bg-brand/85"),
  whatsapp: cn(base, "bg-whatsapp text-background hover:bg-whatsapp/85"),
  light: cn(base, "bg-background text-navy hover:bg-surface"),
  outline: cn(base, "border border-background/70 text-background hover:bg-background/10"),
  navyOutline: cn(base, "border border-navy/20 text-navy hover:bg-surface"),
};

export function ContactButtons({ className, itemClass }: { className?: string; itemClass?: string }) {
  return (
    <div className={className}>
      <a href={contact.phoneHref} className={cn(btn.brand, itemClass)}><Phone className="size-4 fill-current" />Appeler</a>
      <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={cn(btn.whatsapp, itemClass)}><WhatsAppIcon className="size-5" />WhatsApp</a>
      <a href={`mailto:${contact.email}`} className={cn(btn.light, itemClass)}><Mail className="size-4" />Email</a>
      <a href={contact.cvUrl} download className={cn(btn.outline, itemClass)}><Download className="size-4" />Télécharger le CV</a>
    </div>
  );
}

export function SectionHead({ eyebrow, title, aside, className }: { eyebrow: string; title: string; aside?: string; className?: string }) {
  return (
    <div className={cn("mb-10 grid gap-4 md:mb-12 md:grid-cols-[1fr_auto] md:items-end", className)}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy md:text-[2rem]">{title}</h2>
      </div>
      {aside && <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-right">{aside}</p>}
    </div>
  );
}
