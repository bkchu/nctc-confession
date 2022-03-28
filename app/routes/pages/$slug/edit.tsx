import markdownStyles from "@uiw/react-markdown-preview/markdown.css";
import markdownEditorStyles from "@uiw/react-md-editor/markdown-editor.css";
import { useState } from "react";
import { ActionFunction, Form, json, LoaderFunction, redirect } from "remix";
import { ClientOnly } from "remix-utils";
import invariant from "tiny-invariant";
import { MdEditor } from "~/components/MdEditor.client";
import { savePageMarkdown } from "~/page";
import { authenticator } from "~/services/auth.server";
import { usePage } from "../$slug";

export const links = () => {
  return [
    { rel: "stylesheet", href: markdownStyles },
    { rel: "stylesheet", href: markdownEditorStyles },
  ];
};

export default function EditPage() {
  const page = usePage();

  const [editorValue, setEditorValue] = useState<string | undefined>(
    page.markdown
  );

  return (
    <Form method="post">
      <label>
        Make changes to the markdown file and make sure to press the "Save
        Edits" button below once you're done. <br />
        <ClientOnly fallback="Loading...">
          {() => (
            <MdEditor
              value={editorValue}
              onChange={setEditorValue}
              textareaProps={{ name: "mdx" }}
            />
          )}
        </ClientOnly>
      </label>
      <button>Save Edits</button>
    </Form>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const searchParams = new URLSearchParams([
    ["redirectTo", new URL(request.url).pathname],
  ]);

  await authenticator.isAuthenticated(request, {
    failureRedirect: `/login-test?${searchParams}`,
  });

  return json(200);
};

export const action: ActionFunction = async ({ params, request }) => {
  const form = await request.formData();
  invariant(params.slug, "Expected params.slug");

  const mdx = form.get("mdx");

  invariant(
    typeof mdx === "string",
    "Expected markdown content to be a string"
  );

  const page = await savePageMarkdown(params.slug, mdx);

  return redirect(`/pages/${page.slug}`);
};
