/**
 * Utility functions for text processing and language detection
 */

/**
 * Detects if the given text contains Khmer characters
 * @param text - The text to check
 * @returns true if text contains Khmer characters, false otherwise
 */
export const hasKhmerText = (text: string): boolean => {
  // Khmer Unicode range: U+1780-U+17FF
  const khmerRegex = /[\u1780-\u17FF]/;
  return khmerRegex.test(text);
};

/**
 * Gets the appropriate font family based on text content
 * @param text - The text to analyze
 * @param type - Font weight type ('regular', 'semiBold', 'bold')
 * @returns Font family name
 */
export const getFontForText = (
  text: string,
  type: "regular" | "semiBold" | "bold" = "regular"
): string => {
  const isKhmer = hasKhmerText(text);

  if (isKhmer) {
    switch (type) {
      case "bold":
        return "KantumruyPro_700Bold";
      case "semiBold":
        return "KantumruyPro_600SemiBold";
      default:
        return "KantumruyPro_400Regular";
    }
  } else {
    switch (type) {
      case "bold":
        return "Roboto_700Bold";
      case "semiBold":
        return "Roboto_500Medium";
      default:
        return "Roboto_400Regular";
    }
  }
};
