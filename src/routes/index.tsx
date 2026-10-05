import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/cv/Header";
import { Hero, QuickStrip, About, Services, Materials, Experience, Realisations, Formation, LanguagesSafety, FinalCta, Footer } from "@/components/cv/Sections";

const title = "Youcef Khelifi — Plombier-chauffagiste | Installateur CVC";
const description = "Plomberie sanitaire, chauffage central, réseaux de gaz et climatisation split. Disponible pour une opportunité en Europe à partir de 2027.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <QuickStrip />
        <About />
        <Services />
        <Materials />
        <Experience />
        <Realisations />
        <Formation />
        <LanguagesSafety />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
