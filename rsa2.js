// Generate a random prime number
function generatePrime(min, max) {
  var prime = false;
  while (!prime) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    prime = isPrime(num);
  }
  return num;
}

// Check if a number is prime
function isPrime(num) {
  if (num < 2) return false;
  for (var i = 2; i < num; i++) {
    if (num % i == 0) return false;
  }
  return true;
}

// Find the greatest common divisor
function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

// Generate keys
function generateKeys() {
  var p = generatePrime(3, 100);
  var q = generatePrime(101, 200);
  var n = p * q;
  var phi = (p - 1) * (q - 1);
  var e = 3;
  while (gcd(e, phi) != 1) {
    e += 2;
  }
  var d = 0;
  while ((d * e) % phi != 1) {
    d++;
  }
  return { publicKey: [e, n], privateKey: [d, n] };
}

// Encrypt a message
function encrypt(message, publicKey) {
  var e = publicKey[0];
  var n = publicKey[1];
  var encrypted = [];
  for (var i = 0; i < message.length; i++) {
    var charCode = message.charCodeAt(i);
    // console.log(charCode, e, n);
    var cipherCode = modExp(charCode, e, n);
    encrypted.push(cipherCode);
  }
  return encrypted;
}

// Decrypt a message
function decrypt(ciphertext, privateKey) {
  var d = privateKey[0];
  var n = privateKey[1];
  var decrypted = "";
  for (var i = 0; i < ciphertext.length; i++) {
    var cipherCode = ciphertext[i];
    var charCode = modExp(cipherCode, d, n);
    var char = String.fromCharCode(charCode);
    decrypted += char;
  }
  return decrypted;
}

// Modular exponentiation
function modExp(base, exp, mod) {
  //   console.log("inside", base, exp, mod);
  if (exp == 0) {
    // console.log("first : 1");
    return 1;
  }
  if (exp % 2 == 0) {
    var half = modExp(base, exp / 2, mod);
    // console.log("second: ", half, mod, ":", (half * half) % mod);
    return (half * half) % mod;
  }
  var half = modExp(base, (exp - 1) / 2, mod);
  //   console.log("third : ", half, base, mod, ":", (half * half * base) % mod);
  return (half * half * base) % mod;
}

// Example usage
var keys = generateKeys();
// var keys = { publicKey: [3, 11269], privateKey: [7347, 11269] };

var message = "Hello, world!";
var ciphertext = encrypt(message, keys.publicKey);

console.log("Original message:", message);
console.log("Ciphertext:", ciphertext);

var decrypted = decrypt(ciphertext, keys.privateKey);
console.log("Decrypted message:", decrypted);
