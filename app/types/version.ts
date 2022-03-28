export const Versions = {
  AMPC: 8,
  // ESV - template verse - https://www.bible.com/bible/59/2CO.13.4-5.ESV
  ESV: 59,
  // KJV - template verse - https://www.bible.com/bible/1/2CO.13.4-5.KJV
  KJV: 1,
  // NKJV - template verse - https://www.bible.com/bible/114/2CO.13.4-5.NKJV
  NKJV: 114,
  TPT: 1849,
  KRV: 88,
};

export type Version = keyof typeof Versions;
