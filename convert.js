function strToHex(str) {
  let encoder = new TextEncoder();
  let encoded = encoder.encode(str);
  console.log(encoded);
  let hex = "";
  for (let i = 0; i < encoded.length; i++) {
    hex += encoded[i].toString(16);
  }
  return hex;
}

function hexToStr(hex) {
  let decoder = new TextDecoder("utf-8");
  let bytes = new Uint8Array(
    hex.match(/[\da-f]{2}/gi).map(function (h) {
      console.log(h);
      return parseInt(h, 16);
    })
  );
  console.log(bytes);
  return decoder.decode(bytes);
}

let str =
  "ㄒދⶹⶹp䕔≰႖p㹞ⶹ໼ᩗ";
let hex = strToHex(str);
console.log(hex);
let str2 = hexToStr(hex);
console.log(str2);
console.log(str === str2); // true
