const crypto = require("crypto");

const algo = "aes-256-cbc";

const inVec = crypto.randomBytes(16);

const msg = "rushikesh";

const secKey = crypto.randomBytes(32);

const cipherText = crypto.createCipheriv(algo,secKey,inVec);

let encryptedData = cipherText.update(msg, "utf-8", "hex");

encryptedData += cipherText.final("hex");

console.log("encrypted msg = " + encryptedData);

const decipherText = crypto.createDecipheriv(algo, secKey, inVec);

let decryptedData = decipherText.update(encryptedData, "hex", "utf-8");

decryptedData += decipherText.final("utf-8");

console.log("decrypted = " + decryptedData);