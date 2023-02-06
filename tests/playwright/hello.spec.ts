import { test, expect } from '@playwright/test';

test('hello world', async ({ page }) => {
  page.setDefaultTimeout(0);
  await page.goto('/?p=1');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hello/);
});
