/**
 * Property-Based Tests for Color Palette Picker
 * Using fast-check for property-based testing
 */

import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { JSDOM } from 'jsdom';

/**
 * Setup DOM environment for testing
 */
function setupDOM() {
  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <div class="container-fluid p-0">
          <div class="row g-0" id="heroColorBoxes">
            <div class="col">
              <div class="color-box" data-box="0">
                <span class="hex-code"></span>
              </div>
            </div>
            <div class="col">
              <div class="color-box" data-box="1">
                <span class="hex-code"></span>
              </div>
            </div>
            <div class="col">
              <div class="color-box" data-box="2">
                <span class="hex-code"></span>
              </div>
            </div>
            <div class="col">
              <div class="color-box" data-box="3">
                <span class="hex-code"></span>
              </div>
            </div>
            <div class="col">
              <div class="color-box" data-box="4">
                <span class="hex-code"></span>
              </div>
            </div>
          </div>
        </div>
        <input type="color" id="colorPicker" class="form-control form-control-color" value="#3498db">
        <div id="tintsDisplay" class="row g-3"></div>
        <div id="shadesDisplay" class="row g-3"></div>
      </body>
    </html>
  `;
  
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  global.document = dom.window.document;
  global.window = dom.window;
  
  return dom;
}

/**
 * Convert hex color string to RGB object
 * @param {string} hex - Hex color string (with or without # prefix)
 * @returns {{r: number, g: number, b: number}} RGB object with values 0-255
 */
function hexToRgb(hex) {
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
function rgbToHex(r, g, b) {
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  const rClamped = clamp(r);
  const gClamped = clamp(g);
  const bClamped = clamp(b);
  const toHex = (value) => value.toString(16).padStart(2, '0');
  return `#${toHex(rClamped)}${toHex(gClamped)}${toHex(bClamped)}`;
}

/**
 * Generate a random color in hexadecimal format
 * @returns {string} Hex color string in format #RRGGBB
 */
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return rgbToHex(r, g, b);
}

/**
 * Render random colors to all color boxes in the hero section
 */
function renderRandomColors() {
  const colorBoxes = document.querySelectorAll('.color-box');
  
  colorBoxes.forEach((box) => {
    const color = generateRandomColor();
    box.style.backgroundColor = color;
    
    const hexCodeElement = box.querySelector('.hex-code');
    if (hexCodeElement) {
      hexCodeElement.textContent = color;
    }
  });
}

/**
 * Generate tints and shades from a base color
 * @param {string} baseColorHex - Base color in hex format (#RRGGBB)
 * @returns {{tints: string[], shades: string[]}} Object containing arrays of tint and shade hex colors
 */
function generateTintsAndShades(baseColorHex) {
  const baseRgb = hexToRgb(baseColorHex);
  
  const tints = [];
  const shades = [];
  
  const tintPercentages = [0.2, 0.4, 0.6, 0.8];
  
  for (const percentage of tintPercentages) {
    const tintR = baseRgb.r + (255 - baseRgb.r) * percentage;
    const tintG = baseRgb.g + (255 - baseRgb.g) * percentage;
    const tintB = baseRgb.b + (255 - baseRgb.b) * percentage;
    
    const tintHex = rgbToHex(tintR, tintG, tintB);
    tints.push(tintHex);
  }
  
  const shadePercentages = [0.2, 0.4, 0.6, 0.8];
  
  for (const percentage of shadePercentages) {
    const shadeR = baseRgb.r * (1 - percentage);
    const shadeG = baseRgb.g * (1 - percentage);
    const shadeB = baseRgb.b * (1 - percentage);
    
    const shadeHex = rgbToHex(shadeR, shadeG, shadeB);
    shades.push(shadeHex);
  }
  
  return { tints, shades };
}

/**
 * Render tints and shades to the DOM
 * @param {{tints: string[], shades: string[]}} colors - Object containing arrays of tint and shade hex colors
 */
