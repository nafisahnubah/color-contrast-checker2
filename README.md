# Color Contrast Checker

A lightweight npm package to check if two colors meet WCAG (Web Content Accessibility Guidelines) contrast guidelines. It supports various color formats and provides functions to calculate relative luminance and contrast ratio.

## Installation

Install the package using npm:

```
    npm install color-contrast-checker2
```

## Usage
- **Basic Example**
```
const { isAccessible } = require("color-contrast-checker");

// Check if two colors meet WCAG AA guidelines
console.log(isAccessible("#000000", "#ffffff")); // true
console.log(isAccessible("#000000", "#111111")); // false

// Check for WCAG AAA
console.log(isAccessible("#000000", "#ffffff", "AAA")); // true

// Check for WCAG AA_LARGE
console.log(isAccessible("#000000", "#333333", "AA_LARGE")); // true

// Check for WCAG AAA_LARGE
console.log(isAccessible("#000000", "#666666", "AAA_LARGE")); // false
```
- **Other Usage Examples**
```
const { getRelativeLuminance, getContrastRatio, isAccessible } = require("color-contrast-checker");

// Calculating relative luminance
const luminance = getRelativeLuminance("#ff0000"); // Red
console.log(luminance); // 0.2126

// Calculating contrast ratio
const contrastRatio = getContrastRatio("#000000", "#ffffff");
console.log(contrastRatio); // 21

// Checking accessibility with custom level
const accessible = isAccessible("#000000", "#ffffff", "AAA");
console.log(accessible); // true
```

## API

### `isAccessible(color1, color2, level)`
Checks if two colors meet the specified WCAG contrast level.

- **Parameters**:
  - `color1`: The first color.
  - `color2`: The second color.
  - `level` (string): The WCAG level (`"AA"`, `"AAA"`, `"AA_LARGE"`, or `"AAA_LARGE"`). Defaults to `"AA"`.
- **Returns**: `true` if the contrast is sufficient, `false` otherwise.

### `getRelativeLuminance(color)`
Calculates the relative luminance of a color.

- **Parameters**:
  - `color`: The color in any valid format.
- **Returns**: A number between `0` (black) and `1` (white).

### `getContrastRatio(color1, color2)`
Calculates the contrast ratio between two colors.

- **Parameters**:
  - `color1`: The first color.
  - `color2`: The second color.
- **Returns**: A number representing the contrast ratio.

## Supported Color Formats

The package supports a wide variety of color formats as listed below:

### **Hex**
- 3-digit HEX: `#fff`, `fff`
- 6-digit HEX: `#ffffff`, `ffffff`
- 8-digit HEX (with transparency): `#ffffff80`, `ffffff80`

### **RGB/RGBA**
- RGB string: `rgb(255, 0, 0)`, `rgb 255 0 0`, `rgb(100%, 0%, 0%)`
- RGBA string: `rgba(255, 0, 0, 0.5)`, `rgba(100%, 0%, 0%, 0.5)`
- RGB/RGBA object: `{ r: 255, g: 0, b: 0 }`, `{ r: 255, g: 0, b: 0, a: 0.5 }`
- RGB/RGBA from ratio: `{ r: 1, g: 0, b: 0 }`, `{ r: 1, g: 0, b: 0, a: 0.5 }`

### **HSL/HSLA**
- HSL string: `hsl(0, 100%, 50%)`, `hsl 0 100% 50%`, `hsl(0, 1.0, 0.5)`
- HSLA string: `hsla(0, 100%, 50%, 0.5)`, `hsla(0, 1.0, 0.5, 0.5)`
- HSL/HSLA object: `{ h: 0, s: 100, l: 50 }`, `{ h: 0, s: 100, l: 50, a: 0.5 }`
- HSL/HSLA from ratio: `{ h: 1, s: 0, l: 0 }`, `{ h: 1, s: 0, l: 0, a: 0.5 }`

### **HSV/HSVA**
- HSV string: `hsv(0, 100%, 100%)`, `hsv 0 100% 100%`, `hsv(0, 1.0, 1.0)`
- HSVA string: `hsva(0, 100%, 100%, 0.5)`, `hsva(0, 1.0, 1.0, 0.5)`
- HSV/HSVA object: `{ h: 0, s: 100, v: 100 }`, `{ h: 0, s: 100, v: 100, a: 0.5 }`
- HSV/HSVA from ratio: `{ h: 1, s: 0, v: 0 }`, `{ h: 1, s: 0, v: 0, a: 0.5 }`

### **Named CSS Colors**
- Case-insensitive predefined color names: `red`, `blue`, `green`, `blanchedalmond`, `darkblue`, etc.

### **Other Formats**
- Integer RGB: `0xff0000` (red)
- Integer RGBA: `0xff000080` (red with 50% transparency)

---

### **Permissive Parsing Rules**
- **Commas, percentages, and parentheses are optional** in most formats.
- **HSL/HSV**:
  - Saturation (S), Lightness (L), and Value (V) can be either `0%-100%` or `0-1`.
  - Hue (H) can be `0%-100%` or `0-360`.
- **RGB**:
  - Values can be `0-255` or `0%-100%`.

## WCAG (2.1) Levels

- **AA**: Minimum contrast for normal text (4.5:1).
- **AAA**: Enhanced contrast for normal text (7:1).
- **AA_LARGE**: Minimum contrast for large text (3:1).
- **AAA_LARGE**: Enhanced contrast for large text (4.5:1).