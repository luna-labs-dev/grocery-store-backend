export const nameToCode = (name: string): string => {
  // Remove accents from letters
  const normalized = name.normalize('NFD').replace(/\p{M}/gu, '');
  // Remove special characters and non-word characters
  const cleanedName = normalized.replace(/[^\w\s]/gi, '');
  // Remove leading and trailing spaces
  const trimmedName: string = cleanedName.trim();
  // Convert name to lowercase
  let code: string = trimmedName.toLowerCase();
  // Replace multiple spaces with a single space
  code = code.replace(/\s{2,}/g, ' ');
  // Replace spaces between words with underscores
  code = code.replace(/\s/g, '_');
  return code;
};

// const name = 'Assai Goiania';
// const code = nameToCode(name);
// console.log(code);
