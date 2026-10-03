import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const SOURCE = join(import.meta.dirname, '..', 'public', 'cv', 'sergio-jurado.jpg')
const OUT_DIR = join(import.meta.dirname, '..', 'public', 'img')
const SIZES = [96, 192, 384, 768]

interface EncodeStrategy {
  readonly extension: string
  encode: (pipeline: sharp.Sharp) => sharp.Sharp
}

/** AVIF wins on size but costs CPU; keep quality moderate. */
const AVIF: EncodeStrategy = {
  extension: 'avif',
  encode: pipeline => pipeline.avif({ quality: 55, effort: 6 }),
}

/** WebP is the universal fallback: broad support, cheap to encode. */
const WEBP: EncodeStrategy = {
  extension: 'webp',
  encode: pipeline => pipeline.webp({ quality: 78, effort: 5 }),
}

const STRATEGIES: EncodeStrategy[] = [AVIF, WEBP]

/**
 * Circular alpha mask. SVG destination-in via composite keeps the crop
 * square and the alpha round in a single operation.
 */
function circularMask(size: number): Buffer {
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  )
}

/** Shared geometry: square crop biased to the top of a portrait source. */
function squareCrop(size: number): sharp.Sharp {
  return sharp(SOURCE)
    .resize(size, size, { fit: 'cover', position: 'top' })
}

/** Factory: builds one writer per (size, format) combination. */
function createWriters() {
  return SIZES.flatMap(size =>
    STRATEGIES.map(strategy => async () => {
      const file = join(OUT_DIR, `avatar-${size}.${strategy.extension}`)
      const buffer = await strategy.encode(squareCrop(size))
        .composite([{ input: circularMask(size), blend: 'dest-in' }])
        .toBuffer()

      await Bun.write(file, buffer)
      return { file, bytes: buffer.byteLength }
    }),
  )
}

async function generateAvatars(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true })

  const results = await Promise.all(createWriters().map(write => write()))

  for (const { file, bytes } of results) {
    console.log(`${file.split('/').pop()!.padEnd(20)} ${(bytes / 1024).toFixed(1)} KB`)
  }
  console.log(`\n${results.length} files generated`)
}

await generateAvatars()
