const tinycolor = require("tinycolor2");

// WCAG 2.1 minimum contrast ratios
const WCAG_AA = 4.5; // Normal text (AA level)
const WCAG_AAA = 7; // Normal text (AAA level)
const WCAG_AA_LARGE = 3; // Large text (AA level)
const WCAG_AAA_LARGE = 4.5; // Large text (AAA level)

/**
 * Parse a color, throwing if it isn't a valid, fully opaque color.
 * Contrast is undefined for translucent colors without knowing the backdrop.
 */
function parseColor(color) {
  const parsed = tinycolor(color);
  if (!parsed.isValid()) {
    throw new Error(`Invalid color: ${JSON.stringify(color)}`);
  }
  if (parsed.getAlpha() < 1) {
    throw new Error(
      `Translucent colors are not supported: ${JSON.stringify(color)}`
    );
  }
  return parsed;
}

/**
 * Calculate the relative luminance of a color.
 */
function getRelativeLuminance(color) {
  const rgb = parseColor(color).toRgb();
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val /= 255;
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate the contrast ratio between two colors.
 */
function getContrastRatio(color1, color2) {
  const luminance1 = getRelativeLuminance(color1);
  const luminance2 = getRelativeLuminance(color2);
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if two colors meet WCAG contrast guidelines.
 */
function isAccessible(color1, color2, level = "AA") {
  const contrastRatio = getContrastRatio(color1, color2);
  switch (String(level).toUpperCase()) {
    case "AA":
      return contrastRatio >= WCAG_AA;
    case "AAA":
      return contrastRatio >= WCAG_AAA;
    case "AA_LARGE":
      return contrastRatio >= WCAG_AA_LARGE;
    case "AAA_LARGE":
      return contrastRatio >= WCAG_AAA_LARGE;
    default:
      throw new Error(
        "Invalid WCAG level. Use 'AA', 'AAA', 'AA_LARGE', or 'AAA_LARGE'."
      );
  }
}

module.exports = {
  getRelativeLuminance,
  getContrastRatio,
  isAccessible,
};