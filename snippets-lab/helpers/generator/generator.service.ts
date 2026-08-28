// services/GeneratorService.ts
import crypto from "crypto";

export default class GeneratorService {
	private static instance: GeneratorService;
	private counter: number = 0;

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

	uuid(): string {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
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
		return Math.floor(100000 + Math.random() * 900000);
	}

	async encrypt(plainText: string, salt: string = "default-salt"): Promise<string> {
		const rounds = crypto.randomBytes(32).toString("hex");
		const hash = crypto
			.pbkdf2Sync(plainText, salt, 100000, 64, "sha512")
			.toString("hex");

		return `${rounds}:${hash}`;
	}
}


export const {uuid, token, slugify}: GeneratorService = GeneratorService.getInstance()


console.log('Slugify: ', slugify('title of my post blog with Astro, which generate a slug automatically'));


console.log(uuid())