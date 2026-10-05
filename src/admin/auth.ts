const encoder = new TextEncoder();
const COOKIE_NAME = "yk_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;

function base64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function hmac(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payload))));
}

export function getAdminConfig() {
  return {
    username: String(process.env.ADMIN_USERNAME || ""),
    password: String(process.env.ADMIN_PASSWORD || ""),
    secret: String(process.env.ADMIN_SESSION_SECRET || ""),
  };
}

export function getCookie(request: Request) {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === COOKIE_NAME) return rest.join("=");
  }
  return null;
}

export async function createSession(username: string, secret: string) {
  const payload = base64Url(
    encoder.encode(
      JSON.stringify({
        sub: username,
        exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
      }),
    ),
  );
  const signature = await hmac(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifySession(request: Request) {
  const { secret } = getAdminConfig();
  if (secret.length < 32) return false;

  const token = getCookie(request);
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  try {
    const expected = await hmac(payload, secret);
    if (expected !== signature) return false;

    const decoded = JSON.parse(
      new TextDecoder().decode(decodeBase64Url(payload)),
    ) as { exp?: number };

    return Boolean(decoded.exp && decoded.exp > Math.floor(Date.now() / 1000));
  } catch {
    return false;
  }
}

export function sessionCookie(token: string) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
