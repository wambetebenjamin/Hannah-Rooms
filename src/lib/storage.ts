import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { put } from '@vercel/blob'

/**
 * Photo storage. Uses Vercel Blob when BLOB_READ_WRITE_TOKEN is configured
 * (production). Without it (local preview) photos are written to
 * public/uploads so the flow can be tested end to end.
 */
export async function saveRoomPhotos(files: File[]): Promise<string[]> {
  const saved: string[] = []
  const token = process.env.BLOB_READ_WRITE_TOKEN

  for (const file of files) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(-60)
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`

    if (token) {
      const blob = await put(`rooms/${key}`, file, {
        access: 'public',
        token,
        addRandomSuffix: true,
      })
      saved.push(blob.url)
    } else {
      const dir = path.join(process.cwd(), 'public', 'uploads')
      await mkdir(dir, { recursive: true })
      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(path.join(dir, key), buffer)
      saved.push(`/uploads/${key}`)
    }
  }

  return saved
}
