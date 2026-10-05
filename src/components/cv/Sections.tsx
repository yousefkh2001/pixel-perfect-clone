import { useState } from "react";
import {
  ArrowRight, MapPin, Navigation, CalendarDays, ShieldCheck, Users, Plane, Car, Bath, Heater, Flame, Fan,
  Award, GraduationCap, Hammer, Languages, CheckCircle2, Phone, Mail, ImageIcon,
} from "lucide-react";
import { contact, hero, images, resolveImage, services, materials, tools, experience, projects, projectCategories, languages, safety } from "@/content/site";
import { ContactButtons, SectionHead, btn } from "./ui";
import { cn } from "@/lib/utils";

const serviceIcon = { plomb: Bath, chauf: Heater, gaz: Flame, clim: Fan } as const;

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-navy">
      {/* Desktop: use the uploaded wide banner exactly as a full-width hero. */}
      <div className="relative hidden lg:block">
        <img
          src={resolveImage(hero.image)}
          alt="Youcef Khelifi — Plombier-chauffagiste"
          className="block h-auto w-full object-cover"
        />
      </div>

      {/* Mobile: keep the original responsive hero composition with the original portrait photo. */}
      <div className="relative lg:hidden">
        <img
          src={resolveImage(hero.mobileImage || "hero")}
          alt="Youcef Khelifi, plombier-chauffagiste"
          className="absolute inset-x-0 top-0 h-[60%] w-full object-cover object-[70%_center]"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="container-site relative flex min-h-[640px] flex-col justify-end pb-10 pt-[46vw]">
          <span className="w-fit rounded-md border border-brand px-3 py-1 text-[0.7rem] font-extrabold tracking-wide text-brand">
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[0.95] tracking-tight text-background sm:text-6xl">
            {hero.firstName} <span className="text-brand">{hero.lastName}</span>
          </h1>
          <p className="mt-4 text-lg font-bold text-background sm:text-xl">{hero.title}</p>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-background/85">
            {hero.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-background/90 sm:flex-row sm:items-center sm:gap-5">
            <span className="flex items-center gap-2">
              <MapPin className="size-5 shrink-0 fill-brand text-navy" />{hero.location}
            </span>
            <span className="hidden h-5 w-px bg-background/40 sm:block" />
            <span className="flex items-center gap-2">
              <Navigation className="size-5 shrink-0 fill-brand text-brand" />{hero.availability}
            </span>
          </div>
          <ContactButtons className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap" itemClass="sm:min-w-[7.5rem]" />
        </div>
      </div>
    </section>
  );
}

