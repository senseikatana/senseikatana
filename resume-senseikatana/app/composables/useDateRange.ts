/**
 * Partial-precision date handling for the resume.
 *
 * Most of Sergio's entries are known only to the YEAR (2025, 2024,
 * 2021-2023). Inventing months would be fabricating data, so dates are
 * stored at the precision we actually know:
 *
 *   '2025'         year only
 *   '2026-10'      year + month
 *   '2026-10-01'   full date
 *
 * `null` as `end` means "ongoing", which renders as the localized word for
 * "present" and keeps being correct as time passes — no manual edit needed.
 */

export interface DateRange {
  start: string
  end: string | null
}

/** Parses 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD' without inventing precision. */
function parse(value: string): { year: number, month: number | null, day: number | null } | null {
  const parts = value.split('-')
  const year = Number(parts[0])

  if (!Number.isInteger(year)) return null

  return {
    year,
    month: parts[1] ? Number(parts[1]) : null,
    day: parts[2] ? Number(parts[2]) : null,
  }
}

const MONTHS: Record<string, string[]> = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  ca: ['gen', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

export function useDateRange() {
  const { locale, t } = useI18n()

  /** '2026-10' → 'oct 2026', '2025' → '2025' */
  function formatDate(value: string, short = false): string {
    const parsed = parse(value)

    if (!parsed) return value

    if (parsed.month === null) return String(parsed.year)

    const lang = locale.value.slice(0, 2)
    const months = MONTHS[lang] ?? MONTHS.en!
    const month = months[parsed.month - 1]

    if (short) return `${month} ${String(parsed.year).slice(2)}`

    return `${month} ${parsed.year}`
  }

  /** Renders '2021 – 2023', '2026 – actualidad', or '2025'. */
  function formatRange(range: DateRange): string {
    const from = parse(range.start)

    if (!from) return range.start

    // A single year with no end reads better as just the year.
    if (range.end === null && from.month === null) {
      return `${from.year} – ${t('resume.present')}`
    }

    const start = formatDate(range.start)

    if (range.end === null) return `${start} – ${t('resume.present')}`

    const end = parse(range.end)
    const endLabel = end ? formatDate(range.end) : range.end

    return start === endLabel ? start : `${start} – ${endLabel}`
  }

  /**
   * Elapsed time, only when precision allows it. With year-only data we
   * cannot claim "2 years 3 months", so we stay at year granularity rather
   * than rounding up and overstating.
   */
  function duration(range: DateRange): string | null {
    const from = parse(range.start)

    if (!from || from.month === null) return null

    const now = new Date()
    const to = range.end === null
      ? { year: now.getFullYear(), month: now.getMonth() + 1 }
      : parse(range.end)

    if (!to) return null

    const months = (to.year - from.year) * 12 + (to.month - from.month)

    if (months < 0) return null

    if (months === 0) return null

    const years = Math.floor(months / 12)
    const rest = months % 12

    if (years === 0) {
      return t(rest === 1 ? 'resume.month' : 'resume.months', { count: rest })
    }

    if (rest === 0) {
      return t(years === 1 ? 'resume.year' : 'resume.years', { count: years })
    }

    return t(years === 1 ? 'resume.yearMonths' : 'resume.yearsMonths', { years, months: rest })
  }

  /** True for the entry that is still ongoing. */
  function isCurrent(range: DateRange): boolean {
    return range.end === null
  }

  return { formatDate, formatRange, duration, isCurrent }
}
