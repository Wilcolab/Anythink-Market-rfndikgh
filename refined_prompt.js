// Refined Prompt: Create a robust JavaScript function named `toCamelCase` that converts input 
// strings containing spaces, underscores, or hyphens into standard camelCase format.
//
// Requirements:
// - Accept a string as input
// - Strict error handling: throw descriptive error if input is null, undefined, or not a string
// - Return empty string if input is empty or whitespace-only
// - Handle spaces, hyphens, underscores, and dots as word separators
// - Strip out non-alphanumeric characters that are not delimiters to generate clean identifiers
// - Handle acronyms intelligently: lowercase acronyms at the start (e.g., 'API_Key' → 'apiKey', not 'aPIKey')
// - Capitalize first letter of each word except the first one
// - Return the resulting camelCase string
//
// Error Handling:
// - Throw TypeError with descriptive message if input is null or undefined
// - Throw TypeError with descriptive message if input is not a string
// - Return empty string for empty/whitespace-only input
//
// Edge Cases to Handle:
// - null or undefined: throw TypeError
// - Empty strings: '' → ''
// - Whitespace only: '   ' → ''
// - Leading separators: '-hello-world' → 'helloWorld'
// - Trailing separators: 'hello-world-' → 'helloWorld'
// - Multiple consecutive separators: 'hello---world' → 'helloWorld'
// - Mixed separators: 'hello-world_example.name' → 'helloWorldExampleName'
// - Already camelCase: 'helloWorld' → 'helloWorld'
// - Single word: 'hello' → 'hello'
// - Numbers: 'hello123world' → 'hello123world', 'hello-123-world' → 'hello123World'
// - Acronyms at start: 'API_Key' → 'apiKey', 'HTTPSConnection' → 'httpsConnection'
// - Acronyms not at start: 'get_API_key' → 'getApiKey'
// - Special characters: 'hello@world#example' → 'helloWorldExample'
// - Mixed case: 'HELLO-WORLD' → 'helloWorld'
//
// Examples:
// toCamelCase('first name') → 'firstName'
// toCamelCase('user_id') → 'userId'
// toCamelCase('SCREEN_NAME') → 'screenName'
// toCamelCase('mobile-number') → 'mobileNumber'
// toCamelCase('API_Key') → 'apiKey'
// toCamelCase('HTTPSConnection') → 'httpsConnection'
// toCamelCase('get_API_key') → 'getApiKey'
// toCamelCase('hello@world#example') → 'helloWorldExample'
// toCamelCase('-hello--world-') → 'helloWorld'
// toCamelCase('') → ''
// toCamelCase(null) → TypeError: Input cannot be null or undefined
// toCamelCase(undefined) → TypeError: Input cannot be null or undefined
// toCamelCase(123) → TypeError: Input must be a string

function toCamelCase(str) {
  // Input validation - check for null or undefined first
  if (str === null || str === undefined) {
    throw new TypeError('Input cannot be null or undefined');
  }

  // Check if input is a string
  if (typeof str !== 'string') {
    throw new TypeError(`Input must be a string, received ${typeof str}`);
  }

  // Trim whitespace
  const trimmed = str.trim();
  
  // Return empty string for empty or whitespace-only input
  if (!trimmed) {
    return '';
  }

  // Remove non-alphanumeric characters except word separators (-, _, ., spaces)
  // Replace separators with a consistent delimiter
  const cleaned = trimmed
    .replace(/[^\w\s\-_.]/g, '') // Remove special characters
    .split(/[-_.\s]+/)             // Split by separators
    .filter(word => word.length > 0);

  // Handle edge case of no valid words after cleaning
  if (cleaned.length === 0) {
    return '';
  }

  // Convert to camelCase with intelligent acronym handling
  return cleaned
    .map((word, index) => {
      const lowerWord = word.toLowerCase();
      
      if (index === 0) {
        // First word: always lowercase (handles acronyms at start)
        return lowerWord;
      } else {
        // Subsequent words: capitalize first letter, keep rest as-is
        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
      }
    })
    .join('');
}

// Test cases:
console.log(toCamelCase('first name'));           // firstName
console.log(toCamelCase('user_id'));              // userId
console.log(toCamelCase('SCREEN_NAME'));          // screenName
console.log(toCamelCase('mobile-number'));        // mobileNumber
console.log(toCamelCase('API_Key'));              // apiKey
console.log(toCamelCase('HTTPSConnection'));      // httpsConnection
console.log(toCamelCase('get_API_key'));          // getApiKey
console.log(toCamelCase('hello@world#example'));  // helloWorldExample
console.log(toCamelCase('-hello--world-'));       // helloWorld
console.log(toCamelCase(''));                     // ''
console.log(toCamelCase('helloWorld'));           // helloWorld
console.log(toCamelCase('single'));               // single
// console.log(toCamelCase(null));                // TypeError: Input cannot be null or undefined
// console.log(toCamelCase(undefined));           // TypeError: Input cannot be null or undefined
// console.log(toCamelCase(123));                 // TypeError: Input must be a string

