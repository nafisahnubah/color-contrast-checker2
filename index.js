const tinycolor = require("tinycolor2");

// WCAG 2.1 minimum contrast ratios
const WCAG_AA = 4.5; // Normal text (AA level)
const WCAG_AAA = 7; // Normal text (AAA level)
const WCAG_AA_LARGE = 3; // Large text (AA level)
const WCAG_AAA_LARGE = 4.5; // Large text (AAA level)

/**
 * Calculate the relative luminance of a color.
 */
function getRelativeLuminance(color) {
  const rgb = tinycolor(color).toRgb();
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
    switch (level) {
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