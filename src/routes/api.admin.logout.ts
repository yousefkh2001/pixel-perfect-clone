import { createFileRoute } from "@tanstack/react-router";
import { clearSessionCookie, sameOrigin } from "@/admin/auth";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!sameOrigin(request)) {
          return Response.json({ error: "Requête refusée." }, { status: 403 });
        }

        return Response.json(
          { ok: true },
          {
            headers: {
              "set-cookie": clearSessionCookie(),
            },
          },
        );
      },
    },
  },
});
