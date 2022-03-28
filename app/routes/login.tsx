import {
  ActionFunction,
  Form,
  json,
  useActionData,
  useSearchParams,
} from "remix";
import { createUserSession, login } from "~/utils/session.server";

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    password: string | undefined;
  };
  fields?: {
    password: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const password = form.get("password");
  const redirectTo = form.get("redirectTo") || "/";

  if (typeof password !== "string" || typeof redirectTo !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { password };
  const fieldErrors = {
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  // login to get the user
  const user = await login({ password });
  if (!user) {
    return badRequest({
      fields,
      formError: `Username/Password combination is incorrect`,
    });
  }
  // if there's no user, return the fields and a formError
  // if there is a user, create their session and redirect to /jokes
  return createUserSession(redirectTo);
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  return (
    <div className="container">
      <div className="content" data-light="">
        <h1>Login</h1>
        <Form
          method="post"
          aria-describedby={
            actionData?.formError ? "form-error-message" : undefined
          }
        >
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <div>
            <label htmlFor="password-input">Password</label>
            <input id="password-input" name="password" type="password" />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
