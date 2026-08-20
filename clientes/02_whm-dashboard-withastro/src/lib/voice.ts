export const LOCALE_TO_LANG: Record<string, string> = {
	es: 'es-AR',
	en: 'en-US',
	ca: 'ca-ES',
	fr: 'fr-FR',
};

interface RecognitionLike {
	lang: string;
	continuous: boolean;
	interimResults: boolean;
	start: () => void;
	stop: () => void;
	abort: () => void;
	onresult: ((event: RecognitionResultLike) => void) | null;
	onend: (() => void) | null;
	onerror: ((event: { error: string }) => void) | null;
}

interface RecognitionResultLike {
	results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}

export interface RecognitionEvents {
	onInterim: (text: string) => void;
	onFinal: (text: string) => void;
	onStop: () => void;
}

function getRecognitionCtor(): (new () => RecognitionLike) | null {
	if (typeof window === 'undefined') return null;
	const w = window as unknown as {
		SpeechRecognition?: new () => RecognitionLike;
		webkitSpeechRecognition?: new () => RecognitionLike;
	};
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const voiceSupported = (): boolean => getRecognitionCtor() !== null;

export function startRecognition(events: RecognitionEvents, lang = 'es-AR'): (() => void) | null {
	const Ctor = getRecognitionCtor();
	if (!Ctor) return null;

	const recognition = new Ctor();
	recognition.lang = lang;
	recognition.continuous = false;
	recognition.interimResults = true;

	recognition.onresult = (event) => {
		const last = event.results[event.results.length - 1];
		if (!last) return;
		const transcript = last[0]?.transcript ?? '';
		if (last.isFinal) {
			events.onFinal(transcript);
		} else {
			events.onInterim(transcript);
		}
	};

	recognition.onerror = () => events.onStop();
	recognition.onend = () => events.onStop();
	recognition.start();

	return () => {
		try {
			recognition.abort();
		} catch {
			// El reconocimiento ya terminó.
		}
	};
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): void {
	if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
	cachedVoices = window.speechSynthesis.getVoices();
}

export function primeVoices(): void {
	if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
	loadVoices();
	window.speechSynthesis.onvoiceschanged = loadVoices;
}

export const ttsSupported = (): boolean =>
	typeof window !== 'undefined' && 'speechSynthesis' in window;

const SPANISH_LANGS = ['es-AR', 'es-MX', 'es-US', 'es-ES', 'es'];

function pickVoice(lang: string): SpeechSynthesisVoice | null {
	if (cachedVoices.length === 0) loadVoices();
	const base = lang.split('-')[0];
	const langMatches = [
		lang,
		`${base}-ES`,
		`${base}-US`,
		`${base}-AR`,
		`${base}-MX`,
		base,
	];
	for (const candidate of langMatches) {
		const match = cachedVoices.find((voice) => voice.lang.toLowerCase().startsWith(candidate.toLowerCase()));
		if (match) return match;
	}
	for (const fallback of SPANISH_LANGS) {
		const match = cachedVoices.find((voice) => voice.lang.toLowerCase().startsWith(fallback));
		if (match) return match;
	}
	return null;
}

export function speak(
	text: string,
	opts: { onEnd?: () => void; lang?: string } = {},
): void {
	if (!ttsSupported()) return;
	const synth = window.speechSynthesis;
	synth.cancel();

	const lang = opts.lang ?? 'es-AR';
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = lang;
	utterance.rate = 1;
	const voice = pickVoice(lang);
	if (voice) utterance.voice = voice;

	if (opts.onEnd) {
		utterance.onend = () => opts.onEnd?.();
		utterance.onerror = () => opts.onEnd?.();
	}
	synth.speak(utterance);
}

export function cancelSpeech(): void {
	if (ttsSupported()) window.speechSynthesis.cancel();
}
