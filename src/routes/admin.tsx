import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import AdminEditor from "@/admin/admin-editor";
import "@/admin/admin.css";

type AuthState = "checking" | "login" | "authenticated";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [state, setState] = useState<AuthState>("checking");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function checkSession() {
    try {
      const response = await fetch("/api/admin/session", { credentials: "include" });
      const result = await response.json().catch(() => ({}));
      setState(result.authenticated ? "authenticated" : "login");
    } catch {
      setState("login");
    }
  }

  useEffect(() => {
    void checkSession();
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Connexion impossible.");
      setPassword("");
      setState("authenticated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" }).catch(() => undefined);
    setUsername("");
    setPassword("");
    setState("login");
  }

  if (state === "checking") {
    return <div className="yk-admin-loading">Vérification de la session…</div>;
  }

  if (state === "authenticated") {
    return <AdminEditor onLogout={logout} />;
  }

  return (
    <main className="yk-admin-page">
      <div className="yk-admin-login">
        <div className="yk-admin-login-brand">
          <div className="yk-admin-login-mark"><span>Y</span><span>K</span></div>
          <div>
            <strong>YOUCEF KHELIFI</strong>
            <span>Administration du site</span>
          </div>
        </div>

        <div className="yk-admin-login-icon"><LockKeyhole size={22} /></div>

        <p className="yk-admin-eyebrow">ESPACE PRIVÉ</p>
        <h1>Connexion</h1>
        <p className="yk-admin-login-copy">
          Accédez à l’éditeur visuel pour gérer votre portfolio.
        </p>

        <form className="yk-admin-form" onSubmit={login}>
          <label>
            Nom d’utilisateur
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
              placeholder="Votre identifiant"
            />
          </label>

          <label>
            Mot de passe
            <span className="yk-admin-password">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Votre mot de passe"
              />
              <button
                type="button"
                onClick={() => setVisible((value) => !value)}
                aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {visible ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>

          {error && <div className="yk-admin-error">{error}</div>}

          <button className="yk-admin-login-submit" type="submit" disabled={busy}>
            <ShieldCheck size={17} />
            {busy ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <a href="/" className="yk-admin-back">← Retour au site</a>
      </div>
    </main>
  );
}
