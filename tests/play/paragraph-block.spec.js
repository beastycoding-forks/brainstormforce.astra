/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jest/no-done-callback */
const { test, expect } = require( '@playwright/test' );
const { loginToSite } = require( './utils/login' );
//const { createNewPost } = require( '../play/utils/create-new-post' );
test.describe( 'Login to site', () => {
	test( 'Setting values', async ( { page } ) => {
		const login = new loginToSite( page );
		await login.loginAsAdmin();

		await page.goto( '/wp-admin/post-new.php' );
		await page.locator( '#editor .block-editor-block-list__block' ).click();
		await page.locator( '#editor .block-editor-block-list__block' ).type( 'sample' );
		await page.locator( '.edit-post-header-toolbar .edit-post-header-toolbar__inserter-toggle.has-icon' ).click();
		await page.locator( '#components-search-control-1' )
			.type( 'Paragraph' );
		await page.locator( '.components-button.block-editor-block-types-list__item' )
			.click();

		await page.locator( '.edit-post-visual-editor p' )
			.type( 'paragraph-block' );
		const locator = page.locator( '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > p' );
		await expect( locator )
			.toHaveCSS( 'max-width', '1200px' );
	} );
} );
