/**
 * Utilitas sandi (cipher) untuk mini-game "Sinyal Misterius".
 * Fungsi encode dipakai untuk membangkitkan pesan terenkripsi di seed,
 * sedangkan decode dipakai untuk verifikasi jawaban pengguna.
 *
 * CATATAN: ini sandi edukasi/fiksi — BUKAN kriptografi untuk keamanan nyata.
 */

export const SYMBOL_LEGEND: Record<string, string> = {
  A: '△',
  B: '▽',
  C: '◇',
  D: '◈',
  E: '○',
  F: '●',
  G: '□',
  H: '■',
  I: '☆',
  J: '★',
  K: '⬢',
  L: '⬡',
  M: '⬟',
  N: '⬠',
  O: '◎',
  P: '◐',
  Q: '◑',
  R: '◒',
  S: '◓',
  T: '⌂',
  U: '⌘',
  V: '⌁',
  W: '⌾',
  X: '⌬',
  Y: '⎔',
  Z: '⍟'
};

export const SYMBOL_LEGEND_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(SYMBOL_LEGEND).map(([letter, symbol]) => [symbol, letter])
);

// ------------------------------- BINARY -------------------------------
export function textToBinary(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      return code.toString(2).padStart(8, '0');
    })
    .join(' ');
}

export function binaryToText(binary: string): string {
  return binary
    .trim()
    .split(/\s+/)
    .map((chunk) => String.fromCharCode(parseInt(chunk, 2)))
    .join('');
}

// ------------------------------- CAESAR -------------------------------
export function caesar(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code < 65 || code > 90) return char;
      return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
    })
    .join('');
}

export function caesarDecode(text: string, shift: number): string {
  return caesar(text, -shift);
}

// -------------------------------- ROT13 --------------------------------
export function rot13(text: string): string {
  return caesar(text, 13);
}

// ------------------------------- SYMBOL -------------------------------
export function textToSymbols(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      if (char === ' ') return '  ';
      return SYMBOL_LEGEND[char] ?? char;
    })
    .join(' ');
}

export function symbolsToText(symbols: string): string {
  return symbols
    .split(/\s+/)
    .filter(Boolean)
    .map((symbol) => SYMBOL_LEGEND_REVERSE[symbol] ?? '?')
    .join('');
}

/** Normalisasi jawaban: buang diakritik, tanda baca, dan spasi berlebih. */
export function normalizeAnswer(input: string): string {
  return input
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Cek jawaban pengguna. Toleran terhadap spasi dan tanda baca, tetapi
 * mensyaratkan minimal 80% kata inti cocok agar tidak mudah di-brute force.
 */
export function isDecodeCorrect(userInput: string, decodedMessage: string): boolean {
  const user = normalizeAnswer(userInput);
  const truth = normalizeAnswer(decodedMessage);
  if (user.length === 0) return false;
  if (user === truth) return true;

  // Toleransi: pesan utama (sebelum tanda pisah "—") sudah benar
  const truthCore = truth.split(' — ')[0];
  if (truthCore.length > 12 && user.includes(truthCore)) return true;

  const truthWords = truth.split(' ').filter((word) => word.length > 3);
  if (truthWords.length === 0) return false;
  const matched = truthWords.filter((word) => user.includes(word)).length;
  return matched / truthWords.length >= 0.8;
}

export function encodeWithCipher(cipher: string, plaintext: string, shift = 3): string {
  switch (cipher) {
    case 'binary':
      return textToBinary(plaintext);
    case 'caesar':
      return caesar(plaintext, shift);
    case 'rot13':
      return rot13(plaintext);
    case 'symbol':
      return textToSymbols(plaintext);
    default:
      return plaintext;
  }
}

export function decodeWithCipher(cipher: string, encoded: string, shift = 3): string {
  switch (cipher) {
    case 'binary':
      return binaryToText(encoded);
    case 'caesar':
      return caesarDecode(encoded, shift);
    case 'rot13':
      return rot13(encoded);
    case 'symbol':
      return symbolsToText(encoded);
    default:
      return encoded;
  }
}

export const CIPHER_LABELS: Record<string, string> = {
  binary: 'Biner 8-bit (ASCII)',
  caesar: 'Caesar Cipher',
  rot13: 'ROT13',
  symbol: 'Substitusi Simbol Alien'
};

export const CAESAR_SHIFT = 3;
