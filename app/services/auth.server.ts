import invariant from "tiny-invariant";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import bcrypt from "bcryptjs";

type User = {
  isAdmin: boolean;
};

type LoginForm = {
  password: string;
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
let authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let password = form.get("password");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    let user = await login({ password });

    if (!user) {
      throw new Error("");
    }
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

// adminpassword
const passwordHash =
  "$2y$10$25pfp7UHpM3l3WyqS5Xm2.nW2zupAoF8DAMVfpSwD24i2eBRPL6Zm";

async function login({ password }: LoginForm): Promise<User | null> {
  const isCorrectPassword = await bcrypt.compare(password, passwordHash);

  if (!isCorrectPassword) {
    return null;
  }

  return { isAdmin: true };
}

export { authenticator, login };
