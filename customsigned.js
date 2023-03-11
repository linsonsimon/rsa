const crypto = require("crypto");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Generate a random prime number
function generatePrime(min, max) {
  var prime = false;

  while (!prime) {
    var num =
      (BigInt(Math.floor(Math.random() * 10 ** 7)) * (max - min + 1n)) /
        10n ** 7n +
      min;
    prime = isPrime(num);
  }
  return num;
}

// Check if a number is prime
function isPrime(num) {
  if (num < 2n) return false;
  for (var i = 2n; i < num; i++) {
    if (num % i == 0n) return false;
  }
  return true;
}

// Find the greatest common divisor
function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

function findEncryptionKeys(totient) {
  const keys = [];
  for (let i = 3n; i < 200n; i++) {
    // console.log("i", i, totient);
    if (gcd(i, totient) === 1n) keys.push(i);
  }
  return keys;
}

// Generate keys
function generateKeys(n, phi, e) {
  var d = 0n;
  while ((d * e) % phi != 1n) {
    d++;
  }
  return { publicKey: [e, n], privateKey: [d, n] };
}

// Encrypt a message
function encrypt(message, publicKey) {
  var e = publicKey[0];
  var n = publicKey[1];
  var encrypted = "";
  for (var i = 0; i < message.length; i++) {
    var charCode = message.charCodeAt(i);
    // console.log(charCode, e, n);
    var cipherCode = modExp(charCode, e, n);
    // console.log(cipherCode, " : ", String.fromCharCode(Number(cipherCode)));
    encrypted += String.fromCharCode(Number(cipherCode)).toString(16);
  }
  return encrypted;
}

// Decrypt a message
function decrypt(ciphertext, privateKey) {
  var d = privateKey[0];
  var n = privateKey[1];
  var decrypted = "";
  for (var i = 0; i < ciphertext.length; i++) {
    var cipherCode = ciphertext.charCodeAt(i);
    var charCode = modExp(cipherCode, d, n);
    var char = String.fromCharCode(Number(charCode));
    decrypted += char;
  }
  return decrypted;
}

// Sign a message
function sign(message, privateKey) {
  const hash = crypto.createHash("sha256").update(message).digest("hex");
  const signature = encrypt(hash, privateKey);
  return signature;
}

// Verify a signature
function verify(message, signature, publicKey) {
  const hash = crypto.createHash("sha256").update(message).digest("hex");
  const decryptedSignature = decrypt(signature, publicKey);
  return hash === decryptedSignature;
}

// Modular exponentiation
function modExp(base, exp, mod) {
  //   console.log("inside", base, exp, mod);
  base = BigInt(base);
  if (exp == 0n) {
    // console.log("first : 1");
    return 1n;
  }
  if (exp % 2n == 0n) {
    var half = modExp(base, exp / 2n, mod);
    // console.log("second: ", half, mod, ":", (half * half) % mod);
    return (half * half) % mod;
  }
  var half = modExp(base, (exp - 1n) / 2n, mod);
  //   console.log("third : ", half, base, mod, ":", (half * half * base) % mod);
  return (half * half * base) % mod;
}

// Example usage

const demo4 = () => {
  // var p = generatePrime(3n, 100n);
  var p = 97n;
  var q = 191n;
  // var q = generatePrime(100n, 200n);
  var n = p * q;
  console.log(p, q);
  var phi = (p - 1n) * (q - 1n);
  console.log(phi);
  var e = null;
  const possibleKeys = findEncryptionKeys(phi);
  readline.question(
    ` ${possibleKeys}\nselect any of the above possibleKeys : `,
    (key) => {
      e = BigInt(key);
      console.log("selected key : ", e);
      if (e) {
        var keys = generateKeys(n, phi, e);
        console.log(keys);

        // Signing a message
        var message = "Hello, world!";
        var signature = sign(message, keys.privateKey);

        console.log("Original message:", message);
        console.log("Signature:", signature);

        // Verifying a signature
        var verified = verify(message, signature, keys.publicKey);
        console.log("Signature verified:", verified);

        // Encrypting and decrypting a message
        var ciphertext = encrypt(message, keys.publicKey);
        console.log("Ciphertext:", ciphertext);

        var decrypted = decrypt(ciphertext, keys.privateKey);
        console.log("Decrypted message:", decrypted);
      }

      readline.close();
    }
  );
};

demo4();
