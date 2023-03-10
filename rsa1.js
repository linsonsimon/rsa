import crypto from "crypto";
// const crypto = require("crypto");
// Generate RSA key pair
function generateKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  return { privateKey, publicKey };
}

// Encrypt message with public key
function encrypt(publicKey, message) {
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(message)
  );
  return encryptedData.toString("base64");
}

// Decrypt message with private key
function decrypt(privateKey, encryptedMessage) {
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(encryptedMessage, "base64")
  );
  return decryptedData.toString();
}

// Example usage

// Generate key pair
const { privateKey, publicKey } = generateKeyPair();
console.log("privatekey", privateKey, "\n publickey", publicKey);
// Message to encrypt
const message = "Hello, world!";

// Encrypt message with public key
const encryptedMessage = encrypt(publicKey, message);
console.log("encryptedMessage", encryptedMessage);
// Decrypt message with private key
const decryptedMessage = decrypt(privateKey, encryptedMessage);

// Print original and decrypted messages
console.log("Original message: " + message);
console.log("Decrypted message: " + decryptedMessage);
