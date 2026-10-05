import { createFileRoute } from "@tanstack/react-router";
import { getAdminConfig, sameOrigin, verifySession } from "@/admin/auth";
import pageContent from "@/content/published-page.json";

const REPO = String(process.env.GITHUB_REPOSITORY || "yousefkh2001/pixel-perfect-clone");
const BRANCH = String(process.env.GITHUB_BRANCH || "main");
const PATH = "src/content/published-page.json";

function base64Encode(text: string) {
  return btoa(unescape(encodeURIComponent(text)));
}

export const Route = createFileRoute("/api/admin/content")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await verifySession(request))) return Response.json({ error: "Non autorisé." }, { status: 401 });
        return Response.json(pageContent);
      },

      POST: async ({ request }) => {
        if (!sameOrigin(request) || !(await verifySession(request))) {
          return Response.json({ error: "Non autorisé." }, { status: 401 });
        }

        const { secret } = getAdminConfig();
        if (!secret) return Response.json({ error: "Session invalide." }, { status: 401 });

        const token = String(process.env.GITHUB_TOKEN || "");
        if (!token) {
          return Response.json(
            { error: "GITHUB_TOKEN n'est pas configuré dans Vercel." },
            { status: 503 },
          );
        }

        let data: unknown;
        try {
          data = await request.json();
        } catch {
          return Response.json({ error: "JSON invalide." }, { status: 400 });
        }

        const serialized = JSON.stringify(data, null, 2) + "\n";
        if (serialized.length > 500_000) {
          return Response.json({ error: "Contenu trop volumineux." }, { status: 413 });
        }

        const url = `https://api.github.com/repos/${REPO}/contents/${PATH}`;
        const headers = {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          "User-Agent": "youcef-khelifi-admin",
        };

        const current = await fetch(`${url}?ref=${encodeURIComponent(BRANCH)}`, { headers });
        if (!current.ok) {
          return Response.json({ error: "Impossible de lire le fichier publié sur GitHub." }, { status: 502 });
        }

        const currentJson = await current.json();
        const update = await fetch(url, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            message: "Update website content from admin",
            content: base64Encode(serialized),
            sha: currentJson.sha,
            branch: BRANCH,
          }),
        });

        const result = await update.json().catch(() => ({}));

        if (!update.ok) {
          return Response.json(
            { error: result.message || "GitHub a refusé la publication." },
            { status: 502 },
          );
        }

        return Response.json({
          ok: true,
          commit: result.commit?.sha || null,
          message: "Contenu publié sur GitHub.",
        });
      },
    },
  },
});
