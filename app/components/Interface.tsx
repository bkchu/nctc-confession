import groupBy from "lodash.groupby";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "remix";
import { Page } from "~/page";
import { useVersionContext } from "~/providers/VersionContext";
import { Version, Versions } from "~/types";
import PageSidebar from "./PageSidebar/PageSidebar";
import Select from "./Select";
import Text from "./Text";

type Props = {
  pages: Array<Page>;
  children: ReactNode;
};

const Interface = ({ children, pages }: Props) => {
  const [open, setOpen] = useState(false);
  const { setVersion, version } = useVersionContext();
  const versions = Object.keys(Versions).map((key) => ({
    label: key,
    onClick: () => setVersion(key as Version),
  }));

  const partsWithPages = useMemo(() => groupBy(pages, "part"), [pages]);

  useEffect(() => {
    if (open) {
      document.querySelector("body")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <div className="grid max-w-screen-lg grid-cols-12 gap-4 mx-auto">
      <div className="flex items-center justify-between col-span-12 p-4">
        <Link to="/" className="flex items-center">
          <svg
            className="w-12 h-12"
            width="274"
            height="307"
            viewBox="0 0 274 307"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M146.217 27.4401V145.04H113.624L68.9364 91.6162V145.04H30.2963V27.4401H62.8884L107.576 80.8642V27.4401H146.217Z"
              className="fill-violet-500"
            />
            <path
              d="M70.3923 190.184H35.9523V159.44H144.481V190.184H110.04V277.041H70.3923V190.184Z"
              className="fill-violet-500"
            />
            <path
              d="M220.073 147.728C207.641 147.728 196.441 145.152 186.473 140C176.505 134.736 168.665 127.456 162.953 118.16C157.353 108.752 154.553 98.1122 154.553 86.2402C154.553 74.3682 157.353 63.7841 162.953 54.4881C168.665 45.0801 176.505 37.8001 186.473 32.6481C196.441 27.384 207.641 24.752 220.073 24.752C231.497 24.752 241.689 26.768 250.649 30.8001C259.609 34.8321 267.001 40.6561 272.825 48.2721L247.793 70.6161C240.513 61.4321 231.945 56.8401 222.089 56.8401C213.801 56.8401 207.137 59.5281 202.097 64.9041C197.057 70.1681 194.537 77.2802 194.537 86.2402C194.537 95.2002 197.057 102.368 202.097 107.744C207.137 113.008 213.801 115.64 222.089 115.64C231.945 115.64 240.513 111.048 247.793 101.864L272.825 124.208C267.001 131.824 259.609 137.648 250.649 141.68C241.689 145.712 231.497 147.728 220.073 147.728Z"
              className="fill-violet-500"
            />
            <path
              d="M220.073 279.729C207.641 279.729 196.441 277.153 186.473 272.001C176.505 266.737 168.665 259.457 162.953 250.161C157.353 240.753 154.553 230.113 154.553 218.241C154.553 206.369 157.353 195.784 162.953 186.488C168.665 177.08 176.505 169.8 186.473 164.648C196.441 159.384 207.641 156.752 220.073 156.752C231.497 156.752 241.689 158.768 250.649 162.8C259.609 166.832 267.001 172.656 272.825 180.272L247.793 202.617C240.513 193.432 231.945 188.84 222.089 188.84C213.801 188.84 207.137 191.528 202.097 196.904C197.057 202.169 194.537 209.281 194.537 218.241C194.537 227.201 197.057 234.369 202.097 239.745C207.137 245.009 213.801 247.641 222.089 247.641C231.945 247.641 240.513 243.049 247.793 233.865L272.825 256.209C267.001 263.825 259.609 269.649 250.649 273.681C241.689 277.713 231.497 279.729 220.073 279.729Z"
              className="fill-violet-500"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H273.841V16.8H16.8V290.081H273.841V306.881H0V0Z"
              className="fill-violet-500"
            />
          </svg>

          <Text variant="h2" className="hidden ml-4 text-xl md:block">
            Confession
          </Text>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <Select defaultValue={version} items={versions} />
          <button
            className="flex items-center justify-center w-12 h-12 md:hidden"
            onClick={() => setOpen(true)}
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-start col-span-12">
        <PageSidebar
          setOpen={setOpen}
          open={open}
          partsWithPages={partsWithPages}
        />

        <div className="w-full md:w-[calc(100%_-_18rem)]">
          <div className="p-4 mx-auto max-w-prose">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
