import { insertBlock, createNewPost, pressKeyWithModifier } from '@wordpress/e2e-test-utils';
describe( 'Button in gutenberg editor', () => {
	it( 'login button property should apply correctly', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Gutenberg button',
		} );
		await insertBlock( 'Buttons' );
		await page.keyboard.type( 'Login' );
		await pressKeyWithModifier( 'primary', 'k' );
		await page.waitForFunction(
			() => !! document.activeElement.closest( '.block-editor-url-input' ),
		);
		await page.keyboard.type( 'https://google.com' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.wp-block-buttons',
			property: 'display',
		} ).cssValueToBe( `flex` );
		await page.waitForSelector( '.wp-block-buttons .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-buttons .wp-block-button .wp-block-button__link',
			property: 'padding-top',
		} ).cssValueToBe( `10px` );
		await page.waitForSelector( '.wp-block-buttons .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-buttons .wp-block-button .wp-block-button__link',
			property: 'padding-right',
		} ).cssValueToBe( `20px` );
		await page.waitForSelector( '.wp-block-buttons .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-buttons .wp-block-button .wp-block-button__link',
			property: 'padding-bottom',
		} ).cssValueToBe( `10px` );
		await page.waitForSelector( '.wp-block-buttons .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-buttons .wp-block-button .wp-block-button__link',
			property: 'padding-left',
		} ).cssValueToBe( `20px` );
		await page.waitForSelector( '.wp-block-buttons .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-buttons .wp-block-button .wp-block-button__link',
			property: 'border-top-width',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.wp-block-buttons .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-buttons .wp-block-button .wp-block-button__link',
			property: 'border-right-width',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.wp-block-buttons .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-buttons .wp-block-button .wp-block-button__link',
			property: 'border-left-width',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.wp-block-buttons .wp-block-button .wp-block-button__link' );
		await expect( {
			selector: '.wp-block-buttons .wp-block-button .wp-block-button__link',
			property: 'border-bottom-width',
		} ).cssValueToBe( `0px` );
	} );
} );
