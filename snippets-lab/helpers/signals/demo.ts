import { createDebouncedSignal } from "./signal.service";
import { createEffect, createMemo, createSignal, createStorageSignal, createToggle } from "./utils/reactive.utils";

// Basic signal
const [count, setCount] = createSignal(0);

// Subscribe to changes
const unsubscribe = count.subscribe((newVal, oldVal) => {
	console.log(`Count: ${oldVal} → ${newVal}`);
});

// Update signal
setCount(1);
setCount((prev) => prev + 1);

// Effect
const cleanup = createEffect(() => {
	console.log(`Current count: ${count()}`);
	return () => console.log("Effect cleanup");
}, [count]);

// Memo (computed value)
const [firstName, setFirstName] = createSignal("John");
const [lastName, setLastName] = createSignal("Doe");

const fullName = createMemo(() => `${firstName()} ${lastName()}`, [firstName, lastName]);
console.log(fullName()); // "John Doe"

// Toggle
const [isOpen, setIsOpen] = createToggle(false);
setIsOpen.toggle(); // true
setIsOpen.set(false); // false

// Storage signal
const [theme, setTheme] = createStorageSignal<"light" | "dark">("theme", "light", "local");
setTheme("dark"); // Saves to localStorage

// Debounced signal (for search inputs)
const [search, setSearch] = createDebouncedSignal("", 500);
search.subscribe((val) => console.log("Search:", val));
setSearch("h");
setSearch("he");
setSearch("hel");
setSearch("hello"); // Only logs after 500ms

// Cleanup
unsubscribe();
cleanup();