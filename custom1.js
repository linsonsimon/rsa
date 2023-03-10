// Define the encryption and decryption functions
function encrypt(message, key) {
  let encrypted = "";
  for (let i = 0; i < message.length; i++) {
    let charCode = message.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(charCode);
  }
  return encrypted;
}

function decrypt(message, key) {
  let decrypted = "";
  for (let i = 0; i < message.length; i++) {
    let charCode = message.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    decrypted += String.fromCharCode(charCode);
  }
  return decrypted;
}

// Test the encryption and decryption functions
const message = "Hello, world!";
const key = "1234";

const encryptedMessage = encrypt(message, key);
console.log("Encrypted message:", encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage, key);
console.log("Decrypted message:", decryptedMessage);
