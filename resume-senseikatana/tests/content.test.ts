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

    /*
      Bare `TEA`/`ASD` MUST be word-bounded: as plain substrings they match
      innocent words — "TEA" hits "teams", "ASD" would hit any acronym soup.
      Only the spelled-out disability terms may match as substrings.
    */
    const FORBIDDEN: RegExp[] = [
      /discapac|discap|disabil|disabilitat|autis/i,
      /\bTEA\b/,
      /\bASD\b/,
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
          ).not.toMatch(term)
        }
      }
    }
  })

  /*
    Contact details must never appear in the published collection.

    Not in the source JSON, and — critically — not in the schema either. If
    `email`/`phone` were declared, @nuxt/content would serialise them into
    `_payload.json`, which the browser downloads unasked. A `mailto:` removed
    from a template does NOT stop that leak.
  */
  it('no contact details are declared in the resume collection', () => {
    const dir = join(CONTENT_DIR, 'resume')
    const files = readdirSync(dir).filter(f => f.endsWith('.json'))

    expect(files.length).toBeGreaterThan(0)

    for (const file of files) {
      const raw = readFileSync(join(dir, file), 'utf8')
      const resume = JSON.parse(raw)

      expect('email' in resume, `${file}: "email" no debe existir — va en runtimeConfig`).toBe(false)
      expect('phone' in resume, `${file}: "phone" no debe existir — va en runtimeConfig`).toBe(false)

      // The literal address and digits must not be in the content source.
      expect(raw, `${file}: contiene el email literal`).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/)
      expect(raw.replace(/\D/g, ''), `${file}: contiene dígitos de teléfono`).not.toContain('637723747')
    }
  })

  /*
    Schema-level guard.

    Read as source rather than imported: `defineCollection` needs the Nuxt
    module runtime to resolve Zod, so `import('../content.config')` throws
    outside a build. A static check on the resume block is what actually
    protects the payload, and it runs anywhere.
  */
  it('the resume schema does not declare contact or health fields', () => {
    const source = readFileSync(
      join(process.cwd(), 'content.config.ts'),
      'utf8',
    )

    // Isolate the resume collection block.
    const start = source.indexOf("source: 'resume/**'")
    expect(start, 'no se encontró la collection resume en content.config.ts').toBeGreaterThan(-1)

    const block = source.slice(start, source.indexOf('})', start))

    expect(block, 'el schema no debe declarar "email"').not.toMatch(/^\s*email:\s*z\./m)
    expect(block, 'el schema no debe declarar "phone"').not.toMatch(/^\s*phone:\s*z\./m)
    expect(block, 'el schema no debe declarar "note" (dato de salud)').not.toMatch(/^\s*note:\s*z\./m)
  })
})
