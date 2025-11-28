/**
 * Test Utilities and Generators for Color Palette Picker
 * Provides reusable generators for property-based testing with fast-check
 */

import * as fc from 'fast-check';

/**
 * Generate a random valid hex color string
 * @returns {fc.Arbitrary<string>} Arbitrary that generates hex colors in format #RRGGBB
 */
export function hexColorArbitrary() {
  return fc.tuple(
    fc.integer({ min: 0, max: 255 }), // R
    fc.integer({ min: 0, max: 255 }), // G
    fc.integer({ min: 0, max: 255 })  // B
  ).map(([r, g, b]) => {
    const toHex = (value) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  });
}

/**
 * Generate a random valid RGB color object
 * @returns {fc.Arbitrary<{r: number, g: number, b: number}>} Arbitrary that generates RGB objects
 */
export function rgbColorArbitrary() {
  return fc.record({
    r: fc.integer({ min: 0, max: 255 }),
    g: fc.integer({ min: 0, max: 255 }),
    b: fc.integer({ min: 0, max: 255 })
  });
}

/**
 * Generate invalid color strings for error handling tests
 * @returns {fc.Arbitrary<string>} Arbitrary that generates invalid color strings
 */
export function invalidColorArbitrary() {
  return fc.oneof(
    // Empty string
    fc.constant(''),
    
    // Just hash
    fc.constant('#'),
    
    // Too short hex strings
    fc.hexaString({ minLength: 1, maxLength: 5 }).map(s => `#${s}`),
    
    // Too long hex strings
    fc.hexaString({ minLength: 7, maxLength: 12 }).map(s => `#${s}`),
    
    // Invalid characters in hex
    fc.constantFrom('#GGGGGG', '#ZZZZZZ', '#12345G', '#-12345'),
    
    // Missing hash
    fc.hexaString({ minLength: 6, maxLength: 6 }),
    
    // Wrong format entirely
    fc.constantFrom('rgb(255,0,0)', 'red', 'blue', 'hsl(0,100%,50%)', '255,0,0'),
    
    // Random strings that aren't hex colors
    fc.string({ minLength: 1, maxLength: 10 }).filter(s => !/^#[0-9a-f]{6}$/i.test(s))
  );
}

/**
 * Validate if a string is a valid hex color format (#RRGGBB)
 * @param {string} color - Color string to validate
 * @returns {boolean} True if valid hex color format
 */
export function isValidHexColor(color) {
  return /^#[0-9a-f]{6}$/i.test(color);
}

/**
 * Convert hex color string to RGB object
 * @param {string} hex - Hex color string (with or without # prefix)
 * @returns {{r: number, g: number, b: number}} RGB object with values 0-255
 */
export function hexToRgb(hex) {
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return { r, g, b };
}

/**
 * Convert RGB object to hex color string
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} Hex color string in format #RRGGBB
 */
export function rgbToHex(r, g, b) {
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  const rClamped = clamp(r);
  const gClamped = clamp(g);
  const bClamped = clamp(b);
  const toHex = (value) => value.toString(16).padStart(2, '0');
  return `#${toHex(rClamped)}${toHex(gClamped)}${toHex(bClamped)}`;
}
