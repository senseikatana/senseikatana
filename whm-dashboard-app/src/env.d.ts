/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_AI_ENDPOINT?: string;
	readonly PUBLIC_API_BASE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
