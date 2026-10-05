import {
  About,
  Experience,
  FinalCta,
  Footer,
  Formation,
  Header,
  Hero,
  LanguagesSafety,
  Materials,
  QuickStrip,
  Realisations,
  Services,
} from "@/components/cv/Sections";
import { Header as SiteHeader } from "@/components/cv/Header";
import { sectionOrder } from "@/content/site";
import pageContent from "@/content/published-page.json";
import { useMemo } from "react";

function TextSection({ section }: { section: { eyebrow?: string; title?: string; text?: string } }) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container-site">
        {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">{section.title || "Section"}</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{section.text || ""}</p>
      </div>
    </section>
  );
}

const builtIn = {
  hero: Hero,
  quickstrip: QuickStrip,
  about: About,
  services: Services,
  materials: Materials,
  tools: Materials,
  experience: Experience,
  realisations: Realisations,
  formation: Formation,
  languagesSafety: LanguagesSafety,
  contact: FinalCta,
  footer: Footer,
};

export function EditableHomepage() {
  const contentSections = pageContent.textSections ?? [];
  const [index] = useMemo(() => [0], []);

  let textCount = index;

  return (
    <div className="min-h-screen bg-background">
      {sectionOrder.map((type, position) => {
        if (type === "header") return <SiteHeader key={type + position} />;
        if (type === "text") {
          const section = contentSections[textCount++] ?? { title: "Section", text: "" };
          return <TextSection key={type + position} section={section} />;
        }
        const Component = builtIn[type as keyof typeof builtIn];
        if (!Component) return null;
        return <Component key={type + position} />;
      })}
      {!sectionOrder.includes("footer") && <Footer />}
    </div>
  );
}
