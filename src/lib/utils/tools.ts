/**
 * Sanitize the user input to turn it into a valid kebab-case string.
 * @param {string} input - The given input.
 * @returns {string}
 */
export const SanitizeInput = (input: string): string => {
  return input.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)!
             .filter(Boolean)
             .map(string => string.toLowerCase())
             .join('-');
};
