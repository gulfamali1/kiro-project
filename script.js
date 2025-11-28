// Color Palette Picker JavaScript

/**
 * Convert hex color string to RGB object
 * @param {string} hex - Hex color string (with or without # prefix)
 * @returns {{r: number, g: number, b: number}} RGB object with values 0-255
 */
function hexToRgb(hex) {
    // Remove # prefix if present
    const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
    
    // Parse hex values to decimal
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
    // Clamp values to 0-255 range
    const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
    
    const rClamped = clamp(r);
    const gClamped = clamp(g);
    const bClamped = clamp(b);
    
    // Convert to hex with zero-padding
    const toHex = (value) => value.toString(16).padStart(2, '0');
    
    return `#${toHex(rClamped)}${toHex(gClamped)}${toHex(bClamped)}`;
}

/**
 * Generate a random color in hexadecimal format
 * @returns {string} Hex color string in format #RRGGBB
 */
function generateRandomColor() {
    // Generate random R, G, B values (0-255)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // Use rgbToHex for consistency
    return rgbToHex(r, g, b);
}

/**
 * Render random colors to all color boxes in the hero section
 * Generates 5 random colors and updates each box's background and hex code text
 */
function renderRandomColors() {
    const colorBoxes = document.querySelectorAll('.color-box');
    
    colorBoxes.forEach((box) => {
        // Generate a random color
        const color = generateRandomColor();
        
        // Update box background color
        box.style.backgroundColor = color;
        
        // Update hex code text
        const hexCodeElement = box.querySelector('.hex-code');
        if (hexCodeElement) {
            hexCodeElement.textContent = color;
            // Set text color based on background brightness
            hexCodeElement.style.color = getTextColor(color);
        }
    });
}

/**
 * Generate tints and shades from a base color
 * @param {string} baseColorHex - Base color in hex format (#RRGGBB)
 * @returns {{tints: string[], shades: string[]}} Object containing arrays of tint and shade hex colors
 */
function generateTintsAndShades(baseColorHex) {
    // Convert base color to RGB
    const baseRgb = hexToRgb(baseColorHex);
    
    const tints = [];
    const shades = [];
    
    // Generate 4 tints by mixing with white (20%, 40%, 60%, 80%)
    const tintPercentages = [0.2, 0.4, 0.6, 0.8];
    
    for (const percentage of tintPercentages) {
        // Mix with white (255, 255, 255)
        const tintR = baseRgb.r + (255 - baseRgb.r) * percentage;
        const tintG = baseRgb.g + (255 - baseRgb.g) * percentage;
        const tintB = baseRgb.b + (255 - baseRgb.b) * percentage;
        
        // Convert back to hex
        const tintHex = rgbToHex(tintR, tintG, tintB);
        tints.push(tintHex);
    }
    
    // Generate 4 shades by mixing with black (20%, 40%, 60%, 80%)
    const shadePercentages = [0.2, 0.4, 0.6, 0.8];
    
    for (const percentage of shadePercentages) {
        // Mix with black (0, 0, 0) by reducing intensity
        const shadeR = baseRgb.r * (1 - percentage);
        const shadeG = baseRgb.g * (1 - percentage);
        const shadeB = baseRgb.b * (1 - percentage);
        
        // Convert back to hex
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
    // Get display containers
    const tintsDisplay = document.getElementById('tintsDisplay');
    const shadesDisplay = document.getElementById('shadesDisplay');
    
    // Clear existing displays
    tintsDisplay.innerHTML = '';
    shadesDisplay.innerHTML = '';
    
    // Create and append tint cards
    colors.tints.forEach((tintHex) => {
        // Create color card
        const card = document.createElement('div');
        card.className = 'col-6 col-sm-4 col-md-3';
        
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.style.backgroundColor = tintHex;
        
        // Create hex code text element
        const hexText = document.createElement('span');
        hexText.className = 'hex-code';
        hexText.textContent = tintHex;
        // Set text color based on background brightness
        hexText.style.color = getTextColor(tintHex);
        
        // Append elements
        colorCard.appendChild(hexText);
        card.appendChild(colorCard);
        tintsDisplay.appendChild(card);
    });
    
    // Create and append shade cards
    colors.shades.forEach((shadeHex) => {
        // Create color card
        const card = document.createElement('div');
        card.className = 'col-6 col-sm-4 col-md-3';
        
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.style.backgroundColor = shadeHex;
        
        // Create hex code text element
        const hexText = document.createElement('span');
        hexText.className = 'hex-code';
        hexText.textContent = shadeHex;
        // Set text color based on background brightness
        hexText.style.color = getTextColor(shadeHex);
        
        // Append elements
        colorCard.appendChild(hexText);
        card.appendChild(colorCard);
        shadesDisplay.appendChild(card);
    });
}

/**
 * Validate if a string is a valid hex color format (#RRGGBB)
 * @param {string} hex - String to validate
 * @returns {boolean} True if valid hex color format
 */
function isValidHex(hex) {
    return /^#[0-9a-f]{6}$/i.test(hex);
}

/**
 * Calculate relative luminance of a color to determine if text should be white or black
 * Uses WCAG formula for relative luminance
 * @param {string} hex - Hex color string
 * @returns {string} 'white' for dark backgrounds, 'black' for light backgrounds
 */
function getTextColor(hex) {
    const rgb = hexToRgb(hex);
    
    // Convert RGB to relative luminance using WCAG formula
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    // Apply gamma correction
    const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Calculate relative luminance
    const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
    
    // Return white text for dark backgrounds (luminance < 0.5), black for light backgrounds
    return luminance > 0.5 ? 'black' : 'white';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Color Palette Picker loaded');
    
    // Render random colors on page load
    renderRandomColors();
    
    // Add spacebar event listener for color refresh
    document.addEventListener('keydown', function(event) {
        // Check for spacebar key
        if (event.code === 'Space') {
            // Prevent default scrolling behavior
            event.preventDefault();
            
            // Refresh colors
            renderRandomColors();
        }
    });
    
    // Add click event listener to generate button
    const generateBtn = document.getElementById('generateBtn');
    const colorPicker = document.getElementById('colorPicker');
    
    if (generateBtn && colorPicker) {
        generateBtn.addEventListener('click', function() {
            try {
                // Get current color value from color input
                let baseColor = colorPicker.value;
                
                // Validate hex color format
                if (!isValidHex(baseColor)) {
                    console.warn('Invalid color format, using default color #3498db');
                    baseColor = '#3498db';
                }
                
                // Generate tints and shades
                const colors = generateTintsAndShades(baseColor);
                
                // Render tints and shades to DOM
                renderTintsAndShades(colors);
                
            } catch (error) {
                // Log error without crashing the application
                console.error('Error generating tints and shades:', error);
                
                // Use default color as fallback
                try {
                    const defaultColor = '#3498db';
                    const colors = generateTintsAndShades(defaultColor);
                    renderTintsAndShades(colors);
                } catch (fallbackError) {
                    console.error('Fallback generation also failed:', fallbackError);
                }
            }
        });
    }
});
