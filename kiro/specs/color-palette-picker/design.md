# Design Document: Color Palette Picker

## Overview

The Color Palette Picker is a client-side web application that displays random color palettes and generates tints and shades from user-selected base colors. The application features a hero section with 5 large random color boxes that refresh on spacebar press, and a generator section for creating custom tints and shades. The application uses HTML5 color input for color selection, vanilla JavaScript for color generation logic, keyboard event handling, and Bootstrap 5 for styling and responsive layout. The system operates entirely in the browser without requiring backend services.

The core functionality includes random color generation for inspiration and tint/shade generation algorithms that lighten or darken a base color by mixing with white or black respectively.

## Architecture

### System Architecture

The application follows a simple client-side MVC-inspired pattern:

```
┌─────────────────────────────────────────┐
│           User Interface (HTML)          │
│  ┌─────────────────────────────────────┐│
│  │  Header (Nav + Explore Button)      ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │  Hero: 5 Random Color Boxes         ││
│  │  (500px height, responsive width)   ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │  Generator Section:                 ││
│  │  Color Input + Generate Button      ││
│  │  Tints & Shades Display             ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│      Application Logic (script.js)      │
│  ┌─────────────────────────────────┐   │
│  │  Random Color Generator         │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  Keyboard Event Handler         │   │
│  │  (Spacebar → Refresh Colors)    │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  Color Conversion Utilities     │   │
│  │  (hex ↔ RGB)                    │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  Tint & Shade Generator         │   │
│  │  (Lighten/Darken Algorithm)     │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  DOM Manipulation & Rendering   │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│       Styling Layer (Bootstrap 5)       │
│         + Custom CSS (styles.css)       │
└─────────────────────────────────────────┘
```

### Technology Stack

- **HTML5**: Structure and semantic markup, native color input
- **CSS3**: Custom styling via styles.css
- **Bootstrap 5**: Responsive grid, components, utilities
- **Vanilla JavaScript**: All application logic without frameworks

### Design Rationale

**Why client-side only?** Color palette generation is computationally lightweight and requires no persistent storage, making server-side processing unnecessary. This reduces complexity and improves response time.

**Why Bootstrap?** Provides battle-tested responsive components and utilities, allowing rapid development of a professional interface without custom CSS framework development.

**Why vanilla JavaScript?** The application's scope is small enough that framework overhead (React, Vue) would be unnecessary. Vanilla JS keeps the bundle size minimal and performance optimal.

## Components and Interfaces

### 1. Header Component

**Purpose**: Provide navigation and branding

**HTML Structure**:
```html
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Color Palette</a>
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="#">Menu 1</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Menu 2</a></li>
    </ul>
    <button class="btn btn-outline-primary">Explore</button>
  </div>
</nav>
```

**Interface**:
- Input: User clicks on menu items or Explore button
- Output: Navigation actions (placeholder for future functionality)

**Behavior**:
- Displays at top of page
- Uses Bootstrap navbar for responsive behavior
- Explore button provides visual call-to-action

### 2. Random Color Box Component

**Purpose**: Display large color swatches with hex codes in hero section

**HTML Structure**:
```html
<div class="col">
  <div class="color-box" style="background-color: #3498db; height: 500px;">
    <span class="hex-code">#3498db</span>
  </div>
</div>
```

**Interface**:
- Input: Color hex string
- Output: Visual color display with text overlay

**Behavior**:
- Fixed 500px height
- Responsive width using Bootstrap grid (col class)
- Centers hex code text over color background
- Updates on spacebar press

### 3. Keyboard Event Handler

**Purpose**: Refresh random colors on spacebar press

**Function Signature**:
```javascript
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    refreshRandomColors();
  }
});
```

**Behavior**:
- Listens for spacebar key press
- Prevents default scrolling behavior
- Triggers random color regeneration
- Updates all 5 color boxes simultaneously

### 4. Random Color Generator

**Purpose**: Generate random hex colors

**Function Signature**:
```javascript
function generateRandomColor() → string
```

