# Implementation Plan

- [x] 1. Set up project structure and Bootstrap integration




  - Add Bootstrap 5 CSS via CDN to index.html
  - Create basic HTML structure with container
  - Clear existing template content
  - _Requirements: 7.1, 7.2_

- [x] 2. Implement header with navigation




  - [x] 2.1 Create Bootstrap navbar header

    - Add navbar with brand, two menu items, and Explore button
    - Use Bootstrap navbar classes for responsive behavior
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
-

- [x] 3. Implement hero section with random color boxes







  - [x] 3.1 Create HTML structure for 5 color boxes














    - Add container with row and 5 columns
    - Set each box to 500px height
    - Use Bootstrap col class for equal-width distribution
    - _Requirements: 2.1, 2.2, 2.3, 2.5_
  -


  - [x] 3.2 Implement random color generator function




    - Create generateRandomColor() function
    - Generate random R, G, B values (0-255)
    - Convert to hex format (#RRGGBB)
    - _Requirements: 2.1, 8.1_
  
  - [x] 3.3 Implement color box rendering function





    - Create renderRandomColors() function
    - Generate 5 random colors
    - Update each box background color
    - Display hex code text inside each box
    - _Requirements: 2.1, 2.4_

-

  - [x] 3.4 Write property test for random color validity











    - **Property 9: Random Colors Are Valid on Load**
    - **Validates: Requirements 8.1**

  - [x] 3.5 Write property test for hex code display









    - **Property 1: Random Color Box Hex Code Display**
    - **Validates: Requirements 2.4**

- [x] 4. Implement keyboard interaction for color refresh




  - [x] 4.1 Add spacebar event listener






    - Listen for keydown event on document
    - Check for spacebar key (event.code === 'Space')
    - Call renderRandomColors() to refresh colors
    - Prevent default scrolling behavior
    - _Requirements: 3.1, 3.2, 3.4_
-

  - [x] 4.2 Write property test for spacebar refresh






    - **Property 2: Spacebar Refresh Generates New Colors**
    - **Validates: Requirements 3.1, 3.2**

-

  - [x] 4.3 Write property test for hex code updates





    - **Property 3: Hex Code Updates on Refresh**
    - **Validates: Requirements 3.3**
-

  - [x] 4.4 Write property test for rapid spacebar handling





    - **Property 10: Rapid Spacebar Presses Handle Gracefully**
    - **Validates: Requirements 8.2**

-

- [x] 5. Implement generator section UI




  - [x] 5.1 Create color picker input





    - Add HTML5 color input with id "colorPicker"
    - Set default value to #3498db
    - Apply Bootstrap form-control class
    - Add label for accessibility
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  

  - [x] 5.2 Create generate button





    - Add button with id "generateBtn"
    - Use Bootstrap btn-primary classes
    - Set button text to "Generate Tints & Shades"
    - _Requirements: 5.1_
  
  - [x] 5.3 Create display containers for tints and shades



  - [x] 5.3 Create display containers for tints and shades


    - Add div with id "tintsDisplay" for tints
    - Add div with id "shadesDisplay" for shades
    - Apply Bootstrap row and gap utilities
    - _Requirements: 6.1, 6.3_

-

  - [x] 5.4 Write property test for color input validation





    - **Property 4: Color Input Stores Valid Hex**
    - **Validates: Requirements 4.4**


-

- [x] 6. Implement color conversion utilities



  - [x] 6.1 Implement hexToRgb function






    - Parse hex color string (#RRGGBB) to RGB object {r, g, b}
    - Handle hex strings with or without # prefix
    - _Requirements: 4.4_
  

  - [x] 6.2 Implement rgbToHex function



    - Convert RGB object {r, g, b} to hex string format (#RRGGBB)
    - Ensure proper zero-padding for single-digit values
    - Clamp values to 0-255 range
    - _Requirements: 4.4_

  - [x] 6.3 Write property test for color conversion round trip







    - **Property 12: Color Conversion Round Trip**
    - **Validates: Requirements 4.4**



- [x] 7. Implement tints and shades generation algorithm



  - [x] 7.1 Create generateTintsAndShades function






    - Accept base color hex string as input
    - Convert base color to RGB
    - Generate 4 tints by mixing with white (20%, 40%, 60%, 80%)
    - Generate 4 shades by mixing with black (20%, 40%, 60%, 80%)
    - Convert results back to hex format
    - Return object with tints and shades arrays
    - _Requirements: 5.2_
-

  - [x] 7.2 Write property test for tints and shades validity






    - **Property 5: Tints and Shades Generation Produces Valid Colors**
    - **Validates: Requirements 5.2**
-

- [x] 8. Implement tints and shades rendering




  - [x] 8.1 Create renderTintsAndShades function







    - Clear existing tints and shades displays
    - Create color card for each tint
    - Create color card for each shade
    - Set card background to color hex value
    - Display hex code text within each card
    - Append tint cards to tintsDisplay
    - Append shade cards to shadesDisplay
    - _Requirements: 5.3, 6.1, 6.2_


  - [x] 8.2 Write property test for generated colors display






    - **Property 6: Generated Colors Display in DOM**
    - **Validates: Requirements 5.3, 6.1**

  - [x] 8.3 Write property test for hex code visibility







    - **Property 8: Generated Color Hex Code Visibility**
    - **Validates: Requirements 6.2**
- [x] 9. Wire up generator event handlers









- [ ] 9. Wire up generator event handlers

  - [x] 9.1 Add click event listener to generate button


    - Get current color value from color input
    - Call generateTintsAndShades with base color
    - Call renderTintsAndShades with generated colors
    - _Requirements: 5.2, 5.3_

  - [x] 9.2 Implement error handling and validation

    - Add isValidHex validation function
    - Wrap generation in try-catch block
    - Use default color fallback for invalid inputs
    - Log errors to console without crashing
    - _Requirements: 8.3_

  - [x] 9.3 Write property test for base color preservation


    - **Property 7: Base Color Preservation After Generation**
    - **Validates: Requirements 5.4**

  - [x] 9.4 Write property test for graceful error handling


    - **Property 11: Graceful Error Handling**
    - **Validates: Requirements 8.3**

- [x] 10. Add custom styling and polish




  - [x] 10.1 Update styles.css for color boxes


    - Style hero section color boxes (500px height, centered text)
    - Add text color logic (white on dark, black on light backgrounds)
    - Style hex code text display
    - _Requirements: 2.2, 2.4_
  
  - [x] 10.2 Style generator section


    - Add spacing between sections
    - Style tint and shade cards
    - Add hover effects for better UX
    - Ensure proper text contrast on color cards
    - _Requirements: 7.4_
  
  - [x] 10.3 Implement responsive layout adjustments


    - Test Bootstrap grid breakpoints
    - Ensure hero boxes span full width on all screens
    - Ensure tints/shades use responsive columns (2/3/4 columns)
    - _Requirements: 7.2_
-

- [x] 11. Set up testing infrastructure



  - [x] 11.1 Install Vitest and fast-check


    - Add package.json with Vitest and fast-check dependencies
    - Configure Vitest for browser-like environment (jsdom)
    - Add test scripts to package.json
    - _Requirements: All (testing foundation)_

  - [x] 11.2 Create test utilities and generators


    - Create test-utils.js with color generators for property tests
    - Implement random hex color generator
    - Implement random RGB color generator
    - Implement invalid color string generator
-

- [x] 12. Final checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.
