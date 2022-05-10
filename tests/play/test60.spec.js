/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jest/no-done-callback */
const { test, expect } = require( '@playwright/test' );
const { loginToSite } = require( './utils/login' );
const { createNewPage } = require( './utils/create-new-page' );
test.describe( 'create new page', () => {
	test( 'create new page', async ( { page } ) => {
		const login = new loginToSite( page );
		await login.loginAsAdmin();
		const createPage = new createNewPage( page );
		await createPage.createNewPage();
		await page.locator( '[aria-label="Dismiss this notice"]' );
		await expect( page.locator( '[aria-label="Dismiss this notice"]' ) ).toBeVisible();
		await page.goto( '/sample-page' );
	} );
} );
