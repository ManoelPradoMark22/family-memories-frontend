import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  test.setTimeout(10000)
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Your e-mail').fill('manoelprado.aecjr@gmail.com')
  await page.getByLabel('Your password').fill('senha123')

  await page.getByRole('button', { name: 'Access' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Login Success.')

  await expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Your e-mail').fill('wrong@gmail.com')
  await page.getByLabel('Your password').fill('1234567890')

  await page.getByRole('button', { name: 'Access' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Invalid Credentials')

  await expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'New user' }).click()

  expect(page.url()).toContain('sign-up')
})
