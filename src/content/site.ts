import hero from "@/assets/hero.jpg";
import about1 from "@/assets/about1.jpg";
import about2 from "@/assets/about2.jpg";
import about3 from "@/assets/about3.jpg";
import sPlomb from "@/assets/s-plomberie.jpg";
import sChauf from "@/assets/s-chauffage.jpg";
import sGaz from "@/assets/s-gaz.jpg";
import sClim from "@/assets/s-clim.jpg";
import mMulti from "@/assets/m-multicouche.jpg";
import mPpr from "@/assets/m-ppr.jpg";
import mPvc from "@/assets/m-pvc.jpg";
import mCu from "@/assets/m-cuivre.jpg";
import mAcier from "@/assets/m-acier.jpg";
import tPoly from "@/assets/t-polyfuseur.jpg";
import tChal from "@/assets/t-chalumeau.jpg";
import tSert from "@/assets/t-sertir.jpg";
import tMani from "@/assets/t-manifold.jpg";
import tPomp from "@/assets/t-pompe.jpg";
import pColl from "@/assets/p-collecteur.jpg";
import pCe from "@/assets/p-chauffeeau.jpg";
import pageContent from "./published-page.json";

const assetMap: Record<string, string> = {
  hero, about1, about2, about3,
  plomberie: sPlomb, chauffage: sChauf, gaz: sGaz, climatisation: sClim,
  multicouche: mMulti, ppr: mPpr, pvc: mPvc, cuivre: mCu, "acier-noir": mAcier,
  polyfuseur: tPoly, chalumeau: tChal, sertir: tSert, manifold: tMani, pompe: tPomp,
  collecteur: pColl, "chauffe-eau": pCe,
};

export const resolveImage = (value?: string) => {
  if (!value) return hero;
  if (/^(https?:\/\/|\/)/i.test(value)) return value;
  return assetMap[value] ?? hero;
};

export const contact = {
  phone: pageContent.contact?.phone ?? "+213 673 802 142",
  phoneHref: "tel:" + (pageContent.contact?.phone ?? "+213 673 802 142").replace(/\s+/g, ""),
  whatsapp: "https://wa.me/" + (pageContent.contact?.whatsapp ?? "213673802142").replace(/\D/g, ""),
  email: pageContent.contact?.email ?? "yousefkhelifi2803@gmail.com",
  cvUrl: pageContent.contact?.cvUrl || "#",
  location: pageContent.hero?.location ?? "Barika, Algérie",
};

export const header = pageContent.header;
export const hero = pageContent.hero;

export const nav = [
  { id: "accueil", label: "Accueil" },
  { id: "a-propos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "experience", label: "Expérience" },
  { id: "realisations", label: "Réalisations" },
  { id: "formation", label: "Formation" },
  { id: "contact", label: "Contact" },
];

export const images = {
  hero: resolveImage(pageContent.hero?.image),
  about1: resolveImage(pageContent.about?.image1),
  about2: resolveImage(pageContent.about?.image2),
  about3: resolveImage(pageContent.about?.image3),
  certificate: pageContent.formation?.certificateImage
    ? resolveImage(pageContent.formation.certificateImage)
    : "",
};

export const services = (pageContent.services ?? []).map((s) => ({
  ...s,
  img: resolveImage(s.img),
}));

export const materials = (pageContent.materials ?? []).map((m) => ({
  ...m,
  img: resolveImage(m.img),
}));

export const tools = (pageContent.tools ?? []).map((t) => ({
  ...t,
  img: resolveImage(t.img),
}));

export const experience = pageContent.experience ?? [];

export const projectCategories = [
  "Tous", "Plomberie", "Chauffage", "Gaz", "Climatisation", "Chantiers",
] as const;

export const projects = (pageContent.realisations?.projects ?? []).map((p) => ({
  ...p,
  img: resolveImage(p.image),
}));

export const realisations = pageContent.realisations;
export const formation = pageContent.formation;
export const about = pageContent.about;
export const languagesSafety = pageContent.languagesSafety;
export const languages = pageContent.languagesSafety?.languages ?? [];
export const safety = pageContent.languagesSafety?.safety ?? [];
export const finalContact = pageContent.contact;

export const sectionOrder = pageContent.sectionOrder ?? [
  "header", "hero", "quickstrip", "about", "services", "materials", "experience",
  "realisations", "formation", "languagesSafety", "contact", "footer",
];

export { pageContent };