**Algorithm**:
- Generate random values for R, G, B (0-255)
- Convert to hex format (#RRGGBB)
- Return hex string

**Design Rationale**: Simple random generation provides unlimited color inspiration without constraints.

### 5. Color Input Component

**Purpose**: Capture user's base color selection for tint/shade generation

**HTML Structure**:
```html
<input type="color" id="colorPicker" class="form-control" value="#3498db">
```

**Interface**:
- Input: User interaction (click/change)
- Output: Hexadecimal color string (e.g., "#3498db")

**Behavior**:
- Initializes with default color (#3498db)
- Opens native browser color picker on click
- Emits change event when color is selected

### 6. Generate Button Component

**Purpose**: Trigger tint and shade generation

**HTML Structure**:
```html
<button id="generateBtn" class="btn btn-primary">Generate Tints & Shades</button>
```

**Interface**:
- Input: Click event
- Output: Triggers `generateTintsAndShades()` function

**Behavior**:
- Remains enabled at all times
- Provides visual feedback on click (Bootstrap active state)

### 7. Tints and Shades Display Component

**Purpose**: Render generated tints and shades

**HTML Structure**:
```html
<div id="tintsDisplay" class="row g-3">
  <!-- Dynamically generated tint cards -->
</div>
<div id="shadesDisplay" class="row g-3">
  <!-- Dynamically generated shade cards -->
</div>
```

**Interface**:
- Input: Array of color hex strings
- Output: Visual grid of color swatches with hex codes

**Behavior**:
- Clears previous colors before rendering new ones
- Creates color cards for each tint and shade
- Displays hex code for each color
- Responsive grid layout

### 8. Color Conversion Utilities

**Purpose**: Convert between color formats for manipulation

**Functions**:

```javascript
// Convert hex to RGB
function hexToRgb(hex) → {r: number, g: number, b: number}

// Convert RGB to hex
function rgbToHex(r, g, b) → string
```

**Design Rationale**: RGB color space is ideal for tint/shade generation because we can directly interpolate between the base color and white (255,255,255) for tints or black (0,0,0) for shades.

### 9. Tint and Shade Generation Algorithm

**Purpose**: Generate lighter and darker variations of base color

**Function Signature**:
```javascript
function generateTintsAndShades(baseColorHex) → {tints: string[], shades: string[]}
```

**Algorithm Strategy**: 
- **Tints**: Mix base color with white at varying percentages (20%, 40%, 60%, 80%)
  - Formula: `newR = baseR + (255 - baseR) * percentage`
- **Shades**: Mix base color with black at varying percentages (20%, 40%, 60%, 80%)
  - Formula: `newR = baseR * (1 - percentage)`

**Design Rationale**: This approach creates visually consistent lightness/darkness progressions that are predictable and useful for design systems.

## Data Models

### Color Representation

```javascript
// Hex color string
string  // "#3498db" format
```

### Internal Color Representations

```javascript
// RGB Color
{
  r: number,  // 0-255
  g: number,  // 0-255
  b: number   // 0-255
}
```

### Tints and Shades Result

```javascript
{
  tints: string[],   // Array of hex strings (lighter colors)
  shades: string[]   // Array of hex strings (darker colors)
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Random Color Box Hex Code Display

*For any* color box in the hero section, the displayed hex code text should match the background color of that box.

**Validates: Requirements 2.4**

### Property 2: Spacebar Refresh Generates New Colors

*For any* initial set of random colors, pressing the spacebar should generate 5 new colors that are different from the previous set.

**Validates: Requirements 3.1, 3.2**

### Property 3: Hex Code Updates on Refresh

*For any* color refresh triggered by spacebar, each color box's hex code text should update to match its new background color.

**Validates: Requirements 3.3**

### Property 4: Color Input Stores Valid Hex

*For any* color selection in the color picker input, the stored value should be a valid hexadecimal color format (#RRGGBB).

**Validates: Requirements 4.4**

### Property 5: Tints and Shades Generation Produces Valid Colors

*For any* valid hexadecimal base color, generating tints and shades should produce arrays of colors where each color has a valid hex format (#RRGGBB).

**Validates: Requirements 5.2**

### Property 6: Generated Colors Display in DOM

*For any* tints and shades generation, the DOM should contain distinct visual elements for each generated tint and shade.

**Validates: Requirements 5.3, 6.1**

### Property 7: Base Color Preservation After Generation

*For any* base color selection, after generating tints and shades, the color input element's value should remain unchanged and equal to the original base color.

**Validates: Requirements 5.4**

### Property 8: Generated Color Hex Code Visibility

*For any* generated tint or shade, its visual element should contain its hexadecimal color code as visible text content.

**Validates: Requirements 6.2**

### Property 9: Random Colors Are Valid on Load

*For any* page load, all 5 randomly generated colors in the hero section should be valid hexadecimal colors.

**Validates: Requirements 8.1**

### Property 10: Rapid Spacebar Presses Handle Gracefully

*For any* sequence of rapid spacebar presses, the application should update colors without throwing errors and maintain stability.

**Validates: Requirements 8.2**

### Property 11: Graceful Error Handling

*For any* invalid color input (malformed hex codes, out-of-range values), the tint and shade generation function should handle the error gracefully without crashing the application.

**Validates: Requirements 8.3**

### Property 12: Color Conversion Round Trip

*For any* valid RGB color, converting to hex and back to RGB should produce the same values.

**Validates: Requirements 4.4** (Ensures color format conversions maintain data integrity)

## Error Handling

### Error Categories

1. **Invalid Color Input**
   - Malformed hex codes (wrong length, invalid characters)
   - Out-of-range RGB/HSL values
   - **Handling**: Validate input format, use default color as fallback, log warning to console

2. **DOM Manipulation Errors**
   - Missing DOM elements (colorPicker, generateBtn, paletteDisplay)
   - **Handling**: Check for element existence before manipulation, fail gracefully with console error

3. **Conversion Errors**
   - Edge cases in color space conversion (e.g., division by zero in HSL conversion)
   - **Handling**: Guard against mathematical edge cases, clamp values to valid ranges

### Error Handling Strategy

```javascript
try {
  const baseColor = document.getElementById('colorPicker').value;
  if (!isValidHex(baseColor)) {
    console.warn('Invalid color, using default');
    baseColor = '#3498db';
  }
  const palette = generatePalette(baseColor);
  renderPalette(palette);
} catch (error) {
  console.error('Palette generation failed:', error);
  // Application continues running, user can try again
}
```

**Design Rationale**: Fail gracefully rather than crashing. Color palette generation is non-critical functionality where degraded operation (using defaults) is preferable to application failure.

## Testing Strategy

### Unit Testing

The application will use **Vitest** as the testing framework for both unit tests and property-based tests. Vitest provides fast execution, excellent TypeScript support, and compatibility with modern JavaScript features.

**Unit Test Coverage**:

1. **Color Conversion Functions**
   - Test specific known conversions (e.g., red #FF0000 → RGB(255,0,0) → HSL(0,100,50))
   - Test edge cases: pure black, pure white, grayscale colors
   - Test boundary values (hue at 0° and 360°)

2. **Palette Generation**
   - Test that palette contains expected number of colors (5)
   - Test that generated colors follow color theory rules (complementary at 180°, etc.)
   - Test with specific base colors and verify expected output

3. **DOM Manipulation**
   - Test that renderPalette creates correct number of DOM elements
   - Test that color swatches have correct background colors
   - Test that hex codes are displayed correctly

4. **Error Handling**
   - Test invalid hex code handling
   - Test missing DOM element handling
   - Test edge case color values

### Property-Based Testing

The application will use **fast-check** library for property-based testing in JavaScript. Fast-check generates random test cases and is well-suited for testing mathematical properties and invariants.

**Configuration**: Each property-based test will run a minimum of 100 iterations to ensure thorough coverage of the input space.

**Property Test Coverage**:

1. **Property 1: Palette Generation Produces Valid Colors**
   - Generator: Random valid hex colors
   - Property: All generated palette colors have valid hex format and names
   - Tag: `**Feature: color-palette-picker, Property 1: Palette Generation Produces Valid Colors**`

2. **Property 2: Base Color Preservation**
   - Generator: Random valid hex colors
   - Property: Input value unchanged after generation
   - Tag: `**Feature: color-palette-picker, Property 2: Base Color Preservation**`

3. **Property 3: Complete Palette Display**
   - Generator: Random valid hex colors
   - Property: DOM contains correct number of color elements
   - Tag: `**Feature: color-palette-picker, Property 3: Complete Palette Display**`

4. **Property 4: Hex Code Visibility**
   - Generator: Random valid hex colors
   - Property: Each color element contains its hex code
   - Tag: `**Feature: color-palette-picker, Property 4: Hex Code Visibility**`

5. **Property 5: Idempotent Generation**
   - Generator: Random valid hex colors
   - Property: Multiple generations produce consistent results without errors
   - Tag: `**Feature: color-palette-picker, Property 5: Idempotent Generation**`

6. **Property 6: Graceful Error Handling**
   - Generator: Random invalid color strings (malformed hex, wrong length, invalid chars)
   - Property: No uncaught exceptions, application remains stable
   - Tag: `**Feature: color-palette-picker, Property 6: Graceful Error Handling**`

7. **Property 7: Color Conversion Round Trip**
   - Generator: Random valid RGB colors
   - Property: RGB → HSL → RGB produces values within ±1 tolerance
   - Tag: `**Feature: color-palette-picker, Property 7: Color Conversion Round Trip**`

### Testing Approach

- **Implementation-first development**: Implement features before writing corresponding tests
- **Complementary testing**: Unit tests verify specific examples and edge cases; property tests verify universal correctness across many inputs
- **Test isolation**: Each test should be independent and not rely on global state
- **DOM testing**: Use jsdom or similar for testing DOM manipulation in Node.js environment

### Test File Organization

```
project-root/
├── script.js
├── script.test.js          # Unit tests
├── script.properties.test.js  # Property-based tests
└── test-utils.js           # Shared test utilities and generators
```

## Implementation Notes

### Bootstrap Integration

Include Bootstrap 5 via CDN in index.html:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

No Bootstrap JavaScript bundle is needed as we're not using interactive components (modals, dropdowns, etc.).

### Responsive Design

Use Bootstrap's grid system for responsive layouts:

**Hero Section (Random Color Boxes)**:
- All screen sizes: 5 equal-width columns using `col` class
- Each box: 500px fixed height
- Boxes span full container width

**Generator Section (Tints & Shades)**:
- Mobile (< 576px): 2 columns
- Tablet (≥ 576px): 3 columns  
- Desktop (≥ 768px): 4 columns

### Performance Considerations

- Random color generation is lightweight and instant
- Keyboard event handler includes debouncing consideration for rapid spacebar presses
- DOM manipulation is batched (clear once, append all at once) to minimize reflows
- No external API calls means instant color generation
- Color conversion functions are pure and simple (hex ↔ RGB only)

### Accessibility Considerations

- Header navigation uses semantic nav elements
- Color input has associated label for screen readers
- Generate button has descriptive text
- Color boxes include hex code text for users who cannot perceive colors
- Keyboard interaction (spacebar) provides alternative to mouse-based interaction
- Sufficient color contrast for text overlays on color boxes
- Text color (black/white) automatically adjusts based on background lightness for readability

### Browser Compatibility

- HTML5 color input: Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- Fallback: Older browsers will show text input, users can manually enter hex codes
- JavaScript: ES6+ features used, targets modern browsers (last 2 versions)

## Future Enhancements

Potential features for future iterations (not in current scope):

1. **Copy to Clipboard**: Click color box or swatch to copy hex code
2. **Additional Generation Modes**: Complementary, analogous, triadic color schemes
3. **Color Names**: Display human-readable color names alongside hex codes
4. **Export Options**: Download palette as JSON, CSS variables, or image
5. **Palette History**: Save and recall previously generated palettes
6. **Lock Colors**: Lock specific random colors while refreshing others
7. **Adjustable Tint/Shade Steps**: User-configurable number and intensity of tints/shades
8. **Keyboard Shortcuts**: Additional shortcuts for different actions (e.g., 'C' to copy, 'G' to generate)

These enhancements would require additional requirements gathering and design iteration.
