import { useStore } from '@nanostores/react';
import { theme, toggleTheme } from '../store/theme';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const currentTheme = useStore(theme);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayTheme = isMounted ? currentTheme : 'light';

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-600 hover:text-brand-dark dark:text-gray-300 dark:hover:text-white transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {displayTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
