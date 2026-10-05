import { useMemo, useState } from "react";
import type { DragEvent } from "react";
import { ExternalLink, GripVertical, LogOut, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import contentDefaults from "@/content/published-page.json";

const STORAGE_KEY = "yk-website-draft-v2";

const IMAGE_OPTIONS = [
  ["hero", "Hero — photo Youcef"],
  ["about1", "About — photo 1"],
  ["about2", "About — photo 2"],
  ["about3", "About — photo 3"],
  ["plomberie", "Service — plomberie"],
  ["chauffage", "Service — chauffage"],
  ["gaz", "Service — gaz"],
  ["climatisation", "Service — climatisation"],
  ["multicouche", "Matériau — multicouche"],
  ["ppr", "Matériau — PPR"],
  ["pvc", "Matériau — PVC"],
  ["cuivre", "Matériau — cuivre"],
  ["acier-noir", "Matériau — acier noir"],
  ["polyfuseur", "Outil — polyfuseur"],
  ["chalumeau", "Outil — chalumeau"],
  ["sertir", "Outil — pince à sertir"],
  ["manifold", "Outil — manifold"],
  ["pompe", "Outil — pompe à vide"],
  ["collecteur", "Projet — collecteur"],
  ["chauffe-eau", "Projet — chauffe-eau"]
];

const SECTION_LABELS = {
  header: "Header",
  hero: "Hero",
  quickstrip: "Services rapides",
  about: "À propos",
  services: "Services",
  materials: "Matériaux",
  tools: "Outils",
  experience: "Expérience",
  realisations: "Réalisations",
  formation: "Formation",
  languagesSafety: "Langues & sécurité",
  contact: "Contact",
  footer: "Footer",
  text: "Section texte"
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function newId(prefix) {
  return prefix + "-" + Math.random().toString(36).slice(2, 8);
}

function getAtPath(root, path) {
  return path.reduce((value, key) => value?.[key], root);
}

function setAtPath(root, path, value) {
  const next = clone(root);
  let target = next;
  for (let i = 0; i < path.length - 1; i += 1) target = target[path[i]];
  target[path[path.length - 1]] = value;
  return next;
}

function ImageChooser({ value, onChange }) {
  const isCustom = Boolean(value) && !IMAGE_OPTIONS.some(([key]) => key === value);

  return (
    <div className="yk-admin-image-field">
      <select
        value={isCustom ? "__custom__" : value || ""}
        onChange={(event) => onChange(event.target.value === "__custom__" ? value || "" : event.target.value)}
      >
        <option value="">Choisir une image</option>
        {IMAGE_OPTIONS.map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
        {isCustom && <option value="__custom__">Image personnalisée</option>}
      </select>

      <input
        value={isCustom ? value : ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder="URL image personnalisée"
      />
    </div>
  );
}

function Field({ label, value, onChange, textarea = false }) {
  return (
    <label className="yk-field">
      <span>{label}</span>
      {textarea ? (
        <textarea value={value ?? ""} rows={5} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function SectionTitle({ children }) {
  return <div className="yk-inspector-title">{children}</div>;
}

function UploadField({ label, onUpload }) {
  const [busy, setBusy] = useState(false);

  return (
    <label className="yk-upload-field">
      <span>{label}</span>
      <div><Upload size={14} />{busy ? "Téléversement…" : label}</div>
      <input
        type="file"
        accept="image/*"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.currentTarget.value = "";
          if (!file) return;
          setBusy(true);
          try {
            const form = new FormData();
            form.append("file", file);
            const response = await fetch("/api/admin/upload", {
              method: "POST",
              credentials: "include",
              body: form
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.error || "Upload impossible.");
            onUpload(result.url);
          } catch (error) {
            window.alert(error instanceof Error ? error.message : "Upload impossible.");
          } finally {
            setBusy(false);
          }
        }}
      />
    </label>
  );
}

function InfoBox({ title, text }) {
  return <div className="yk-info-box"><strong>{title}</strong><p>{text}</p></div>;
}

export default function AdminEditor({ onLogout }) {
  const [data, setData] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : clone(contentDefaults);
    } catch {
      return clone(contentDefaults);
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [dragIndex, setDragIndex] = useState(null);
  const [status, setStatus] = useState("Brouillon local");

  const order = data.sectionOrder || [];
  const selectedType = order[selectedIndex];
  const textOccurrence = useMemo(
    () => order.slice(0, selectedIndex + 1).filter((item) => item === "text").length - 1,
    [order, selectedIndex]
  );

  const saveDraft = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setStatus("Brouillon enregistré dans ce navigateur");
  };

  const reset = () => {
    const fresh = clone(contentDefaults);
    setData(fresh);
    setSelectedIndex(1);
    window.localStorage.removeItem(STORAGE_KEY);
    setStatus("Version originale restaurée");
  };

  const publish = async () => {
    setStatus("Publication en cours…");
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Publication impossible.");
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setStatus("Publié — Vercel va redéployer");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Publication impossible.");
    }
  };

  const update = (path, value) => setData((current) => setAtPath(current, path, value));

  const move = (from, to) => {
    if (from === to || to < 0 || to >= order.length) return;
    const next = clone(data);
    const item = next.sectionOrder.splice(from, 1)[0];
    next.sectionOrder.splice(to, 0, item);
    setData(next);
    setSelectedIndex(to);
  };

  const remove = (index) => {
    const type = order[index];
    if (type === "header" || type === "footer") {
      setStatus("Header et Footer ne peuvent pas être supprimés.");
      return;
    }
    const next = clone(data);
    next.sectionOrder.splice(index, 1);
    if (type === "text") {
      const occ = order.slice(0, index + 1).filter((item) => item === "text").length - 1;
      next.textSections = (next.textSections || []).filter((_, i) => i !== occ);
    }
    setData(next);
    setSelectedIndex(Math.max(0, Math.min(selectedIndex, next.sectionOrder.length - 1)));
  };

  const add = (type) => {
    const next = clone(data);
    const insertAt = Math.min(order.length, Math.max(1, selectedIndex + 1));

    if (type === "text") {
      next.sectionOrder = [...order.slice(0, insertAt), "text", ...order.slice(insertAt)];
      next.textSections = [
        ...(next.textSections || []),
        { eyebrow: "Nouvelle section", title: "Votre titre", text: "Votre contenu." }
      ];
    } else {
      next.sectionOrder = [...order.slice(0, insertAt), type, ...order.slice(insertAt)];
    }

    setData(next);
    setSelectedIndex(insertAt);
  };

  const handleDrop = (event, to) => {
    event.preventDefault();
    if (dragIndex !== null) move(dragIndex, to);
    setDragIndex(null);
  };

  return (
    <div className="yk-editor">
      <header className="yk-editor__topbar">
        <div className="yk-editor__brand">
          <span className="yk-editor__mark">YK</span>
          <div>
            <strong>YOUCEF KHELIFI</strong>
            <span>Visual Website Editor</span>
          </div>
        </div>

        <div className="yk-editor__top-actions">
          <span className="yk-editor__status">{status}</span>
          <a href="/" target="_blank" rel="noreferrer" className="yk-editor__top-btn">
            <ExternalLink size={15} /> Voir le site
          </a>
          <button className="yk-editor__top-btn" onClick={saveDraft}>
            <Save size={15} /> Sauvegarder
          </button>
          <button className="yk-editor__top-btn yk-editor__top-btn--publish" onClick={publish}>
            <Upload size={15} /> Publier
          </button>
          <button className="yk-editor__top-btn" onClick={reset}>
            <RotateCcw size={15} /> Réinitialiser
          </button>
          <button className="yk-editor__top-btn yk-editor__top-btn--danger" onClick={onLogout}>
            <LogOut size={15} /> Quitter
          </button>
        </div>
      </header>

      <main className="yk-editor__body">
        <aside className="yk-editor__left">
          <div className="yk-editor__panel-title">Sections</div>
          <div className="yk-editor__hint">Glissez une section pour modifier son ordre</div>

          <div className="yk-editor__section-list">
            {order.map((type, index) => (
              <div
                key={type + "-" + index}
                className={"yk-section-row" + (index === selectedIndex ? " is-selected" : "")}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, index)}
                onClick={() => setSelectedIndex(index)}
              >
                <GripVertical size={14} className="yk-drag-icon" />
                <span className="yk-section-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="yk-section-name">{SECTION_LABELS[type] || type}</span>
                {type !== "header" && type !== "footer" && (
                  <button
                    type="button"
                    className="yk-section-delete"
                    aria-label="Supprimer la section"
                    onClick={(event) => {
                      event.stopPropagation();
                      remove(index);
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="yk-add-box">
            <div className="yk-editor__panel-title">Ajouter</div>
            <div className="yk-add-grid">
              {[
                ["hero","Hero"],["about","À propos"],["services","Services"],["materials","Matériaux"],
                ["tools","Outils"],["experience","Expérience"],["realisations","Réalisations"],
                ["formation","Formation"],["languagesSafety","Langues & sécurité"],["contact","Contact"],["text","Texte"]
              ].map(([value, label]) => (
                <button key={value} type="button" onClick={() => add(value)}>
                  <Plus size={12} /> {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="yk-editor__canvas">
          <div className="yk-preview-toolbar">
            <span>Structure de la page</span>
            <span className="yk-preview-note">Le site public conserve son design</span>
          </div>

          <div className="yk-canvas-page">
            {order.map((type, index) => (
              <button
                key={type + "-" + index}
                type="button"
                className={"yk-canvas-block" + (index === selectedIndex ? " is-selected" : "")}
                onClick={() => setSelectedIndex(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{SECTION_LABELS[type] || type}</strong>
                <small>Modifier à droite</small>
              </button>
            ))}
          </div>
        </section>

        <aside className="yk-editor__right">
          <div className="yk-editor__panel-title">Modifier</div>

          {selectedType === "hero" && (
            <div className="yk-inspector">
              <SectionTitle>Hero</SectionTitle>
              <Field label="Badge" value={data.hero?.eyebrow} onChange={(v) => update(["hero","eyebrow"],v)} />
              <div className="yk-field-row">
                <Field label="Prénom" value={data.hero?.firstName} onChange={(v) => update(["hero","firstName"],v)} />
                <Field label="Nom" value={data.hero?.lastName} onChange={(v) => update(["hero","lastName"],v)} />
              </div>
              <Field label="Titre" value={data.hero?.title} onChange={(v) => update(["hero","title"],v)} />
              <Field label="Description" value={data.hero?.description} textarea onChange={(v) => update(["hero","description"],v)} />
              <Field label="Localisation" value={data.hero?.location} onChange={(v) => update(["hero","location"],v)} />
              <Field label="Disponibilité" value={data.hero?.availability} textarea onChange={(v) => update(["hero","availability"],v)} />
              <SectionTitle>Images</SectionTitle>
              <label className="yk-field"><span>Desktop</span><ImageChooser value={data.hero?.image} onChange={(v)=>update(["hero","image"],v)} /></label>
              <label className="yk-field"><span>Mobile</span><ImageChooser value={data.hero?.mobileImage} onChange={(v)=>update(["hero","mobileImage"],v)} /></label>
              <UploadField label="Téléverser l'image Hero" onUpload={(url)=>update(["hero","image"],url)} />
              <SectionTitle>Contact</SectionTitle>
              <Field label="Téléphone" value={data.hero?.phone} onChange={(v) => update(["hero","phone"],v)} />
              <Field label="WhatsApp" value={data.hero?.whatsapp} onChange={(v) => update(["hero","whatsapp"],v)} />
              <Field label="Email" value={data.hero?.email} onChange={(v) => update(["hero","email"],v)} />
              <Field label="URL CV" value={data.hero?.cvUrl} onChange={(v) => update(["hero","cvUrl"],v)} />
            </div>
          )}

          {selectedType === "about" && (
            <div className="yk-inspector">
              <SectionTitle>À propos</SectionTitle>
              <Field label="Petit titre" value={data.about?.eyebrow} onChange={(v)=>update(["about","eyebrow"],v)} />
              <Field label="Titre" value={data.about?.title} onChange={(v)=>update(["about","title"],v)} />
              <Field label="Paragraphe 1" value={data.about?.text1} textarea onChange={(v)=>update(["about","text1"],v)} />
              <Field label="Paragraphe 2" value={data.about?.text2} textarea onChange={(v)=>update(["about","text2"],v)} />
              <label className="yk-field"><span>Image principale</span><ImageChooser value={data.about?.image1} onChange={(v)=>update(["about","image1"],v)} /></label>
              <label className="yk-field"><span>Image 2</span><ImageChooser value={data.about?.image2} onChange={(v)=>update(["about","image2"],v)} /></label>
              <label className="yk-field"><span>Image 3</span><ImageChooser value={data.about?.image3} onChange={(v)=>update(["about","image3"],v)} /></label>
            </div>
          )}

          {selectedType === "services" && (
            <ArrayEditor
              title="Services"
              items={data.services || []}
              update={(value) => update(["services"], value)}
              imageKey="img"
              fields={[["title","Titre"],["short","Sous-titre"],["desc","Description"]]}
            />
          )}

          {selectedType === "materials" && (
            <ArrayEditor title="Matériaux" items={data.materials || []} update={(value)=>update(["materials"],value)} imageKey="img" fields={[["title","Nom"]]} />
          )}

          {selectedType === "tools" && (
            <ArrayEditor title="Outils" items={data.tools || []} update={(value)=>update(["tools"],value)} imageKey="img" fields={[["title","Nom"]]} />
          )}

          {selectedType === "experience" && (
            <ArrayEditor
              title="Expérience"
              items={data.experience || []}
              update={(value)=>update(["experience"],value)}
              fields={[["period","Période"],["title","Projet / poste"],["location","Lieu"],["note","Note"],["highlight","Point fort"]]}
              textareaKey="highlight"
            />
          )}

          {selectedType === "realisations" && (
            <div className="yk-inspector">
              <SectionTitle>Réalisations</SectionTitle>
              <Field label="Petit titre" value={data.realisations?.eyebrow} onChange={(v)=>update(["realisations","eyebrow"],v)} />
              <Field label="Titre" value={data.realisations?.title} onChange={(v)=>update(["realisations","title"],v)} />
              <Field label="Note" value={data.realisations?.note} textarea onChange={(v)=>update(["realisations","note"],v)} />
              <ArrayEditor
                title="Projets"
                items={data.realisations?.projects || []}
                update={(value)=>update(["realisations","projects"],value)}
                imageKey="image"
                fields={[["title","Titre"],["category","Catégorie"]]}
              />
            </div>
          )}

          {selectedType === "formation" && (
            <div className="yk-inspector">
              <SectionTitle>Formation</SectionTitle>
              <Field label="Petit titre" value={data.formation?.eyebrow} onChange={(v)=>update(["formation","eyebrow"],v)} />
              <Field label="Titre" value={data.formation?.title} onChange={(v)=>update(["formation","title"],v)} />
              <Field label="Certification" value={data.formation?.certificateTitle} onChange={(v)=>update(["formation","certificateTitle"],v)} />
              <Field label="Spécialité" value={data.formation?.certificateSubtitle} onChange={(v)=>update(["formation","certificateSubtitle"],v)} />
              <Field label="Institution" value={data.formation?.institution} textarea onChange={(v)=>update(["formation","institution"],v)} />
              <Field label="Date / lieu" value={data.formation?.date} onChange={(v)=>update(["formation","date"],v)} />
              <Field label="Description" value={data.formation?.description} onChange={(v)=>update(["formation","description"],v)} />
              <Field label="URL image certificat" value={data.formation?.certificateImage} onChange={(v)=>update(["formation","certificateImage"],v)} />
              <Field label="Enseignement" value={data.formation?.education} onChange={(v)=>update(["formation","education"],v)} />
              <Field label="Formation pratique" value={data.formation?.practice} textarea onChange={(v)=>update(["formation","practice"],v)} />
            </div>
          )}

          {selectedType === "languagesSafety" && (
            <div className="yk-inspector">
              <SectionTitle>Langues</SectionTitle>
              <ArrayEditor title="Langues" items={data.languagesSafety?.languages || []} update={(value)=>update(["languagesSafety","languages"],value)} fields={[["name","Langue"],["level","Niveau"]]} />
              <SectionTitle>Sécurité</SectionTitle>
              <ArrayEditor title="Règles de sécurité" items={data.languagesSafety?.safety || []} update={(value)=>update(["languagesSafety","safety"],value)} fields={[["text","Règle"]]} />
              <Field label="Mobilité" value={data.languagesSafety?.mobility} textarea onChange={(v)=>update(["languagesSafety","mobility"],v)} />
            </div>
          )}

          {selectedType === "contact" && (
            <div className="yk-inspector">
              <SectionTitle>Contact</SectionTitle>
              <Field label="Titre" value={data.contact?.title} onChange={(v)=>update(["contact","title"],v)} />
              <Field label="Description" value={data.contact?.description} textarea onChange={(v)=>update(["contact","description"],v)} />
              <Field label="Téléphone" value={data.contact?.phone} onChange={(v)=>update(["contact","phone"],v)} />
              <Field label="WhatsApp" value={data.contact?.whatsapp} onChange={(v)=>update(["contact","whatsapp"],v)} />
              <Field label="Email" value={data.contact?.email} onChange={(v)=>update(["contact","email"],v)} />
              <Field label="URL CV" value={data.contact?.cvUrl} onChange={(v)=>update(["contact","cvUrl"],v)} />
            </div>
          )}

          {selectedType === "text" && (
            <div className="yk-inspector">
              <SectionTitle>Section texte</SectionTitle>
              <Field label="Petit titre" value={data.textSections?.[Math.max(0,textOccurrence)]?.eyebrow} onChange={(v)=>update(["textSections",Math.max(0,textOccurrence),"eyebrow"],v)} />
              <Field label="Titre" value={data.textSections?.[Math.max(0,textOccurrence)]?.title} onChange={(v)=>update(["textSections",Math.max(0,textOccurrence),"title"],v)} />
              <Field label="Contenu" value={data.textSections?.[Math.max(0,textOccurrence)]?.text} textarea onChange={(v)=>update(["textSections",Math.max(0,textOccurrence),"text"],v)} />
            </div>
          )}

          {(selectedType === "header" || selectedType === "footer" || selectedType === "quickstrip") && (
            <InfoBox
              title={SECTION_LABELS[selectedType]}
              text="Cette section réutilise le design actuel du site. Le contenu principal est piloté par les réglages associés."
            />
          )}
        </aside>
      </main>
    </div>
  );
}

function ArrayEditor({ title, items, update, fields, imageKey, textareaKey }) {
  return (
    <div className="yk-inspector">
      <SectionTitle>{title}</SectionTitle>
      {items.map((item, index) => (
        <div className="yk-repeat-card" key={index}>
          <div className="yk-repeat-card__top">
            <strong>{item.title || item.name || item.period || title}</strong>
            <button type="button" onClick={()=>update(items.filter((_,i)=>i!==index))}><Trash2 size={13}/></button>
          </div>
          {fields.map(([key,label])=>(
            <Field
              key={key}
              label={label}
              value={item[key]}
              textarea={textareaKey === key}
              onChange={(v)=>{
                const next=[...items];
                next[index]={...next[index],[key]:v};
                update(next);
              }}
            />
          ))}
          {imageKey && (
            <label className="yk-field">
              <span>Image</span>
              <ImageChooser
                value={item[imageKey]}
                onChange={(v)=>{
                  const next=[...items];
                  next[index]={...next[index],[imageKey]:v};
                  update(next);
                }}
              />
            </label>
          )}
        </div>
      ))}
      <button
        type="button"
        className="yk-add-item"
        onClick={()=>{
          const first = {};
          fields.forEach(([key])=>{ first[key]=""; });
          if (imageKey) first[imageKey]="hero";
          update([...items, first]);
        }}
      >
        <Plus size={14}/> Ajouter
      </button>
    </div>
  );
}