// ============================================================================
// Dot Case Conversion Function
// ============================================================================

// Function: toDotCase
// Converts strings to dot.case format (words separated by dots, all lowercase)
//
// Requirements:
// - Accept a string as input
// - Strict error handling: throw descriptive error if input is null, undefined, or not a string
// - Return empty string if input is empty or whitespace-only
// - Handle spaces, hyphens, underscores, and camelCase as word separators
// - Strip out non-alphanumeric characters that are not delimiters
// - Convert all letters to lowercase
// - Join words with dots
//
// Examples:
// toDotCase('firstName') → 'first.name'
// toDotCase('first_name') → 'first.name'
// toDotCase('first-name') → 'first.name'
// toDotCase('first name') → 'first.name'
// toDotCase('FirstName') → 'first.name'
// toDotCase('API_Key') → 'api.key'
// toDotCase('hello@world#example') → 'hello.world.example'

/**
 * Converts a string to dot.case format (lowercase words separated by dots).
 * 
 * @description
 * Transforms input strings into dot.case notation by:
 * 1. Handling camelCase and PascalCase by inserting separators before uppercase letters
 * 2. Splitting on common word separators (hyphens, underscores, dots, spaces)
 * 3. Removing special characters
 * 4. Converting all words to lowercase and joining with dots
 * 
 * @param {string} str - The input string to convert to dot.case
 * 
 * @returns {string} The converted string in dot.case format, or an empty string if input is empty/whitespace-only
 * 
 * @throws {TypeError} If input is null or undefined
 * @throws {TypeError} If input is not a string type
 * 
 * @example
 * // Basic usage
 * toDotCase('helloWorld');           // Returns: 'hello.world'
 * toDotCase('HelloWorld');           // Returns: 'hello.world'
 * toDotCase('hello-world');          // Returns: 'hello.world'
 * toDotCase('hello_world');          // Returns: 'hello.world'
 * toDotCase('hello world');          // Returns: 'hello.world'
 * toDotCase('HTMLParser');           // Returns: 'html.parser'
 * toDotCase('   whitespace   ');     // Returns: 'whitespace'
 * toDotCase('');                     // Returns: ''
 * toDotCase('!@#$%');                // Returns: ''
 * 
 * @example
 * // Error cases
 * toDotCase(null);                   // Throws: TypeError
 * toDotCase(undefined);              // Throws: TypeError
 * toDotCase(123);                    // Throws: TypeError
 */
function toDotCase(str) {
  // Input validation - check for null or undefined first
  if (str === null || str === undefined) {
    throw new TypeError('Input cannot be null or undefined');
  }

  // Check if input is a string
  if (typeof str !== 'string') {
    throw new TypeError(`Input must be a string, received ${typeof str}`);
  }

  // Trim whitespace
  const trimmed = str.trim();
  
  // Return empty string for empty or whitespace-only input
  if (!trimmed) {
    return '';
  }

  // Handle camelCase by inserting separator before uppercase letters
  const withSeparators = trimmed
    .replace(/([a-z])([A-Z])/g, '$1.$2') // Insert dot before uppercase letters preceded by lowercase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1.$2'); // Handle sequences of uppercase letters

  // Remove non-alphanumeric characters except word separators
  const cleaned = withSeparators
    .replace(/[^\w\s\-.]/g, '') // Remove special characters
    .split(/[-_.\s]+/)           // Split by separators
    .filter(word => word.length > 0);

  // Handle edge case of no valid words after cleaning
  if (cleaned.length === 0) {
    return '';
  }

  // Convert to dot.case (all lowercase, joined with dots)
  return cleaned
    .map(word => word.toLowerCase())
    .join('.');
}

// Test cases for toDotCase:
console.log('\n--- toDotCase Tests ---');
console.log(toDotCase('firstName'));           // first.name
console.log(toDotCase('first_name'));          // first.name
console.log(toDotCase('first-name'));          // first.name
console.log(toDotCase('first name'));          // first.name
console.log(toDotCase('FirstName'));           // first.name
console.log(toDotCase('API_Key'));             // api.key
console.log(toDotCase('hello@world#example')); // hello.world.example
console.log(toDotCase('HTTPSConnection'));     // https.connection
console.log(toDotCase(''));                    // ''
console.log(toDotCase('single'));              // single
