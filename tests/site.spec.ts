import { expect, test } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const shots = 'audit/redesign'

test.beforeAll(async () => { await mkdir(shots, { recursive: true }) })

test('complete route journey and direct route loading', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Сохраняем каждый зуб')
  await page.getByRole('link', { name: 'Выбрать направление' }).click()
  await expect(page).toHaveURL(/\/services\/?$/)
  await page.getByRole('link', { name: /Терапия/ }).first().click()
  await expect(page).toHaveURL(/\/services\/terapiya\/?$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Терапия')
  await page.getByRole('link', { name: 'Все контакты' }).click()
  await expect(page).toHaveURL(/\/contacts\/?$/)
  await page.getByRole('link', { name: /Стоматология Зубок — на главную/ }).first().click()
  await expect(page).toHaveURL(/\/$/)
  await page.goBack(); await expect(page).toHaveURL(/\/contacts\/?$/)
  await page.goForward(); await expect(page).toHaveURL(/\/$/)
  if (testInfo.project.name === 'desktop') await page.screenshot({ path: `${shots}/home-desktop.png`, fullPage: true })
  if (testInfo.project.name === 'tablet') await page.screenshot({ path: `${shots}/home-tablet.png`, fullPage: true })
  if (testInfo.project.name === 'mobile') await page.screenshot({ path: `${shots}/home-mobile.png`, fullPage: true })
})

test('global navigation works and no horizontal overflow', async ({ page }) => {
  for (const path of ['/', '/services/', '/doctors/', '/prices/', '/about/', '/contacts/']) {
    await page.goto(path)
    await expect(page.locator('main h1').first()).toBeVisible()
    const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }))
    expect(sizes.scroll).toBeLessThanOrEqual(sizes.client + 1)
  }
})

test('complete price catalog, category switching, and search', async ({ page }) => {
  await page.goto('/prices/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Цены на услуги клиники')
  await expect(page.locator('.price-service')).toHaveCount(36)
  await page.getByRole('button', { name: 'Хирургия и имплантация' }).click()
  await expect(page.locator('.price-service')).toHaveCount(35)
  await page.getByRole('button', { name: 'Ортопедические услуги' }).click()
  await expect(page.locator('.price-service')).toHaveCount(25)
  await page.getByRole('searchbox', { name: 'Найти услугу или код' }).fill('анестезия')
  await expect(page.locator('.price-service')).toHaveCount(3)
  await expect(page.locator('.price-service').first()).toContainText('Проводниковая анестезия')
})

test('mobile menu and missing route state', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile')
  await page.goto('/')
  await page.getByRole('button', { name: /Меню/ }).click()
  await expect(page.getByRole('navigation', { name: 'Основная навигация' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Основная навигация' }).getByRole('link', { name: 'Врачи' }).click()
  await expect(page).toHaveURL(/\/doctors\/?$/)
  await page.goto('/no-such-page/')
  await expect(page.getByRole('heading', { name: 'Такой страницы нет' })).toBeVisible()
})

test('capture strongest secondary pages', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  for (const [path, file] of [['/services/', 'services-desktop.png'], ['/doctors/', 'doctors-desktop.png'], ['/contacts/', 'contacts-desktop.png']] as const) {
    await page.goto(path)
    await page.screenshot({ path: `${shots}/${file}`, fullPage: true })
  }
})
