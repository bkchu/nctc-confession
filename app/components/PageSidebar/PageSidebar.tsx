import Text from "../Text";
import { Fragment } from "react";
import { NavLink } from "remix";

type Props = {
  partsWithPages: { [part: string]: { slug: string; title: string }[] };
  setOpen: (open: boolean) => void;
  open: boolean;
};

const PageSidebar = ({ partsWithPages, setOpen, open }: Props) => {
  return (
    <>
      {open && (
        <div className="fixed top-0 bottom-0 z-50 w-full h-auto p-4 overflow-scroll bg-violet-100 md:hidden">
          <div className="flex items-center justify-between mb-4">
            <Text variant="eyebrow">PAGES</Text>
            <button
              className="flex items-center justify-center w-12 h-12 md:hidden"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {Object.keys(partsWithPages).map((part) => (
            <Fragment key={part}>
              {part !== "undefined" && (
                <Text
                  variant="body"
                  className="my-2 text-sm font-bold text-violet-400"
                >
                  {part.replace(/Part \d - /, "")}
                </Text>
              )}
              <ul className="mb-8">
                {partsWithPages[part].map((page) => (
                  <li key={page.slug} className="mb-2 last:mb-0">
                    <NavLink
                      prefetch="intent"
                      to={`/pages/${page.slug}`}
                      state={page}
                      className={({ isActive }) =>
                        isActive
                          ? "font-bold bg-violet-200 block px-2 py-1 rounded-sm border-l-violet-400 border-l-4"
                          : "block px-2 py-1 pl-0"
                      }
                    >
                      <Text
                        variant="body"
                        as="span"
                        className="text-sm leading-none"
                      >
                        {page?.title}
                      </Text>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Fragment>
          ))}
        </div>
      )}
      <div className="hidden md:top-0 md:bottom-0 md:z-50 md:h-auto md:p-4 md:block md:overflow-auto md:bg-violet-100 md:w-72 md:sticky">
        <div className="flex items-center justify-between mb-4">
          <Text variant="eyebrow">PAGES</Text>
          <button
            className="flex items-center justify-center w-12 h-12 md:hidden"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {Object.keys(partsWithPages).map((part) => (
          <Fragment key={part}>
            {part !== "undefined" && (
              <Text
                variant="body"
                className="my-2 text-sm font-bold text-violet-400"
              >
                {part.replace(/Part \d - /, "")}
              </Text>
            )}
            <ul className="mb-8">
              {partsWithPages[part].map((page) => (
                <li key={page.slug} className="mb-2 last:mb-0">
                  <NavLink
                    prefetch="intent"
                    to={`/pages/${page.slug}`}
                    state={page}
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold bg-violet-200 block px-2 py-1 rounded-sm border-l-violet-400 border-l-4"
                        : "block px-2 py-1 pl-0"
                    }
                  >
                    <Text
                      variant="body"
                      as="span"
                      className="text-sm leading-none"
                    >
                      {page?.title}
                    </Text>
                  </NavLink>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default PageSidebar;
