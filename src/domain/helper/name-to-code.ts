export const nameToCode = (name: string): string => {
  // Remove leading and trailing spaces
  const trimmedName: string = name.trim();
  // Convert name to lowercase
  let code: string = trimmedName.toLowerCase();
  // Replace multiple spaces with a single space
  code = code.replace(/\s{2,}/g, ' ');
  // Replace spaces between words with underscores
  code = code.replace(/\s/g, '_');
  return code;
};
