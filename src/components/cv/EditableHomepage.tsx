import { useState } from "react";
import {
  ArrowRight,
  Award,
  Bath,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronRight,
  Fan,
  Flame,
  GraduationCap,
  Hammer,
  Languages,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { Header as SiteHeader } from "@/components/cv/Header";
import { cn } from "@/lib/utils";
import {
  contact,
  resolveImage,
  sectionOrder,
} from "@/content/site";
import pageContent from "@/content/published-page.json";

type EditableContent = typeof pageContent & {
  textSections?: Array<{
    eyebrow?: string;
    title?: string;
    text?: string;
  }>;
};

type PreviewProps = {
  data?: EditableContent;
};

const icons = {
  bath: Bath,
  heater: Wrench,
  flame: Flame,
  fan: Fan,
  wrench: Wrench,
} as const;

function SiteFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-full bg-background text-foreground", className)}>
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow?: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-[2.35rem]">
          {title}
        </h2>
      </div>
      {aside && (
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {aside}
        </p>
      )}
    </div>
  );
}

function ContactLinks({
  phone,
  whatsapp,
  email,
  cvUrl,
}: {
  phone: string;
  whatsapp: string;
  email: string;
  cvUrl: string;
}) {
  const phoneHref = "tel:" + String(phone).replace(/\s+/g, "");
  const whatsappHref = "https://wa.me/" + String(whatsapp).replace(/\D/g, "");

  return (
    <div className="flex flex-wrap gap-2.5">
      <a
        href={phoneHref}
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-brand px-4 text-xs font-extrabold text-foreground"
      >
        <Phone className="size-4" />
        Appeler
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-xs font-extrabold text-white"
      >
        WhatsApp
      </a>
      <a
        href={"mailto:" + email}
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-background px-4 text-xs font-extrabold text-navy"
      >
        <Mail className="size-4" />
        Email
      </a>
      <a
        href={cvUrl || "#"}
        download={Boolean(cvUrl && cvUrl !== "#")}
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-background/60 px-4 text-xs font-extrabold text-background"
      >
        Télécharger le CV
      </a>
    </div>
  );
}

