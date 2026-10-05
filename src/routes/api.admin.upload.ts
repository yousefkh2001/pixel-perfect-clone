import { createFileRoute } from "@tanstack/react-router";
import { sameOrigin, verifySession } from "@/admin/auth";

const REPO = String(process.env.GITHUB_REPOSITORY || "yousefkh2001/pixel-perfect-clone");
const BRANCH = String(process.env.GITHUB_BRANCH || "main");

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function safeName(name: string) {
  const clean = name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return clean.slice(0, 80) || "image";
}

export const Route = createFileRoute("/api/admin/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!sameOrigin(request) || !(await verifySession(request))) {
          return Response.json({ error: "Non autorisé." }, { status: 401 });
        }

        const token = String(process.env.GITHUB_TOKEN || "");
        if (!token) {
          return Response.json({ error: "GITHUB_TOKEN n'est pas configuré dans Vercel." }, { status: 503 });
        }

        const form = await request.formData();
        const value = form.get("file");

        if (!(value instanceof File)) {
          return Response.json({ error: "Aucune image reçue." }, { status: 400 });
        }

        if (!value.type.startsWith("image/")) {
          return Response.json({ error: "Le fichier doit être une image." }, { status: 400 });
        }

        if (value.size > 4_000_000) {
          return Response.json({ error: "Image trop volumineuse. Maximum 4 MB." }, { status: 413 });
        }

        const filename = `${Date.now()}-${safeName(value.name)}`;
        const path = `public/uploads/${filename}`;
        const url = `https://api.github.com/repos/${REPO}/contents/${path}`;

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
            "User-Agent": "youcef-khelifi-admin",
          },
          body: JSON.stringify({
            message: `Upload website image: ${filename}`,
            content: toBase64(await value.arrayBuffer()),
            branch: BRANCH,
          }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          return Response.json({ error: result.message || "GitHub a refusé le téléversement." }, { status: 502 });
        }

        return Response.json({
          ok: true,
          url: `/uploads/${filename}`,
          commit: result.commit?.sha || null,
        });
      },
    },
  },
});
