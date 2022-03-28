import { LoaderFunction, Outlet, useLoaderData } from "remix";
import Interface from "~/components/Interface";
import { getPages, Page } from "~/page";

type LoaderData = {
  pages: Array<Page>;
};

export const loader: LoaderFunction = async () => {
  const pages = await getPages();

  const loaderData: LoaderData = {
    pages,
  };

  return loaderData;
};

const Pages = () => {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <Interface pages={loaderData.pages}>
      <Outlet />
    </Interface>
  );
};

export default Pages;
