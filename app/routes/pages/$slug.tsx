import {
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
} from "remix";
import invariant from "tiny-invariant";
import { getPage, getPageMarkdown } from "~/page";
import Text from "~/components/Text";
import Button from "~/components/Button";
import { useVersionContext } from "~/providers/VersionContext";

type LoaderData = {
  title: string;
  html: string;
  markdown: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "Expected params.slug");

  const page = await getPage(params.slug);
  const { markdown } = await getPageMarkdown(params.slug);
  const loaderData: LoaderData = {
    title: page.title,
    html: page.html,
    markdown,
  };

  return loaderData;
};

export default function PagesSlug() {
  const loaderData = useLoaderData<LoaderData>();
  const location = useLocation();

  return (
    <main className="pb-24 prose prose-slate">
      <Text variant="h1" as="h1" className="mt-0">
        {loaderData.title} Test Page
      </Text>

      <Outlet context={loaderData} />

      <div className="mt-24">
        {!/edit/gi.test(location.pathname) ? (
          <Link
            to="edit"
            className="text-violet-500 underlined focus:outline-none hover:text-black focus:text-black "
          >
            Edit
          </Link>
        ) : null}
      </div>
      <hr />
      <p className="italic text-right">
        &copy; 2022 NCTC. All rights reserved.
      </p>
    </main>
  );
}

export const usePage = () => {
  return useOutletContext<LoaderData>();
};
