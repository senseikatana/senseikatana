/**
 * Theme controller — Select dropdown for theme family + ThemeToggle for light/dark.
 * Persists to localStorage, applies data-lumen-preset / data-lumen-scheme on <html>.
 */

const themeSelect = document.querySelector<HTMLSelectElement>('#theme-family');
const modeToggle = document.querySelector<HTMLButtonElement>('[data-theme-mode]');
const root = document.documentElement;

const families = ['lumen', 'studio', 'paper'];

const syncModeToggle = () => {
  if (!modeToggle) return;
  const isDark = root.dataset.lumenScheme === 'dark';
  modeToggle.setAttribute('aria-pressed', String(isDark));
  modeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
};

const syncControls = () => {
  if (themeSelect) {
    themeSelect.value = root.dataset.lumenFamily ?? 'lumen';
    themeSelect.dispatchEvent(new Event('change'));
  }
  syncModeToggle();
};

const applyTheme = (family: string, mode: string) => {
  root.dataset.lumenFamily = family;
  root.dataset.lumenScheme = mode;
  root.dataset.theme = `lumen-${mode}`;
  if (family !== 'lumen') root.dataset.lumenPreset = family;
  else delete root.dataset.lumenPreset;
  root.classList.toggle('dark', mode === 'dark');
  syncModeToggle();
  try {
    localStorage.setItem('lumen-theme-family', family);
    localStorage.setItem('lumen-theme-mode', mode);
  } catch {
    /* storage may be blocked */
  }
};

syncControls();

themeSelect?.addEventListener('change', () => {
  if (families.includes(themeSelect.value)) {
    applyTheme(themeSelect.value, root.dataset.lumenScheme ?? 'light');
  }
});

modeToggle?.addEventListener('click', () => {
  applyTheme(
    root.dataset.lumenFamily ?? 'lumen',
    root.dataset.lumenScheme === 'dark' ? 'light' : 'dark',
  );
});
