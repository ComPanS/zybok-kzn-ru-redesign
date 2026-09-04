import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const routes = [
  '/services', '/services/terapiya', '/services/hirurgiya', '/services/ortodontiya',
  '/services/ortopediya', '/services/implantologiya', '/doctors', '/prices', '/about',
  '/reviews', '/contacts'
]
const root = join(process.cwd(), 'dist')
const source = await readFile(join(root, 'index.html'), 'utf8')
for (const route of routes) {
  const dir = join(root, route.slice(1))
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'index.html'), source)
}
await copyFile(join(root, 'index.html'), join(root, '404.html'))
await writeFile(join(root, '.nojekyll'), '')
console.log(`Generated ${routes.length} static route shells + 404.html`)