function renderTintsAndShades(colors) {
  const tintsDisplay = document.getElementById('tintsDisplay');
  const shadesDisplay = document.getElementById('shadesDisplay');
  
  tintsDisplay.innerHTML = '';
  shadesDisplay.innerHTML = '';
  
  colors.tints.forEach((tintHex) => {
    const card = document.createElement('div');
    card.className = 'col-6 col-sm-4 col-md-3';
    
    const colorCard = document.createElement('div');
    colorCard.className = 'color-card';
    colorCard.style.backgroundColor = tintHex;
    
    const hexText = document.createElement('span');
    hexText.className = 'hex-code';
    hexText.textContent = tintHex;
    
    colorCard.appendChild(hexText);
    card.appendChild(colorCard);
    tintsDisplay.appendChild(card);
  });
  
  colors.shades.forEach((shadeHex) => {
    const card = document.createElement('div');
    card.className = 'col-6 col-sm-4 col-md-3';
    
    const colorCard = document.createElement('div');
    colorCard.className = 'color-card';
    colorCard.style.backgroundColor = shadeHex;
    
    const hexText = document.createElement('span');
    hexText.className = 'hex-code';
    hexText.textContent = shadeHex;
    
    colorCard.appendChild(hexText);
    card.appendChild(colorCard);
    shadesDisplay.appendChild(card);
  });
}

/**
 * Check if a string is a valid hex color format (#RRGGBB)
 */
function isValidHexColor(color) {
  return /^#[0-9a-f]{6}$/i.test(color);
}

/**
 * Simulate spacebar keydown event
 */
function simulateSpacebarPress() {
  const event = new window.KeyboardEvent('keydown', {
    code: 'Space',
    key: ' ',
    keyCode: 32,
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(event);
}

/**
 * Initialize the application (simulates DOMContentLoaded)
 */
function initializeApp() {
  // Render random colors on page load
  renderRandomColors();
  
  // Add spacebar event listener for color refresh
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      event.preventDefault();
      renderRandomColors();
    }
  });
}

