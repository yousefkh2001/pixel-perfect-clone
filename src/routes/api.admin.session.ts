import { createFileRoute } from "@tanstack/react-router";
import { verifySession } from "@/admin/auth";

export const Route = createFileRoute("/api/admin/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Response.json({ authenticated: await verifySession(request) });
      },
    },
  },
});
