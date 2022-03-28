import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "remix";

type LoginForm = {
  password: string;
};

// adminpassword
const passwordHash =
  "$2y$10$25pfp7UHpM3l3WyqS5Xm2.nW2zupAoF8DAMVfpSwD24i2eBRPL6Zm";
export async function login({ password }: LoginForm) {
  const isCorrectPassword = await bcrypt.compare(password, passwordHash);

  if (!isCorrectPassword) return null;
  return { isAuthenticated: true };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "nctc_confessionApp_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getIsAuthenticated(request: Request) {
  const session = await getUserSession(request);
  const isAuthenticated: boolean = session.get("isAuthenticated");
  return isAuthenticated;
}

export async function requireAuth(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const isAuthenticated = session.get("isAuthenticated");
  if (!isAuthenticated) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return isAuthenticated;
}

export async function createUserSession(redirectTo: string) {
  const session = await storage.getSession();
  session.set("isAuthenticated", true);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