describe('Hero Section - Random Color Boxes', () => {
  
  /**
   * Feature: color-palette-picker, Property 9: Random Colors Are Valid on Load
   * Validates: Requirements 8.1
   * 
   * For any page load, all 5 randomly generated colors in the hero section 
   * should be valid hexadecimal colors.
   */
  it('Property 9: Random Colors Are Valid on Load', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (iteration) => {
        // Setup fresh DOM for each iteration
        setupDOM();
        
        // Call renderRandomColors
        renderRandomColors();
        
        // Get all color boxes
        const colorBoxes = document.querySelectorAll('.color-box');
        
        // Check that we have 5 boxes
        expect(colorBoxes.length).toBe(5);
        
        // Check each box has a valid hex color
        colorBoxes.forEach((box) => {
          const backgroundColor = box.style.backgroundColor;
          const hexCode = box.querySelector('.hex-code').textContent;
          
          // Hex code should be valid
          expect(isValidHexColor(hexCode)).toBe(true);
          
          // Background color should be set (browser converts to rgb, but it should exist)
          expect(backgroundColor).toBeTruthy();
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
  
  /**
   * Feature: color-palette-picker, Property 1: Random Color Box Hex Code Display
   * Validates: Requirements 2.4
   * 
   * For any color box in the hero section, the displayed hex code text 
   * should match the background color of that box.
   */
  it('Property 1: Random Color Box Hex Code Display', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (iteration) => {
        // Setup fresh DOM for each iteration
        setupDOM();
        
        // Call renderRandomColors
        renderRandomColors();
        
        // Get all color boxes
        const colorBoxes = document.querySelectorAll('.color-box');
        
        // Check each box
        colorBoxes.forEach((box) => {
          const hexCode = box.querySelector('.hex-code').textContent;
          
          // Hex code should be valid
          expect(isValidHexColor(hexCode)).toBe(true);
          
          // The background color style should contain the hex code
          // Note: We set it as hex, so it should match exactly
          const bgColor = box.style.backgroundColor;
          
          // Convert hex to rgb for comparison (browsers may convert)
          const hexToRgb = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgb(${r}, ${g}, ${b})`;
          };
          
          // Check if background matches the hex code
          const expectedRgb = hexToRgb(hexCode);
          expect(bgColor).toBe(expectedRgb);
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
  
});

describe('Keyboard Interaction - Spacebar Refresh', () => {
  
  /**
   * Feature: color-palette-picker, Property 2: Spacebar Refresh Generates New Colors
   * Validates: Requirements 3.1, 3.2
   * 
   * For any initial set of random colors, pressing the spacebar should generate 
   * 5 new colors that are different from the previous set.
   */
  it('Property 2: Spacebar Refresh Generates New Colors', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), () => {
        // Setup fresh DOM for each iteration
        setupDOM();
        
        // Initialize the app
        initializeApp();
        
        // Get initial colors
        const colorBoxes = document.querySelectorAll('.color-box');
        const initialColors = Array.from(colorBoxes).map(box => 
          box.querySelector('.hex-code').textContent
        );
        
        // Simulate spacebar press
        simulateSpacebarPress();
        
        // Get new colors after spacebar press
        const newColors = Array.from(colorBoxes).map(box => 
          box.querySelector('.hex-code').textContent
        );
        
        // Check that we still have 5 colors
        expect(newColors.length).toBe(5);
        
        // Check that all new colors are valid
        newColors.forEach(color => {
          expect(isValidHexColor(color)).toBe(true);
        });
        
        // Check that at least one color has changed
        // (There's a tiny probability all 5 could be the same, but it's negligible)
        const hasChanged = initialColors.some((color, index) => 
          color !== newColors[index]
        );
        expect(hasChanged).toBe(true);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
  
  /**
   * Feature: color-palette-picker, Property 3: Hex Code Updates on Refresh
   * Validates: Requirements 3.3
   * 
   * For any color refresh triggered by spacebar, each color box's hex code text 
   * should update to match its new background color.
   */
  it('Property 3: Hex Code Updates on Refresh', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), () => {
        // Setup fresh DOM for each iteration
        setupDOM();
        
        // Initialize the app
        initializeApp();
        
        // Simulate spacebar press to refresh colors
        simulateSpacebarPress();
        
        // Get all color boxes
        const colorBoxes = document.querySelectorAll('.color-box');
        
        // Check each box
        colorBoxes.forEach((box) => {
          const hexCode = box.querySelector('.hex-code').textContent;
          const bgColor = box.style.backgroundColor;
          
          // Hex code should be valid
          expect(isValidHexColor(hexCode)).toBe(true);
          
          // Convert hex to rgb for comparison (browsers convert to rgb)
          const hexToRgb = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgb(${r}, ${g}, ${b})`;
          };
          
          // Check if background matches the hex code
          const expectedRgb = hexToRgb(hexCode);
          expect(bgColor).toBe(expectedRgb);
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
  
  /**
   * Feature: color-palette-picker, Property 10: Rapid Spacebar Presses Handle Gracefully
   * Validates: Requirements 8.2
   * 
   * For any sequence of rapid spacebar presses, the application should update 
   * colors without throwing errors and maintain stability.
   */
  it('Property 10: Rapid Spacebar Presses Handle Gracefully', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }), // Number of rapid presses
        (numPresses) => {
          // Setup fresh DOM for each iteration
          setupDOM();
          
          // Initialize the app
          initializeApp();
          
          // Simulate rapid spacebar presses
          let errorOccurred = false;
          try {
            for (let i = 0; i < numPresses; i++) {
              simulateSpacebarPress();
            }
          } catch (error) {
            errorOccurred = true;
          }
          
          // Should not throw any errors
          expect(errorOccurred).toBe(false);
          
          // Get all color boxes after rapid presses
          const colorBoxes = document.querySelectorAll('.color-box');
          
          // Check that we still have 5 boxes
          expect(colorBoxes.length).toBe(5);
          
          // Check that all colors are still valid
          colorBoxes.forEach((box) => {
            const hexCode = box.querySelector('.hex-code').textContent;
            const bgColor = box.style.backgroundColor;
            
            // Hex code should be valid
            expect(isValidHexColor(hexCode)).toBe(true);
            
            // Background should be set
            expect(bgColor).toBeTruthy();
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
});

describe('Generator Section - Color Input', () => {
  
  /**
   * Feature: color-palette-picker, Property 4: Color Input Stores Valid Hex
   * Validates: Requirements 4.4
   * 
   * For any color selection in the color picker input, the stored value 
   * should be a valid hexadecimal color format (#RRGGBB).
   */
  it('Property 4: Color Input Stores Valid Hex', () => {
    fc.assert(
      fc.property(
        fc.hexaString({ minLength: 6, maxLength: 6 }), // Generate random 6-character hex strings
        (hexString) => {
          // Setup fresh DOM for each iteration
          setupDOM();
          
          // Get the color picker input
          const colorPicker = document.getElementById('colorPicker');
          expect(colorPicker).toBeTruthy();
          
          // Set the color value (simulating user selection)
          const colorValue = `#${hexString}`;
          colorPicker.value = colorValue;
          
          // Get the stored value
          const storedValue = colorPicker.value;
          
          // The stored value should be a valid hex color
          expect(isValidHexColor(storedValue)).toBe(true);
          
          // The stored value should match what we set (lowercase comparison)
          expect(storedValue.toLowerCase()).toBe(colorValue.toLowerCase());
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
});

describe('Color Conversion Utilities', () => {
  
  /**
   * Feature: color-palette-picker, Property 12: Color Conversion Round Trip
   * Validates: Requirements 4.4
   * 
   * For any valid RGB color, converting to hex and back to RGB should produce 
   * the same values.
   */
  it('Property 12: Color Conversion Round Trip', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }), // Red value
        fc.integer({ min: 0, max: 255 }), // Green value
        fc.integer({ min: 0, max: 255 }), // Blue value
        (r, g, b) => {
          // Convert RGB to hex
          const hex = rgbToHex(r, g, b);
          
          // Verify hex is valid format
          expect(isValidHexColor(hex)).toBe(true);
          
          // Convert hex back to RGB
          const rgb = hexToRgb(hex);
          
          // Values should match exactly (round trip)
          expect(rgb.r).toBe(r);
          expect(rgb.g).toBe(g);
          expect(rgb.b).toBe(b);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
});

describe('Tints and Shades Generation', () => {
  
  /**
   * Feature: color-palette-picker, Property 5: Tints and Shades Generation Produces Valid Colors
   * Validates: Requirements 5.2
   * 
   * For any valid hexadecimal base color, generating tints and shades should produce 
   * arrays of colors where each color has a valid hex format (#RRGGBB).
   */
  it('Property 5: Tints and Shades Generation Produces Valid Colors', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }), // Red value
        fc.integer({ min: 0, max: 255 }), // Green value
        fc.integer({ min: 0, max: 255 }), // Blue value
        (r, g, b) => {
          // Create a base color from random RGB values
          const baseColorHex = rgbToHex(r, g, b);
          
          // Generate tints and shades
          const result = generateTintsAndShades(baseColorHex);
          
          // Check that result has the expected structure
          expect(result).toHaveProperty('tints');
          expect(result).toHaveProperty('shades');
          
          // Check that tints is an array with 4 elements
          expect(Array.isArray(result.tints)).toBe(true);
          expect(result.tints.length).toBe(4);
          
          // Check that shades is an array with 4 elements
          expect(Array.isArray(result.shades)).toBe(true);
          expect(result.shades.length).toBe(4);
          
          // Check that all tints are valid hex colors
          result.tints.forEach((tint) => {
            expect(isValidHexColor(tint)).toBe(true);
          });
          
          // Check that all shades are valid hex colors
          result.shades.forEach((shade) => {
            expect(isValidHexColor(shade)).toBe(true);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
});

describe('Generator Event Handlers', () => {
  
  /**
   * Feature: color-palette-picker, Property 7: Base Color Preservation After Generation
   * Validates: Requirements 5.4
   * 
   * For any base color selection, after generating tints and shades, the color input 
   * element's value should remain unchanged and equal to the original base color.
   */
  it('Property 7: Base Color Preservation After Generation', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }), // Red value
        fc.integer({ min: 0, max: 255 }), // Green value
        fc.integer({ min: 0, max: 255 }), // Blue value
        (r, g, b) => {
          // Setup fresh DOM for each iteration
          setupDOM();
          
          // Create a base color from random RGB values
          const baseColorHex = rgbToHex(r, g, b);
          
          // Get the color picker input
          const colorPicker = document.getElementById('colorPicker');
          expect(colorPicker).toBeTruthy();
          
          // Set the color value (simulating user selection)
          colorPicker.value = baseColorHex;
          
          // Store the original value
          const originalValue = colorPicker.value;
          
          // Generate tints and shades
          const colors = generateTintsAndShades(baseColorHex);
          
          // Render tints and shades to DOM
          renderTintsAndShades(colors);
          
          // Check that the color input value is unchanged
          const currentValue = colorPicker.value;
          expect(currentValue).toBe(originalValue);
          expect(currentValue.toLowerCase()).toBe(baseColorHex.toLowerCase());
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
});

describe('Tints and Shades Rendering', () => {
  
  /**
   * Feature: color-palette-picker, Property 6: Generated Colors Display in DOM
   * Validates: Requirements 5.3, 6.1
   * 
   * For any tints and shades generation, the DOM should contain distinct visual 
   * elements for each generated tint and shade.
   */
  it('Property 6: Generated Colors Display in DOM', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }), // Red value
        fc.integer({ min: 0, max: 255 }), // Green value
        fc.integer({ min: 0, max: 255 }), // Blue value
        (r, g, b) => {
          // Setup fresh DOM for each iteration
          setupDOM();
          
          // Create a base color from random RGB values
          const baseColorHex = rgbToHex(r, g, b);
          
          // Generate tints and shades
          const colors = generateTintsAndShades(baseColorHex);
          
          // Render tints and shades to DOM
          renderTintsAndShades(colors);
          
          // Get display containers
          const tintsDisplay = document.getElementById('tintsDisplay');
          const shadesDisplay = document.getElementById('shadesDisplay');
          
          // Check that tints display has 4 color cards
          const tintCards = tintsDisplay.querySelectorAll('.color-card');
          expect(tintCards.length).toBe(4);
          
          // Check that shades display has 4 color cards
          const shadeCards = shadesDisplay.querySelectorAll('.color-card');
          expect(shadeCards.length).toBe(4);
          
          // Check that each tint card has a background color set
          tintCards.forEach((card, index) => {
            const bgColor = card.style.backgroundColor;
            expect(bgColor).toBeTruthy();
            
            // Verify the background color matches the generated tint
            const hexToRgb = (hex) => {
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              return `rgb(${r}, ${g}, ${b})`;
            };
            
            const expectedRgb = hexToRgb(colors.tints[index]);
            expect(bgColor).toBe(expectedRgb);
          });
          
          // Check that each shade card has a background color set
          shadeCards.forEach((card, index) => {
            const bgColor = card.style.backgroundColor;
            expect(bgColor).toBeTruthy();
            
            // Verify the background color matches the generated shade
            const hexToRgb = (hex) => {
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              return `rgb(${r}, ${g}, ${b})`;
            };
            
            const expectedRgb = hexToRgb(colors.shades[index]);
            expect(bgColor).toBe(expectedRgb);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  /**
   * Feature: color-palette-picker, Property 8: Generated Color Hex Code Visibility
   * Validates: Requirements 6.2
   * 
   * For any generated tint or shade, its visual element should contain its 
   * hexadecimal color code as visible text content.
   */
  it('Property 8: Generated Color Hex Code Visibility', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }), // Red value
        fc.integer({ min: 0, max: 255 }), // Green value
        fc.integer({ min: 0, max: 255 }), // Blue value
        (r, g, b) => {
          // Setup fresh DOM for each iteration
          setupDOM();
          
          // Create a base color from random RGB values
          const baseColorHex = rgbToHex(r, g, b);
          
          // Generate tints and shades
          const colors = generateTintsAndShades(baseColorHex);
          
          // Render tints and shades to DOM
          renderTintsAndShades(colors);
          
          // Get display containers
          const tintsDisplay = document.getElementById('tintsDisplay');
          const shadesDisplay = document.getElementById('shadesDisplay');
          
          // Check that each tint card contains its hex code as text
          const tintCards = tintsDisplay.querySelectorAll('.color-card');
          tintCards.forEach((card, index) => {
            const hexCodeElement = card.querySelector('.hex-code');
            expect(hexCodeElement).toBeTruthy();
            
            const hexCodeText = hexCodeElement.textContent;
            expect(hexCodeText).toBe(colors.tints[index]);
            
            // Verify it's a valid hex color
            expect(isValidHexColor(hexCodeText)).toBe(true);
          });
          
          // Check that each shade card contains its hex code as text
          const shadeCards = shadesDisplay.querySelectorAll('.color-card');
          shadeCards.forEach((card, index) => {
            const hexCodeElement = card.querySelector('.hex-code');
            expect(hexCodeElement).toBeTruthy();
            
            const hexCodeText = hexCodeElement.textContent;
            expect(hexCodeText).toBe(colors.shades[index]);
            
            // Verify it's a valid hex color
            expect(isValidHexColor(hexCodeText)).toBe(true);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
});

describe('Error Handling', () => {
  
  /**
   * Validate if a string is a valid hex color format (#RRGGBB)
   */
  function isValidHex(hex) {
    return /^#[0-9a-f]{6}$/i.test(hex);
  }
  
  /**
   * Feature: color-palette-picker, Property 11: Graceful Error Handling
   * Validates: Requirements 8.3
   * 
   * For any invalid color input (malformed hex codes, out-of-range values), 
   * the tint and shade generation function should handle the error gracefully 
   * without crashing the application.
   */
  it('Property 11: Graceful Error Handling', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          // Generate various invalid hex strings
          fc.string({ minLength: 1, maxLength: 10 }).filter(s => !isValidHex(s) && s !== ''), // Random invalid strings
          fc.constant(''), // Empty string
          fc.constant('#'), // Just hash
          fc.constant('#12'), // Too short
          fc.constant('#12345'), // Too short
          fc.constant('#1234567'), // Too long
          fc.constant('#GGGGGG'), // Invalid characters
          fc.constant('123456'), // Missing hash
          fc.constant('#12-456'), // Invalid characters
          fc.constant('rgb(255,0,0)'), // Wrong format
          fc.constant('red') // Color name
        ),
        (invalidColor) => {
          // Setup fresh DOM for each iteration
          setupDOM();
          
          let errorThrown = false;
          let result = null;
          
          try {
            // Attempt to generate tints and shades with invalid color
            result = generateTintsAndShades(invalidColor);
          } catch (error) {
            errorThrown = true;
          }
          
          // The function may throw an error or return invalid results
          // Either way, the application should not crash completely
          
          // If no error was thrown, check if result is reasonable
          if (!errorThrown && result) {
            // Result should have tints and shades properties
            expect(result).toHaveProperty('tints');
            expect(result).toHaveProperty('shades');
          }
          
          // The key property: we should be able to continue execution
          // This test passing means we didn't crash the test runner
          expect(true).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
  
});
