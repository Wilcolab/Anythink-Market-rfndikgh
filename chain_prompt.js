// Function: toKebabCase
// Converts strings to kebab-case format by following sequential steps:
// 1. Validate input (non-empty string, throw descriptive error if invalid)
// 2. Identify word boundaries and replace with hyphens
// 3. Convert to lowercase
//
// Word boundaries include:
// - Spaces
// - Underscores
// - Transitions from lowercase to uppercase (camelCase)
// - Transitions from multiple uppercase to lowercase (acronyms)
//
// Examples:
// toKebabCase('firstName') → 'first-name'
// toKebabCase('first_name') → 'first-name'
// toKebabCase('first name') → 'first-name'
// toKebabCase('FirstName') → 'first-name'
// toKebabCase('APIKey') → 'api-key'
// toKebabCase('HTTPSConnection') → 'https-connection'
// toKebabCase('already-kebab-case') → 'already-kebab-case'

function toKebabCase(str) {
  // STEP 1: Validate input - ensure it is a non-empty string
  if (typeof str !== 'string') {
    throw new TypeError(`Input must be a string, received ${typeof str}`);
  }
  
  const trimmed = str.trim();
  
  if (trimmed.length === 0) {
    throw new Error('Input cannot be empty or whitespace-only');
  }

  // STEP 2: Identify word boundaries and replace with hyphens
  // Handle camelCase transitions (lowercase to uppercase)
  let result = trimmed.replace(/([a-z])([A-Z])/g, '$1-$2');
  
  // Handle sequences of uppercase letters followed by lowercase (acronyms)
  result = result.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2');
  
  // Replace underscores with hyphens
  result = result.replace(/_+/g, '-');
  
  // Replace spaces with hyphens
  result = result.replace(/\s+/g, '-');
  
  // Remove any duplicate consecutive hyphens
  result = result.replace(/-+/g, '-');
  
  // Remove leading and trailing hyphens
  result = result.replace(/^-+|-+$/g, '');

  // STEP 3: Convert to lowercase and return
  return result.toLowerCase();
}

// Test cases:
console.log(toKebabCase('firstName'));           // first-name
console.log(toKebabCase('first_name'));          // first-name
console.log(toKebabCase('first name'));          // first-name
console.log(toKebabCase('FirstName'));           // first-name
console.log(toKebabCase('APIKey'));              // api-key
console.log(toKebabCase('HTTPSConnection'));     // https-connection
console.log(toKebabCase('already-kebab-case'));  // already-kebab-case
console.log(toKebabCase('getAPIKey'));           // get-api-key
console.log(toKebabCase('IOError'));             // io-error

// Error test cases (uncomment to test):
// console.log(toKebabCase(''));                 // Error: Input cannot be empty or whitespace-only
// console.log(toKebabCase('   '));              // Error: Input cannot be empty or whitespace-only
// console.log(toKebabCase(123));                // TypeError: Input must be a string, received number
