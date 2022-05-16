/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jest/no-done-callback */
const { test, expect } = require( '@playwright/test' );
const { loginToSite } = require( '../play/utils/login' );
test.describe( 'Login to site', () => {
	test( 'Login to Admin', async ( { page } ) => {
		const login1 = new loginToSite( page );
		await login1.loginAsAdmin();
		await page.goto( '/wp-admin.php' );
		await page.locator( 'div.welcome-panel-header' );
		await expect.toBeVisible( 'Welcome to WordPress!' );
	} );
} );
