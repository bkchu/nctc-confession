import { Link, LoaderFunction, useLoaderData, useLocation } from "remix";
import Interface from "~/components/Interface";
import { getPages, Page } from "~/page";
import Text from "~/components/Text";
import Button from "~/components/Button";
import invariant from "tiny-invariant";

type LoaderData = {
  pages: Array<Page>;
  howToPageSlug: string;
};

export const loader: LoaderFunction = async () => {
  const pages = await getPages();
  const howToPageSlug = pages.find((page) => /how-to/gi.test(page.slug))?.slug;

  invariant(howToPageSlug, "How-to page does not exist");

  const loaderData: LoaderData = {
    pages,
    howToPageSlug,
  };

  return loaderData;
};

export default function Index() {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <Interface pages={loaderData.pages}>
      <Text variant="eyebrow" className="mb-3">
        “Death and Life are in the power of the tongue.”
      </Text>
      <Text variant="jumbo">
        New Creation Reality{" "}
        <span className="text-nctcOrange-100">Confessions</span>
      </Text>
      <Link
        prefetch="intent"
        to={`/pages/${loaderData.howToPageSlug}`}
        className="mt-4 flex max-w-fit"
      >
        <Button variant="primary">Start Confession</Button>
      </Link>
    </Interface>
  );
}
