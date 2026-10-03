import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT_DIR = join(process.cwd(), 'content')
const COLLECTIONS = ['blog', 'resume', 'services', 'projects', 'testimonials'] as const

function frontmatterOf(path: string): string {
  return readFileSync(path, 'utf8').split('---')[1] ?? ''
}

describe('Content collections', () => {
  it.each(COLLECTIONS)('collection %s/ exists and is not empty', (collection) => {
    const files = readdirSync(join(CONTENT_DIR, collection)).filter(f => !f.startsWith('.'))

    expect(files.length, `content/${collection}/ está vacía`).toBeGreaterThan(0)
  })

  it('every blog post declares the frontmatter the schema requires', () => {
    const dir = join(CONTENT_DIR, 'blog')
    const posts = readdirSync(dir).filter(f => f.endsWith('.md'))

    expect(posts.length).toBeGreaterThan(0)

    for (const post of posts) {
      const fm = frontmatterOf(join(dir, post))

      expect(fm, `${post}: sin title`).toContain('title:')
      expect(fm, `${post}: sin description`).toContain('description:')
      expect(fm, `${post}: sin date`).toContain('date:')
    }
  })

  it('placeholder services and projects stay draft until real content replaces them', () => {
    for (const collection of ['services', 'projects'] as const) {
      const dir = join(CONTENT_DIR, collection)
      const files = readdirSync(dir).filter(f => f.startsWith('TODO') && f.endsWith('.md'))

      expect(files.length, `sin placeholders en ${collection}/`).toBeGreaterThan(0)

      for (const file of files) {
        expect(frontmatterOf(join(dir, file)), `${file}: un TODO debe seguir en draft: true`)
          .toContain('draft: true')
      }
    }
  })

  it('testimonials require provenance so no quote floats free of its source', () => {
    const dir = join(CONTENT_DIR, 'testimonials')
    const files = readdirSync(dir).filter(f => f.endsWith('.json'))

    expect(files.length).toBeGreaterThan(0)

    for (const file of files) {
      const entry = JSON.parse(readFileSync(join(dir, file), 'utf8'))

      expect(entry.source, `${file}: falta source`).toBeTruthy()
      expect(entry.quote, `${file}: falta quote`).toBeTruthy()
      expect(entry.author, `${file}: falta author`).toBeTruthy()
    }
  })

  /*
    RGPD art. 9 — special-category data must never reach the public collection.

    Health data (disability certification) belongs in the downloadable PDF,
    requested privately. If someone re-adds it to the root `note`, this fails.

    NOTE: only the ROOT `note` is forbidden. `education[].note` is a legitimate
    field ("Carretillas y Ventas") and is untouched.
  */
  it('no special-category health data is published in the resume collection', () => {
    const dir = join(CONTENT_DIR, 'resume')
    const files = readdirSync(dir).filter(f => f.endsWith('.json'))

    const FORBIDDEN = [
      'discapac', 'discap', 'TEA', 'ASD', 'autis', 'disabil', 'disabilitat',
    ]

    expect(files.length).toBeGreaterThan(0)

    for (const file of files) {
      const raw = readFileSync(join(dir, file), 'utf8')
      const resume = JSON.parse(raw)

      // 1. The root `note` field (the health data carrier) must be gone.
      expect(
        'note' in resume,
        `${file}: el "note" raíz no debe existir — es el campo que llevaba el dato de salud`,
      ).toBe(false)

      // 2. Every language must declare the neutral, non-identifying line.
      expect(
        resume.certificationOnRequest,
        `${file}: falta certificationOnRequest en ${file}`,
      ).toBeTruthy()

      // 3. No forbidden term may appear anywhere except that neutral line.
      const neutralLine = raw.split('\n').find(l => l.includes('certificationOnRequest')) ?? ''

      for (const line of raw.split('\n')) {
        if (line === neutralLine) continue

        for (const term of FORBIDDEN) {
          expect(
            line,
            `${file}: término de dato de salud fuera de certificationOnRequest → "${line.trim()}"`,
          ).not.toMatch(new RegExp(term, 'i'))
        }
      }
    }
  })
})
