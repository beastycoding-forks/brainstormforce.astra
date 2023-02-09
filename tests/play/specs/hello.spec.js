const { test } = require( '@playwright/test' );
const { adminLogin } = require( '../utils/adminlogin' );

test('hello tester', async ({ page }) => {
  // Navigate to frontend.
  await page.goto('/');
  // Navigate to admin panel.
  const login = new adminLogin( page );
  await login.loginAsAdmin();
});
