import { createFileRoute } from "@tanstack/react-router";
import { EditableHomepage } from "@/components/cv/EditableHomepage";

const title = "Youcef Khelifi — Plombier-chauffagiste | Installateur CVC";
const description =
  "Plomberie sanitaire, chauffage central, réseaux de gaz et climatisation split. Disponible pour une opportunité en Europe à partir de 2027.";

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
  component: EditableHomepage,
});
