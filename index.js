const crypt = require('crypto')
const wordlist = require('./english.json')

const generateMnemonic = (n) => {
  const bits = BigInt(`0x${n}`).toString(2).padStart(128, "0");
  const checksum = generateChecksum(bits)
  const wordBits = bits+checksum
  const wordIndex = wordBits.match(new RegExp(`.{1,${11}}`, 'g'));
  const mnemonic = wordIndex.map(index => wordlist[parseInt(index, 2)]);
  console.log(mnemonic)
};

generateMnemonic("063679ca1b28b5cfda9c186b367e271e");

function generateChecksum(bits) {
    const checksumLength = bits.length / 32;
    const hash =  crypt.createHash('sha256').update(bits, 'binary').digest('hex');
    const hashBinary = BigInt(`0x${hash}`).toString(2).padStart(256, '0');
    return hashBinary.slice(0, checksumLength);
}