import { atom } from 'nanostores';

const isBrowser = typeof window !== 'undefined';
const initialTheme = isBrowser ? (localStorage.getItem('theme') || 'light') : 'light';

export const theme = atom<string>(initialTheme);

export function toggleTheme() {
  const newTheme = theme.get() === 'light' ? 'dark' : 'light';
  theme.set(newTheme);
}

if (isBrowser) {
  theme.listen((value) => {
    localStorage.setItem('theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}
