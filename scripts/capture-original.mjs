import { chromium, devices } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
await mkdir('audit/original', { recursive: true })
const browser = await chromium.launch()
for (const item of [
  { name: 'home-desktop.png', viewport: { width: 1440, height: 900 }, isMobile: false },
  { name: 'home-mobile.png', ...devices['iPhone 13'] },
]) {
  const context = await browser.newContext(item)
  const page = await context.newPage()
  await page.goto('http://zybok-kzn.ru/', { waitUntil: 'networkidle', timeout: 30_000 })
  await page.screenshot({ path: `audit/original/${item.name}`, fullPage: true })
  console.log(item.name, await page.evaluate(() => ({ innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyWidth: document.body.getBoundingClientRect().width })))
  await context.close()
}
await browser.close()
