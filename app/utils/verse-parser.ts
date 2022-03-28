import { Version, Versions } from "~/types";
import books from "./bible-abbreviations";

const replacer =
  (
    version: Version,
    replaceWith: (link: string, matchedText: string) => string
  ) =>
  (
    match: string,
    p1: string,
    p2: string,
    p3: string,
    p4: string,
    p5: string,
    str: number
  ) => {
    // match - the full match '1 John 3:16'
    // p1 - book edition ex. '1 John 3:16' => '1'
    // p2 - book ex. 'John'
    // p3 - chapter number ex. '3'
    // p4 - verse number ex. '16'
    // p5 - ending verse number, if any. ex: 'John 3:16-17' => '17'
    // str - starting index of the match

    // attempt to find corresponding abbreviation for match
    const bookAbbreviation = books[p1 ? `${p1} ${p2}` : p2];

    // if it exists
    if (bookAbbreviation) {
      //then add link to the text
      const book = bookAbbreviation && bookAbbreviation.toUpperCase(); // books['1 Corinthians'] => '1CO'
      const chapter = p3;
      const startingVerse = p4;
      const endingVerse = p5 ? `-${p5}` : "";

      const link = `https://www.bible.com/bible/${Versions[version]}/${book}.${chapter}.${startingVerse}${endingVerse}.${version}`;
      const replaced = replaceWith(link, match);
      return replaced;
    } else {
      // else, just return the text as is
      return match;
    }
  };

/**
 * @param {string} str
 * @param {keyof typeof Versions} version
 * @returns
 */
export const bibleVerseParser = (
  str: string,
  version: Version = "NKJV"
): string => {
  const contents = str.slice();

  const regex = /(?:(\d)\s{1})?(\w+)\s{1}(\d+):(\d+)(?:-?(\d+))?/gi;

  const replaced = contents.replace(
    regex,
    replacer(
      version,
      (link, matchedText) =>
        `<a href="${link}" target="_blank" rel="noopener noreferrer">${matchedText}</a>`
    )
  );

  return replaced;
};
