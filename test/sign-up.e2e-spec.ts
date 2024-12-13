import { expect, test } from '@playwright/test'

test('sign up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Your name').fill('Invalid name')

  await page.getByLabel('Your e-mail').fill('manoelprado.aecjr@gmail.com')

  await page.getByLabel('Your birthday').fill('1996-03-13')

  await page.getByLabel('Your password').fill('senha123')

  await page.getByRole('button', { name: 'Register' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Error while registering user.')

  await expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Login' }).click()

  await page.waitForLoadState('networkidle')

  expect(page.url()).toContain('sign-in')
})
