# color-contrast-checker2

A lightweight Node.js package that checks whether two colors meet the [WCAG 2.1](https://www.w3.org/TR/WCAG21/#contrast-minimum) contrast guidelines.

## Features

- Check a color pair against WCAG **AA**, **AAA**, **AA_LARGE**, or **AAA_LARGE**
- Calculate the contrast ratio (1–21) and relative luminance (0–1) of colors
- Accepts hex, `rgb()`, `hsl()`, `hsv()`, CSS color names, and color objects (parsed by [tinycolor2](https://github.com/bgrins/TinyColor))
- Throws a clear error for invalid or translucent colors instead of returning a misleading result

## Requirements

- Node.js (CommonJS `require`). Tested with Node.js 20.

## Installation

```sh
npm install color-contrast-checker2
```

## Usage

```js
const { isAccessible } = require("color-contrast-checker2");

isAccessible("#000000", "#ffffff");              // true  (AA is the default level)
isAccessible("#000000", "#111111");              // false
isAccessible("#000000", "#ffffff", "AAA");       // true
isAccessible("#000000", "#777777", "AA_LARGE");  // true
isAccessible("#000000", "#666666", "AAA_LARGE"); // false
```

Calculate the values directly:

```js
const { getContrastRatio, getRelativeLuminance } = require("color-contrast-checker2");

getContrastRatio("#000000", "#ffffff"); // 21
getContrastRatio("#767676", "white");   // 4.54…
getRelativeLuminance("#ff0000");        // 0.2126
```

## API

### `isAccessible(color1, color2, level = "AA")`

Returns `true` if the contrast ratio between the two colors meets `level`, otherwise `false`.

`level` is one of `"AA"`, `"AAA"`, `"AA_LARGE"`, or `"AAA_LARGE"` (case-insensitive). Any other value throws an error.

### `getContrastRatio(color1, color2)`

Returns the WCAG contrast ratio between the two colors, from `1` (no contrast) to `21` (black on white). The order of the colors does not matter.

### `getRelativeLuminance(color)`

Returns the WCAG relative luminance of a color, from `0` (black) to `1` (white).

### Errors

All three functions throw an `Error` if a color:

- can't be parsed (e.g. `"notacolor"`), or
- is translucent (alpha below 1, e.g. `"rgba(0, 0, 0, 0.5)"` or `"transparent"`). Contrast depends on what's behind a translucent color, so blend it with its background first.

## Supported color formats

| Format | Examples |
| --- | --- |
| Hex (with or without `#`) | `#fff`, `fff`, `#ffffff`, `ffffffff` |
| RGB | `rgb(255, 0, 0)`, `rgb 255 0 0`, `rgb(100%, 0%, 0%)`, `{ r: 255, g: 0, b: 0 }` |
| HSL | `hsl(0, 100%, 50%)`, `hsl 0 100% 50%`, `hsl(0, 1.0, 0.5)`, `{ h: 0, s: 100, l: 50 }` |
| HSV | `hsv(0, 100%, 100%)`, `hsv 0 100% 100%`, `hsv(0, 1.0, 1.0)`, `{ h: 0, s: 100, v: 100 }` |
| CSS color names (case-insensitive) | `red`, `RED`, `darkblue`, `blanchedalmond` |

Formats with an alpha channel (`rgba()`, `hsla()`, 8-digit hex, objects with `a`) are accepted only when fully opaque (alpha = 1).

## WCAG 2.1 levels

| Level | Minimum ratio | Applies to |
| --- | --- | --- |
| `AA` | 4.5:1 | Normal text |
| `AAA` | 7:1 | Normal text |
| `AA_LARGE` | 3:1 | Large text |
| `AAA_LARGE` | 4.5:1 | Large text |
