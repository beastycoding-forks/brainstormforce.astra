/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jest/no-done-callback */
const { test, expect } = require( '@playwright/test' );
const { loginToSite } = require( './utils/login' );
test.describe( 'Login to site', () => {
	test( 'Setting values', async ( { page } ) => {
		const login = new loginToSite( page );
		await login.loginAsAdmin();

		await page.goto( '/wp-admin/post-new.php' );
		//await page.pause();
		await page.locator( 'text=Type / to choose a block' ).click();
		await page.locator( '[aria-label="Add title"]' ).click();
		await page.locator( '[aria-label="Add title"]' ).type( 'sample' );
		await page.locator( '.edit-post-header-toolbar .edit-post-header-toolbar__inserter-toggle.has-icon' ).click();
		await page.locator( '[placeholder="Search"]' ).click();
		await page.locator( '[placeholder="Search"]' ).type( 'Paragraph' );
		await page.locator( '[aria-label="Empty block\\; start writing or type forward slash to choose a block"]' )
			.first().click();
		await page.locator( '[aria-label="Empty block\\; start writing or type forward slash to choose a block"]' )
			.first()
			.type( 'paragraph-block' );
		const locator = page.locator( '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > p' );
		await expect( locator )
			.toHaveCSS( 'max-width', '1200px' );
	} );
} );
