import { test, expect } from '@playwright/test';

test('hello world', async ({ page }) => {
  page.setDefaultTimeout(0);
  await page.goto('/');
  page.setDefaultTimeout(500);
  // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Hello/);
});
