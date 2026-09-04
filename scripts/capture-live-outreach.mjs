import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const base = 'https://compans.github.io/zybok-kzn-ru-redesign'
await mkdir('outreach/screenshots', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

const captures = [
  { path: '/', file: '01-homepage.png', y: 0 },
  { path: '/prices/', file: '02-prices.png', y: 330 },
  { path: '/doctors/', file: '03-doctors.png', y: 430 },
]
for (const item of captures) {
  await page.goto(base + item.path, { waitUntil: 'networkidle' })
  await page.evaluate((y) => window.scrollTo(0, y), item.y)
  await page.waitForTimeout(250)
  await page.screenshot({ path: `outreach/screenshots/${item.file}` })
  console.log(item.file, page.url(), await page.title())
}
await browser.close()
