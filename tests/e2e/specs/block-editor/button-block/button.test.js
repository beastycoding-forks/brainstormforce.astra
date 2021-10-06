import { setPostContent, createNewPost } from '@wordpress/e2e-test-utils';
import { GUTENBERG_TEST_BUTTON_BLOCK } from '../../../utils/button-block';
describe( 'Button in gutenberg editor', () => {
	it( 'login logout button should display', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Gutenberg button',
		} );
		await setPostContent( GUTENBERG_TEST_BUTTON_BLOCK );
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
	} );
} );
