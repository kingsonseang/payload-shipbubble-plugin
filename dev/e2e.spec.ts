import { expect, test } from '@playwright/test'

// this is an example Playwright e2e test
test('should render admin panel logo', async ({ page }) => {
  await page.goto('/admin')

  // login
  await page.fill('#field-email', 'dev@payloadcms.com')
  await page.fill('#field-password', 'test')
  await page.click('.form-submit button')

  // should show dashboard
  // The admin bundle is compiled on first hit in dev, which can take longer than
  // Playwright's 5s default assertion timeout, so give the post-login state room.
  await expect(page).toHaveURL(/\/admin(\/collections)?/, { timeout: 60_000 })
  await expect(page).toHaveTitle(/Dashboard/, { timeout: 60_000 })
  await expect(page.locator('.graphic-icon')).toBeVisible({ timeout: 60_000 })
})
