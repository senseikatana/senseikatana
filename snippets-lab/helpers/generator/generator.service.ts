// services/GeneratorService.ts
// import crypto from "crypto";

export function NUMERIC_ID(counter = 0): number {
  return Number(++counter);
}

export function UUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random: number | string = (Math.random() * 16) | 0;
    const value: number | string = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function SHORT_UID(length = 16): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join(
    "",
  );
}

export function generateUUIDs(count: number): string[] {
  return Array.from({ length: count }, () => UUID().toString());
}

export function SLUGIFY(text: string): string {
  if (!text) throw new Error("Text is required for slugify");

  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function TOKEN(): number {
  return Math.floor(100_000 + Math.random() * 900_000);
}

export async function ENCRYPT(plainText: string, salt = ""): Promise<string> {
  const rounds: string | number = crypto.randomBytes(32).toString("hex");
  const hash: string | CryptoKey = crypto
    .pbkdf2Sync(plainText, salt, 100_000, 64, "sha512")
    .toString("hex");

  return `${rounds}:${hash}`;
}

export default class GeneratorService {
  private static instance: GeneratorService;
  private counter = 0;

  private constructor() {}

  static getInstance(): GeneratorService {
    if (!GeneratorService.instance) {
      GeneratorService.instance = new GeneratorService();
    }
    return GeneratorService.instance;
  }

  numericId(): number {
    return ++this.counter;
  }

  generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  generateShortId(length = 16): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join("");
  }

  generateUUIDs(count: number): string[] {
    return Array.from({ length: count }, () => generateUUID());
  }

  slugify(text: string): string {
    if (!text) throw new Error("Text is required for slugify");

    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  token(): number {
    return Math.floor(100_000 + Math.random() * 900_000);
  }

  async encrypt(plainText: string, salt = "default-salt"): Promise<string> {
    const rounds = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(plainText, salt, 100_000, 64, "sha512").toString("hex");

    return `${rounds}:${hash}`;
  }
}
