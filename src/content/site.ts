// All editable site content lives here (mappable later to Shopify section settings).
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

export const contact = {
  phone: "+213 673 802 142",
  phoneHref: "tel:+213673802142",
  whatsapp: "https://wa.me/213673802142",
  email: "yousefkhelifi2803@gmail.com",
  cvUrl: "#", // Replace with the CV PDF URL
  location: "Barika, Algérie",
};

export const images = { hero, about1, about2, about3, certificate: "" as string };

export const nav = [
  { id: "accueil", label: "Accueil" },
  { id: "a-propos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "experience", label: "Expérience" },
  { id: "realisations", label: "Réalisations" },
  { id: "formation", label: "Formation" },
  { id: "contact", label: "Contact" },
];

export const services = [
  { key: "plomb", title: "Plomberie sanitaire", short: "Installation et réparation", desc: "Installation, réparation, appareils sanitaires", img: sPlomb },
  { key: "chauf", title: "Chauffage central", short: "Installation et entretien", desc: "Radiateurs, chaudières, circulateurs, entretien", img: sChauf },
  { key: "gaz", title: "Réseaux de gaz", short: "Installation et contrôle", desc: "Installation, contrôle d'étanchéité, dépannage", img: sGaz },
  { key: "clim", title: "Climatisation split", short: "Pose et maintenance", desc: "Pose, entretien, charge en fluide", img: sClim },
] as const;

export const materials = [
  { title: "Multicouche", img: mMulti },
  { title: "PPR", img: mPpr },
  { title: "PVC", img: mPvc },
  { title: "Cuivre", img: mCu },
  { title: "Acier noir", img: mAcier },
];

export const tools = [
  { title: "Polyfuseur PPR", img: tPoly },
  { title: "Chalumeau oxyacétylénique", img: tChal },
  { title: "Pince à sertir multicouche", img: tSert },
  { title: "Manifold", img: tMani },
  { title: "Pompe à vide", img: tPomp },
];

export const experience = [
  { period: "2019 — Aujourd'hui", title: "Plombier-chauffagiste, installateur gaz et CVC indépendant", place: "Barika, Algérie", note: "Chantiers dans d'autres villes" },
  { period: "2022 — 2023", title: "Ensemble de logements sociaux", place: "Bab Ezzouar, Alger", note: "Environ 8 mois", highlight: "≈100 climatiseurs split installés en autonomie avant livraison." },
  { period: "2024", title: "École", place: "Boukhtab (El Bayadh)" },
  { period: "2024 — 2025", title: "Rénovation de logements", place: "Biskra" },
];

export const projectCategories = ["Tous", "Plomberie", "Chauffage", "Gaz", "Climatisation", "Chantiers"] as const;

export const projects = [
  { title: "Collecteur chauffage central", cats: ["Chauffage", "Chantiers"], img: pColl },
  { title: "Réseaux d'eau et évacuation", cats: ["Plomberie", "Chantiers"], img: mPvc },
  { title: "Installation climatiseurs", cats: ["Climatisation", "Chantiers"], img: sClim },
  { title: "Tuyauterie gaz en cuivre", cats: ["Gaz"], img: sGaz },
  { title: "Chauffe-eau et plomberie", cats: ["Plomberie"], img: pCe },
  { title: "Réparation et entretien", cats: ["Plomberie", "Chauffage"], img: sChauf },
];

export const languages = [
  { name: "Arabe", level: "Langue maternelle" },
  { name: "Français", level: "B1" },
  { name: "Anglais", level: "B1" },
];

export const safety = [
  "Port des EPI : gants, lunettes, chaussures de sécurité",
  "Contrôle d'étanchéité avant mise en service du gaz",
  "Coupure de l'eau ou du gaz avant intervention",
  "Vigilance lors des travaux en hauteur",
  "Respect des normes et bonnes pratiques",
];