function DynamicHero({ data }: { data: EditableContent }) {
  const hero = data.hero;

  return (
    <section id="accueil" className="relative overflow-hidden bg-navy">
      <img
        src={resolveImage(hero.mobileImage || hero.image)}
        alt="Youcef Khelifi, plombier-chauffagiste"
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] lg:hidden"
      />
      <div className="hero-overlay absolute inset-0 lg:hidden" />

      <div className="relative lg:grid lg:min-h-[560px] lg:grid-cols-[46fr_54fr]">
        <div className="container-site flex flex-col justify-end pb-10 pt-[55vw] sm:pt-[45vw] lg:justify-center lg:py-16 lg:pr-10">
          <span className="w-fit rounded-md border border-brand px-3 py-1 text-[0.7rem] font-extrabold tracking-wide text-brand">
            {hero.eyebrow}
          </span>

          <h1 className="mt-5 text-[2.7rem] font-extrabold leading-[0.92] tracking-tight text-background sm:text-6xl xl:text-7xl">
            {hero.firstName} <span className="text-brand">{hero.lastName}</span>
          </h1>

          <p className="mt-4 text-lg font-bold text-background sm:text-xl xl:text-2xl">
            {hero.title}
          </p>

          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-background/85">
            {hero.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-background/90 sm:flex-row sm:items-center sm:gap-5">
            <span className="flex items-center gap-2">
              <MapPin className="size-5 shrink-0 fill-brand text-navy" />
              {hero.location}
            </span>
            <span className="hidden h-5 w-px bg-background/40 sm:block" />
            <span className="flex items-center gap-2">
              <ChevronRight className="size-5 shrink-0 text-brand" />
              {hero.availability}
            </span>
          </div>

          <div className="mt-8">
            <ContactLinks
              phone={hero.phone}
              whatsapp={hero.whatsapp}
              email={hero.email}
              cvUrl={hero.cvUrl}
            />
          </div>
        </div>

        <div className="relative hidden min-h-[560px] lg:block">
          <img
            src={resolveImage(hero.image)}
            alt="Youcef Khelifi dans une chaufferie"
            className="absolute inset-0 h-full w-full object-cover object-[35%_center]"
          />
          <div className="hero-fade absolute inset-0" />

          <div className="absolute bottom-8 right-8 flex items-center gap-3 rounded-md bg-background px-5 py-4 shadow-xl">
            <CalendarDays className="size-7 text-navy" />
            <p className="text-sm leading-tight text-navy">
              <b className="text-base font-extrabold">{hero.experienceNumber}</b>{" "}
              {hero.experienceLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStrip({ data }: { data: EditableContent }) {
  return (
    <section id="competences" className="border-b border-border bg-background shadow-[0_8px_24px_-18px_var(--navy)]">
      <div className="container-site grid grid-cols-2 py-5 sm:grid-cols-4 lg:py-7">
        {(data.services ?? []).slice(0, 4).map((service, index) => {
          const Icon = icons[service.icon as keyof typeof icons] ?? Wrench;
          return (
            <div
              key={service.key || index}
              className={cn(
                "flex flex-col items-center gap-2 px-3 text-center sm:px-1 lg:flex-row lg:gap-5 lg:px-8 lg:text-left",
                index % 2 === 1 && "border-l border-border",
                index > 1 && "sm:border-l",
              )}
            >
              <Icon className="size-8 shrink-0 stroke-[1.5] text-navy lg:size-10" />
              <div>
                <p className="text-[0.68rem] font-bold leading-tight text-navy sm:text-sm">
                  {service.title}
                </p>
                <p className="mt-1 hidden text-xs text-muted-foreground sm:block">
                  {service.short}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DynamicAbout({ data }: { data: EditableContent }) {
  const about = data.about;
  return (
    <section id="a-propos" className="bg-surface py-16 lg:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative grid grid-cols-[2fr_1fr] gap-3">
          <img src={resolveImage(about.image1)} alt="Youcef Khelifi au travail" loading="lazy" className="row-span-2 h-full min-h-[300px] w-full rounded-md object-cover lg:min-h-[390px]" />
          <img src={resolveImage(about.image2)} alt="Tuyauteries" loading="lazy" className="h-full w-full rounded-md object-cover" />
          <img src={resolveImage(about.image3)} alt="Collecteur" loading="lazy" className="h-full w-full rounded-md object-cover" />
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-md bg-background px-4 py-3 shadow-lg">
            <ShieldCheck className="size-7 text-navy" />
            <p className="text-xs font-bold leading-tight text-navy">
              Travail soigné
              <br />
              et durable
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy md:text-[2rem]">
            {about.title}
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {about.text1}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {about.text2}
          </p>

          <a
            href="#experience"
            className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-md bg-brand px-5 text-xs font-extrabold text-foreground"
          >
            En savoir plus
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function DynamicServices({ data }: { data: EditableContent }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Mes services"
          title="Des solutions complètes pour vos projets"
          aside="Installation, entretien et dépannage en plomberie, chauffage, gaz et climatisation, pour des particuliers et des professionnels."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(data.services ?? []).map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Wrench;
            return (
              <article
                key={(service.key || "service") + index}
                className="overflow-hidden rounded-md border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <img
                  src={resolveImage(service.img)}
                  alt={service.title}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <Icon className="size-6 stroke-[1.5] text-navy" />
                    <h3 className="font-extrabold text-navy">{service.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImageCards({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow: string;
  items: Array<{ title: string; img?: string }>;
}) {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {items.map((item, index) => (
            <figure key={item.title + index} className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
              <img src={resolveImage(item.img)} alt={item.title} loading="lazy" className="aspect-[5/3] w-full object-cover" />
              <figcaption className="px-3 py-3 text-center text-sm font-bold text-navy">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function DynamicExperience({ data }: { data: EditableContent }) {
  return (
    <section id="experience" className="py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading eyebrow="Parcours" title="Mon expérience professionnelle" />
        <ol className="relative grid gap-8 border-l-2 border-border pl-8 lg:grid-cols-4 lg:gap-6 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-10">
          {(data.experience ?? []).map((item, index) => (
            <li key={item.period + index} className="relative">
              <span className="absolute -left-[2.45rem] top-1 size-4 rounded-full border-4 border-background bg-brand ring-2 ring-brand lg:-top-[3.05rem] lg:left-0" />
              <p className="text-sm font-extrabold text-brand-foreground">
                <span className="rounded bg-brand px-2 py-1">{item.period}</span>
              </p>
              <h3 className="mt-4 text-lg font-extrabold leading-snug text-navy">
                {item.title}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {item.location}
              </p>
              {item.note && (
                <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
              )}
              {item.highlight && (
                <p className="mt-4 rounded-md border-l-4 border-brand bg-surface p-4 text-sm font-semibold text-navy">
                  {item.highlight}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DynamicPortfolio({ data }: { data: EditableContent }) {
  const [category, setCategory] = useState("Tous");
  const projects = data.realisations?.projects ?? [];
  const categories = ["Tous", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];
  const visible = category === "Tous" ? projects : projects.filter((project) => project.category === category);

  return (
    <section id="realisations" className="bg-surface py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow={data.realisations?.eyebrow}
          title={data.realisations?.title || "Réalisations"}
          aside={data.realisations?.note}
        />

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "shrink-0 rounded-md border px-4 py-2 text-sm font-bold transition-colors",
                category === item
                  ? "border-navy bg-navy text-background"
                  : "border-border bg-background text-navy hover:border-navy/40",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {visible.map((project, index) => (
            <figure key={project.title + index} className="group relative overflow-hidden rounded-md">
              <img
                src={resolveImage(project.image)}
                alt={project.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-3 pt-10 text-xs font-bold text-background md:p-5 md:text-base">
                {project.title}
                <span className="mt-1 block text-[10px] text-brand md:text-xs">{project.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function DynamicFormation({ data }: { data: EditableContent }) {
  const item = data.formation;

  return (
    <section id="formation" className="py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading eyebrow={item.eyebrow} title={item.title} />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-md border border-border p-6 shadow-sm md:p-8">
            <Award className="size-9 text-brand" />
            <h3 className="mt-4 text-xl font-extrabold text-navy">{item.certificateTitle}</h3>
            <p className="mt-1 font-bold text-foreground">{item.certificateSubtitle}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.institution}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.date}</p>
            <p className="mt-4 inline-block rounded bg-surface px-3 py-1.5 text-xs font-bold text-navy">
              {item.description}
            </p>

            {item.certificateImage ? (
              <img src={resolveImage(item.certificateImage)} alt="Certificat" className="mt-6 max-h-[280px] w-full rounded-md border border-border object-contain" />
            ) : (
              <div className="mt-6 grid min-h-[170px] place-items-center rounded-md border-2 border-dashed border-border bg-surface text-center text-xs text-muted-foreground">
                <div>
                  <Award className="mx-auto mb-2 size-7" />
                  Image du certificat
                </div>
              </div>
            )}
          </article>

          <div className="grid gap-6">
            <div className="flex gap-4 rounded-md border border-border p-6 shadow-sm">
              <GraduationCap className="size-8 shrink-0 text-navy" />
              <div>
                <h3 className="font-extrabold text-navy">Enseignement secondaire</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.education}</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-md border border-border p-6 shadow-sm">
              <Hammer className="size-8 shrink-0 text-navy" />
              <div>
                <h3 className="font-extrabold text-navy">Formation pratique</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.practice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DynamicLanguagesSafety({ data }: { data: EditableContent }) {
  const block = data.languagesSafety;

  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow="Langues & mobilité" title={block.languagesTitle} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {(block.languages ?? []).map((language, index) => (
              <div key={language.name + index} className="rounded-md border border-border bg-background p-5">
                <Languages className="size-6 text-navy" />
                <p className="mt-3 font-extrabold text-navy">{language.name}</p>
                <p className="text-sm text-muted-foreground">{language.level}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-md border border-border bg-background p-5">
            <Car className="size-6 shrink-0 text-navy" />
            <p className="text-sm leading-relaxed text-muted-foreground">{block.mobility}</p>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Sécurité" title={block.safetyTitle} />
          <ul className="divide-y divide-border rounded-md border border-border bg-background">
            {(block.safety ?? []).map((rule, index) => (
              <li key={rule.text + index} className="flex items-start gap-3 p-4 text-sm font-semibold text-navy">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                {rule.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DynamicContact({ data }: { data: EditableContent }) {
  const block = data.contact;
  return (
    <section id="contact" className="bg-navy py-20 lg:py-28">
      <div className="container-site text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-background md:text-5xl">
          {block.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-background/80">{block.description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ContactLinks
            phone={block.phone}
            whatsapp={block.whatsapp}
            email={block.email}
            cvUrl={block.cvUrl}
          />
        </div>
      </div>
    </section>
  );
}

function DynamicFooter({ data }: { data: EditableContent }) {
  return (
    <footer className="border-t border-background/10 bg-navy py-10 text-sm text-background/70">
      <div className="container-site grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-extrabold text-background">
            {data.header.name.split(" ")[0]} <span className="text-brand">{data.header.name.split(" ").slice(1).join(" ")}</span>
          </p>
          <p className="mt-1">{data.header.professionalTitle}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-8">
          <span className="flex items-center gap-2">
            <MapPin className="size-4" />
            {data.hero.location}
          </span>
          <a href={"tel:" + data.contact.phone.replace(/\s+/g, "")} className="flex items-center gap-2 hover:text-background">
            <Phone className="size-4" />
            {data.contact.phone}
          </a>
          <a href={"mailto:" + data.contact.email} className="flex items-center gap-2 hover:text-background">
            <Mail className="size-4" />
            {data.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

function renderSection(type: string, data: EditableContent, textIndex: { value: number }) {
  switch (type) {
    case "header":
      return <SiteHeader key={type} />;
    case "hero":
      return <DynamicHero key={type} data={data} />;
    case "quickstrip":
      return <QuickStrip key={type} data={data} />;
    case "about":
      return <DynamicAbout key={type} data={data} />;
    case "services":
      return <DynamicServices key={type} data={data} />;
    case "materials":
      return <ImageCards key={type} eyebrow="Matériaux maîtrisés" title="Des matériaux adaptés à chaque projet" items={data.materials ?? []} />;
    case "tools":
      return <ImageCards key={type} eyebrow="Outils professionnels" title="Un outillage personnel complet" items={data.tools ?? []} />;
    case "experience":
      return <DynamicExperience key={type} data={data} />;
    case "realisations":
      return <DynamicPortfolio key={type} data={data} />;
    case "formation":
      return <DynamicFormation key={type} data={data} />;
    case "languagesSafety":
      return <DynamicLanguagesSafety key={type} data={data} />;
    case "contact":
      return <DynamicContact key={type} data={data} />;
    case "footer":
      return <DynamicFooter key={type} data={data} />;
    case "text": {
      const section = data.textSections?.[textIndex.value] ?? { eyebrow: "Section", title: "Votre titre", text: "" };
      textIndex.value += 1;
      return (
        <section key={"text-" + textIndex.value} className="bg-background py-16 lg:py-24">
          <div className="container-site">
            {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">{section.title}</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{section.text}</p>
          </div>
        </section>
      );
    }
    default:
      return null;
  }
}

export function WebsitePreview({ data }: { data: EditableContent }) {
  const textIndex = { value: 0 };
  const order = data.sectionOrder ?? [];

  return (
    <div className="min-h-full overflow-hidden bg-background">
      {order.map((type) => renderSection(type, data, textIndex))}
    </div>
  );
}

export function EditableHomepage() {
  const data = pageContent as EditableContent;
  const order = sectionOrder ?? data.sectionOrder ?? [];
  return <WebsitePreview data={{ ...data, sectionOrder: order }} />;
}
