import clsx from "clsx";
import { useVersionContext } from "~/providers/VersionContext";
import { bibleVerseParser } from "~/utils/verse-parser";
import { usePage } from "../$slug";

export default function PagesSlug() {
  const page = usePage();
  const { version } = useVersionContext();
  const aStyles = [
    "prose-a:text-violet-500",
    "prose-a:relative",
    "prose-a:no-underline",
    "prose-a:whitespace-nowrap",
    "after:prose-a:h-[2px]",
    "after:prose-a:scale-x-0",
    "after:prose-a:transition-transform",
    "after:prose-a:duration-[250ms]",
    "after:prose-a:ease-linear",
    "after:prose-a:origin-left",
    "after:prose-a:left-0",
    "after:prose-a:-bottom-1",
    "after:prose-a:w-full",
    "after:prose-a:block",
    "after:prose-a:absolute",
    "after:hover:prose-a:bg-current",
    "after:hover:prose-a:scale-x-100",
  ];

  const proseStyles = clsx(
    "prose lg:prose-lg max-w-prose prose-slate",
    aStyles
  );

  return (
    <div
      className={proseStyles}
      dangerouslySetInnerHTML={{ __html: bibleVerseParser(page.html, version) }}
    />
  );
}
