import path, { resolve } from "path";
import fs, { readdir } from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";
import { bibleVerseParser } from "./utils/verse-parser";

export type Page = {
  slug: string;
  title: string;
  relativePath: string;
  part?: string;
  pageNumber?: number;
};

export type PageMarkdownAttributes = {
  title: string;
  page: string;
};

// relative to the server output not the source!
const pagesPath = path.join(__dirname, "..", "pages");

function isValidPageAttributes(
  attributes: any
): attributes is PageMarkdownAttributes {
  return attributes?.title && attributes?.page;
}

/**
 * Recursively reads files within a given path to a folder
 * @param path path to read files from
 * @returns an array of files in a folder
 */
export async function readFiles(path: string) {
  const dirents = await readdir(path, { withFileTypes: true });
  const files: any = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(path, dirent.name);
      return dirent.isDirectory() ? readFiles(res) : res;
    })
  );
  return files.flat();
}

const getFileMeta = (path: string) => {
  const [relativePath, part, slug] = path.match(
    /\/pages(?:\/(.+))?\/(.+)\.md$/i
  ) as RegExpMatchArray;
  return [slug, part, relativePath];
};

export async function getPages(): Promise<Array<Page>> {
  const files = await readFiles(pagesPath);

  const structure = Promise.all(
    files.map(async (file: string) => {
      const [slug, part, relativePath] = getFileMeta(file);
      const theFile = await fs.readFile(file);
      const { attributes } = parseFrontMatter(theFile.toString());

      invariant(
        isValidPageAttributes(attributes),
        `${slug} has bad meta data!`
      );

      return {
        slug,
        part,
        pageNumber: Number(attributes.page),
        title: attributes.title,
        relativePath,
      };
    })
  );

  return structure;
}

export async function getPageMarkdown(slug: string) {
  const pagesStructure = await getPages();
  const filepath = pagesStructure.find(
    (page) => page.slug === slug
  )?.relativePath;

  invariant(filepath, `File with slug "${slug}" was not found.`);

  const file = await fs.readFile(path.join(__dirname, "..", filepath));

  return { markdown: file.toString() };
}

export async function savePageMarkdown(slug: string, markdown: string) {
  const pagesStructure = await getPages();
  const relativePath = pagesStructure.find(
    (page) => page.slug === slug
  )?.relativePath;

  invariant(relativePath, `File with slug "${slug}" was not found.`);

  const absolutePath = path.join(__dirname, "..", relativePath);
  try {
    await fs.writeFile(absolutePath, markdown);
  } catch {
    throw new Error("Error saving file");
  }

  return getPage(slug);
}

export async function getPage(slug: string) {
  const pagesStructure = await getPages();
  const filepath = pagesStructure.find(
    (page) => page.slug === slug
  )?.relativePath;

  invariant(filepath, `File with slug "${slug}" was not found.`);

  const file = await fs.readFile(path.join(__dirname, "..", filepath));

  const { attributes, body } = parseFrontMatter(file.toString());

  invariant(
    isValidPageAttributes(attributes),
    `Page ${filepath} is missing attributes`
  );

  const html = marked(body);
  return { slug, html, title: attributes.title };
}
