// Prompt: Create a function called `toCamelCase` that converts a string to camelCase format.
// 
// The function should:
// - Accept a string as input
// - Handle spaces, hyphens, and underscores as word separators
// - Capitalize the first letter of each word except the first one
// - Return the resulting camelCase string
//
// Example: toCamelCase('hello-world-example') should return 'helloWorldExample'
// Example: toCamelCase('hello_world_example') should return 'helloWorldExample'
// Example: toCamelCase('hello world example') should return 'helloWorldExample'

function toCamelCase(str) {
  return str
    .split(/[-_\s]+/) // Split by hyphens, underscores, or spaces
    .map((word, index) => {
      // Convert to lowercase first, then capitalize first letter if not the first word
      const lowerWord = word.toLowerCase();
      return index === 0 ? lowerWord : lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    })
    .join(''); // Join all parts together
}

// Test cases:
console.log(toCamelCase('first name'));        // firstName
console.log(toCamelCase('user_id'));           // userId
console.log(toCamelCase('SCREEN_NAME'));       // screenName
console.log(toCamelCase('mobile-number'));     // mobileNumber
console.log(toCamelCase('hello world example')); // helloWorldExample