export function QuickStrip() {
  return (
    <section id="competences" className="border-b border-border bg-background shadow-[0_8px_24px_-18px_var(--navy)]">
      <div className="container-site grid grid-cols-4 py-5 lg:py-7">
        {services.map((s, i) => {
          const Icon = serviceIcon[s.key];
          return (
            <div key={s.key} className={cn("flex flex-col items-center gap-2 px-1 text-center lg:flex-row lg:gap-5 lg:px-8 lg:text-left", i > 0 && "border-l border-border")}>
              <Icon className="size-8 shrink-0 stroke-[1.5] text-navy lg:size-10" />
              <div>
                <p className="text-[0.68rem] font-bold leading-tight text-navy sm:text-sm">{s.title}</p>
                <p className="mt-1 hidden text-xs text-muted-foreground sm:block">{s.short}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function About() {
  const stats = [
    { icon: CalendarDays, big: "7+", text: "Années d'expérience (depuis 2019)" },
    { icon: Users, big: "", text: "Particuliers, chantiers de logements, école" },
    { icon: Car, big: "", text: "Permis B, véhicule personnel" },
    { icon: Plane, big: "", text: "Disponible en Europe à partir de 2027" },
  ];
  return (
    <section id="a-propos" className="bg-surface py-16 lg:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative grid grid-cols-[2fr_1fr] gap-3">
          <img src={images.about1} alt="Youcef Khelifi au travail" loading="lazy" className="row-span-2 h-full min-h-[280px] w-full rounded-md object-cover lg:min-h-[380px]" />
          <img src={images.about2} alt="Tuyauteries" loading="lazy" className="h-full w-full rounded-md object-cover" />
          <img src={images.about3} alt="Collecteur" loading="lazy" className="h-full w-full rounded-md object-cover" />
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-md bg-background px-4 py-3 shadow-lg">
            <ShieldCheck className="size-7 text-navy" />
            <p className="text-xs font-bold leading-tight text-navy">Travail soigné<br />et durable</p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">À propos de moi</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy md:text-[2rem]">Un artisan passionné et qualifié</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Plombier-chauffagiste indépendant depuis 2019, formé au métier dès l'âge de 14 ans. Expérience en <b className="text-foreground">alimentation en eau sanitaire, évacuation, réseaux de gaz, chauffage central et climatisation split</b>, chez des particuliers, sur des chantiers de logements et dans une école.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Autonome ou en équipe, respectueux des règles de sécurité, équipé de son propre outillage et toujours soucieux d'un travail soigné et durable.
          </p>
          <a href="#experience" className={cn(btn.brand, "mt-8 h-11 w-fit")}>En savoir plus <ArrowRight className="size-4" /></a>
          <div className="mt-12 grid grid-cols-2 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className={cn("flex items-start gap-3 px-3", i % 2 && "border-l border-border", i > 0 && "sm:border-l")}>
                <s.icon className="size-7 shrink-0 text-navy" />
                <p className="text-xs leading-snug text-muted-foreground">{s.big && <b className="block text-lg font-extrabold text-navy">{s.big}</b>}{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-site">
        <SectionHead eyebrow="Mes services" title="Des solutions complètes pour vos projets" aside="Installation, entretien et dépannage en plomberie, chauffage, gaz et climatisation, pour des particuliers et des professionnels." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcon[s.key];
            return (
              <a key={s.key} href="#realisations" className="group overflow-hidden rounded-md border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
                <img src={s.img} alt={s.title} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <div className="flex items-end gap-4 p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3"><Icon className="size-6 stroke-[1.5] text-navy" /><h3 className="font-extrabold text-navy">{s.title}</h3></div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-navy transition-colors group-hover:bg-brand group-hover:border-brand"><ArrowRight className="size-4" /></span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImageRow({ items }: { items: { title: string; img: string }[] }) {
  return (
    <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
      {items.map((m) => (
        <figure key={m.title} className="w-[42%] shrink-0 snap-start overflow-hidden rounded-md border border-border bg-card shadow-sm md:w-auto">
          <img src={m.img} alt={m.title} loading="lazy" className="aspect-[5/3] w-full object-cover" />
          <figcaption className="px-3 py-3 text-center text-sm font-bold text-navy">{m.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Materials() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-site">
        <SectionHead eyebrow="Matériaux maîtrisés" title="Des matériaux adaptés à chaque projet" />
        <ImageRow items={materials} />
        <div className="mt-20">
          <SectionHead eyebrow="Outils professionnels" title="Un outillage personnel complet" />
          <ImageRow items={tools} />
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-16 lg:py-24">
      <div className="container-site">
        <SectionHead eyebrow="Parcours" title="Mon expérience professionnelle" />
        <ol className="relative grid gap-8 border-l-2 border-border pl-8 lg:grid-cols-4 lg:gap-6 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-10">
          {experience.map((e) => (
            <li key={e.period} className="relative">
              <span className="absolute -left-[2.45rem] top-1 size-4 rounded-full border-4 border-background bg-brand ring-2 ring-brand lg:-top-[3.05rem] lg:left-0" />
              <p className="text-sm font-extrabold text-brand-foreground"><span className="rounded bg-brand px-2 py-1">{e.period}</span></p>
              <h3 className="mt-4 text-lg font-extrabold leading-snug text-navy">{e.title}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-4" />{e.place}</p>
              {e.note && <p className="mt-1 text-sm text-muted-foreground">{e.note}</p>}
              {e.highlight && <p className="mt-4 rounded-md border-l-4 border-brand bg-surface p-4 text-sm font-semibold text-navy">{e.highlight}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Realisations() {
  const [cat, setCat] = useState<(typeof projectCategories)[number]>("Tous");
  const list = cat === "Tous" ? projects : projects.filter((p) => p.cats.includes(cat));
  return (
    <section id="realisations" className="bg-surface py-16 lg:py-24">
      <div className="container-site">
        <SectionHead eyebrow="Réalisations" title="Types de travaux réalisés" aside="Images illustratives — photos de chantiers à venir." />
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {projectCategories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("shrink-0 rounded-md border px-4 py-2 text-sm font-bold transition-colors", cat === c ? "border-navy bg-navy text-background" : "border-border bg-background text-navy hover:border-navy/40")}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
          {list.map((p) => (
            <figure key={p.title} className="group relative overflow-hidden rounded-md">
              <img src={p.img} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-3 pt-10 text-xs font-bold text-background md:p-5 md:text-base">{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Formation() {
  return (
    <section id="formation" className="py-16 lg:py-24">
      <div className="container-site">
        <SectionHead eyebrow="Formation & certification" title="Qualification et parcours de formation" />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-6 rounded-md border border-border p-6 shadow-sm md:grid-cols-[1fr_200px] md:p-8">
            <div>
              <Award className="size-9 text-brand" />
              <h3 className="mt-4 text-xl font-extrabold text-navy">Certificat de qualification professionnelle</h3>
              <p className="mt-1 font-bold text-foreground">Installation sanitaire et gaz</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Centre de formation professionnelle et de l'apprentissage « Chahid Rouichi Slimane »</p>
              <p className="mt-2 text-sm text-muted-foreground">Barika, Algérie · Décembre 2025</p>
              <p className="mt-4 inline-block rounded bg-surface px-3 py-1.5 text-xs font-bold text-navy">Validation des acquis de l'expérience</p>
            </div>
            {images.certificate ? (
              <img src={images.certificate} alt="Certificat" className="w-full rounded-md border border-border object-cover" />
            ) : (
              <div className="grid min-h-[200px] place-items-center rounded-md border-2 border-dashed border-border bg-surface text-center text-xs text-muted-foreground">
                <div><ImageIcon className="mx-auto mb-2 size-7" />Image du certificat</div>
              </div>
            )}
          </div>
          <div className="grid gap-6">
            <div className="flex gap-4 rounded-md border border-border p-6 shadow-sm">
              <GraduationCap className="size-8 shrink-0 text-navy" />
              <div><h3 className="font-extrabold text-navy">Enseignement secondaire</h3><p className="mt-1 text-sm text-muted-foreground">Filière Mathématiques techniques — Génie électrique</p></div>
            </div>
            <div className="flex gap-4 rounded-md border border-border p-6 shadow-sm">
              <Hammer className="size-8 shrink-0 text-navy" />
              <div><h3 className="font-extrabold text-navy">Formation pratique</h3><p className="mt-1 text-sm text-muted-foreground">Formation pratique au métier auprès de plombiers expérimentés dès l'âge de 14 ans.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LanguagesSafety() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead eyebrow="Langues & mobilité" title="Communication et déplacements" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {languages.map((l) => (
              <div key={l.name} className="rounded-md border border-border bg-background p-5">
                <Languages className="size-6 text-navy" />
                <p className="mt-3 font-extrabold text-navy">{l.name}</p>
                <p className="text-sm text-muted-foreground">{l.level}</p>
              </div>
            ))}
            <div className="rounded-md border border-border bg-background p-5">
              <Car className="size-6 text-navy" />
              <p className="mt-3 font-extrabold text-navy">Permis B</p>
              <p className="text-sm text-muted-foreground">Conduite régulière, véhicule personnel utilisé pour le travail</p>
            </div>
          </div>
        </div>
        <div>
          <SectionHead eyebrow="Sécurité" title="Sécurité & méthodes de travail" />
          <ul className="divide-y divide-border rounded-md border border-border bg-background">
            {safety.map((s) => (
              <li key={s} className="flex items-start gap-3 p-4 text-sm font-semibold text-navy"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contact" className="bg-navy py-20 lg:py-28">
      <div className="container-site text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-background md:text-5xl">Une opportunité en <span className="text-brand">Europe</span> ?</h2>
        <p className="mx-auto mt-5 max-w-xl text-background/80">Je suis motivé et prêt à rejoindre votre équipe à partir de 2027.</p>
        <ContactButtons className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center" itemClass="sm:min-w-[9rem]" />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-background/10 bg-navy py-10 text-sm text-background/70">
      <div className="container-site grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-extrabold text-background">YOUCEF <span className="text-brand">KHELIFI</span></p>
          <p className="mt-1">Plombier-chauffagiste | Installateur CVC</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-8">
          <span className="flex items-center gap-2"><MapPin className="size-4" />{contact.location}</span>
          <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-background"><Phone className="size-4" />{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-background"><Mail className="size-4" />{contact.email}</a>
        </div>
      </div>
    </footer>
  );
}
