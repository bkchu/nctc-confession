// app/routes/login-test.tsx
import {
  Form,
  ActionFunction,
  LoaderFunction,
  redirect,
  useSearchParams,
} from "remix";
import invariant from "tiny-invariant";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function LoginTest() {
  const [searchParams] = useSearchParams();
  return (
    <Form method="post">
      <input
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <input
        type="hidden"
        name="redirectTo"
        value={searchParams.get("redirectTo") ?? undefined}
      />
      <button>Sign In</button>
    </Form>
  );
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export let action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const redirectTo = form.get("redirectTo") || "/";

  invariant(typeof redirectTo === "string", "redirectTo must be a string");

  const params = !!redirectTo
    ? new URLSearchParams([["redirectTo", redirectTo]])
    : "/";
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: redirectTo,
    failureRedirect: `/login-test?${params}`,
  });
};

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export let loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  return authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};
