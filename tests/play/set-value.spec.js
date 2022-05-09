/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jest/no-done-callback */
const { test, expect } = require( '@playwright/test' );
const { loginToSite } = require( './utils/login' );
//const { createNewPost } = require( '../play/utils/create-new-post' );
test.describe( 'Login to site', () => {
		test.beforeAll( async ( { request } ) => {
			// Reset setup
			const response = await request.delete( '/wp-json/astra/v1/e2e-utils/reset-site' );
			expect( response.ok() );
		} );

		test( 'Setting values', async ( { page } ) => {
		const login = new loginToSite( page );
		await login.loginAsAdmin();

		await page.goto( '/wp-admin/post-new.php' );
		//await this.page.locator( '.components-modal__header > .components-button > svg > path' ).click();
		await page.locator( '#editor .block-editor-block-list__block' ).click();
		await page.locator( '#editor .block-editor-block-list__block' ).type( 'sample' );
		await page.locator('input[id="id-pdn6uh-2"]').click();
		await page.locator('.components-search-control-1')
		.type('Columns');
		await page.locator('#id-ecu8mu-4').click();
		await page.locator('[aria-label="Two columns; equal split"]').click();

		await page.locator('.editor-styles-wrapper > .block-editor-block-list__layout')
		await expect('.editor-styles-wrapper > .block-editor-block-list__layout')
		.toHaveCSS('width', '1119px');
	});
});
