import { createFileRoute } from "@tanstack/react-router";
import { createSession, getAdminConfig, sameOrigin, sessionCookie } from "@/admin/auth";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!sameOrigin(request)) {
          return Response.json({ error: "Requête refusée." }, { status: 403 });
        }

        const { username, password, secret } = getAdminConfig();

        if (!username || !password || secret.length < 32) {
          return Response.json(
            { error: "L'administration n'est pas configurée dans Vercel." },
            { status: 503 },
          );
        }

        let body;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Requête invalide." }, { status: 400 });
        }

        if (String(body.username || "") !== username || String(body.password || "") !== password) {
          return Response.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
        }

        const token = await createSession(username, secret);

        return Response.json(
          { authenticated: true },
          {
            headers: {
              "set-cookie": sessionCookie(token),
            },
          },
        );
      },
    },
  },
});
