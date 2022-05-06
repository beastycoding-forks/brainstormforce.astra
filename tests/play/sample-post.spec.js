/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jest/no-done-callback */
const { test, expect } = require( '@playwright/test' );
const { loginToSite } = require( './utils/login' );
const { createNewPost } = require( '../play/utils/create-new-post' );
test.describe( 'Login to site', () => {
	test( 'Login to Admin', async ( { page } ) => {
		const login = new loginToSite( page );
		await login.loginAsAdmin();
		const createPost = new createNewPost( page );
		await createPost.createNewPost();
		await page.locator( '[aria-label="Dismiss this notice"]' );
		await expect( page.locator( '[aria-label="Dismiss this notice"]' ) ).toBeVisible();
	} );
} );
