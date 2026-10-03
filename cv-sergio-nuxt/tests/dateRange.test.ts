import { describe, expect, it, vi } from 'vitest'

/**
 * The composable calls useI18n(), so we stub it. Only the pieces the date
 * logic actually reads are provided. Singular and plural are distinct keys,
 * matching what the composable selects between.
 */
function stubI18n(locale = 'es') {
  const PRESENT: Record<string, string> = { es: 'actualidad', ca: 'actualitat', en: 'present' }

  return {
    locale: { value: locale },
    t: (key: string, named?: Record<string, unknown>) => {
      const years = Number(named?.count ?? named?.years ?? 0)
      const months = Number(named?.months ?? 0)

      const isEn = locale === 'en'

      const table: Record<string, string> = {
        'resume.present': PRESENT[locale] ?? 'present',
        'resume.month': isEn ? `${months} month` : (months === 1 ? '1 mes' : `${months} meses`),
        'resume.months': isEn ? `${months} months` : (months === 1 ? '1 mes' : `${months} meses`),
        'resume.year': isEn ? `${years} year` : (years === 1 ? '1 año' : `${years} años`),
        'resume.years': isEn ? `${years} years` : (years === 1 ? '1 año' : `${years} años`),
        'resume.yearMonths': isEn
          ? `${years} yr ${months} mo`
          : (years === 1 ? `${years} año ${months} meses` : `${years} años ${months} meses`),
        'resume.yearsMonths': isEn
          ? `${years} yrs ${months} mo`
          : (years === 1 ? `${years} año ${months} meses` : `${years} años ${months} meses`),
      }

      return table[key] ?? key
    },
  }
}

async function loadComposable(locale = 'es') {
  const { useDateRange } = await import('../app/composables/useDateRange')
  const globalAny = globalThis as unknown as { __i18n?: unknown }
  globalAny.__i18n = locale

  vi.stubGlobal('useI18n', () => stubI18n(locale))

  return useDateRange()
}

describe('date range formatting', () => {
  it('renders year-only ranges as plain years', async () => {
    const { formatRange } = await loadComposable('es')

    expect(formatRange({ start: '2021', end: '2023' })).toBe('2021 – 2023')
    expect(formatRange({ start: '2025', end: '2025' })).toBe('2025')
  })

  it('renders an ongoing year-only entry as "<year> – actualidad"', async () => {
    const { formatRange } = await loadComposable('es')

    expect(formatRange({ start: '2025', end: null })).toBe('2025 – actualidad')
  })

  it('renders month precision with the localized month abbreviation', async () => {
    const es = await loadComposable('es')
    expect(es.formatRange({ start: '2026-10', end: null })).toBe('oct 2026 – actualidad')

    const ca = await loadComposable('ca')
    expect(ca.formatRange({ start: '2026-10', end: null })).toBe('oct 2026 – actualitat')

    const en = await loadComposable('en')
    expect(en.formatRange({ start: '2026-10', end: null })).toBe('Oct 2026 – present')
  })

  it('uses distinct month names per language', async () => {
    const es = await loadComposable('es')
    const ca = await loadComposable('ca')

    // September: 'sep' in Spanish, 'set' in Catalan.
    expect(es.formatRange({ start: '2025-09', end: '2025-09' })).toBe('sep 2025')
    expect(ca.formatRange({ start: '2025-09', end: '2025-09' })).toBe('set 2025')
  })

  it('collapses a single-month range instead of repeating it', async () => {
    const { formatRange } = await loadComposable('es')

    expect(formatRange({ start: '2026-03', end: '2026-03' })).toBe('mar 2026')
  })

  it('marks ongoing entries so the UI can badge them', async () => {
    const { isCurrent } = await loadComposable('es')

    expect(isCurrent({ start: '2026-10', end: null })).toBe(true)
    expect(isCurrent({ start: '2021', end: '2023' })).toBe(false)
  })
})

describe('duration', () => {
  it('refuses to state a duration for year-only data', async () => {
    const { duration } = await loadComposable('es')

    // Precision is unknown: claiming "3 años" could overstate the time.
    expect(duration({ start: '2021', end: '2023' })).toBeNull()
    expect(duration({ start: '2025', end: '2025' })).toBeNull()
  })

  it('computes whole years when both ends are closed', async () => {
    const { duration } = await loadComposable('es')

    expect(duration({ start: '2020-01', end: '2022-01' })).toBe('2 años')
  })

  it('computes years plus months', async () => {
    const { duration } = await loadComposable('es')

    expect(duration({ start: '2020-01', end: '2022-04' })).toBe('2 años 3 meses')
  })

  it('measures an ongoing entry from its start to the current month', async () => {
    const { duration } = await loadComposable('es')

    const now = new Date()
    // A date guaranteed to be in the past, at known month precision.
    const start = '2024-01'
    const value = duration({ start, end: null })

    const elapsed = (now.getFullYear() - 2024) * 12 + (now.getMonth() + 1 - 1)

    expect(elapsed).toBeGreaterThan(0)
    expect(value, 'un entry en curso nunca debe durar null si ya pasó tiempo').not.toBeNull()
    expect(value).toMatch(/mes|año/)
  })

  it('returns null for an entry that started this very month', async () => {
    const { duration } = await loadComposable('es')

    const now = new Date()
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    // Zero elapsed months is not a meaningful duration to display.
    expect(duration({ start: thisMonth, end: null })).toBeNull()
  })

  it('returns null when the range ends before it starts', async () => {
    const { duration } = await loadComposable('es')

    expect(duration({ start: '2026-10', end: '2025-01' })).toBeNull()
  })
})
