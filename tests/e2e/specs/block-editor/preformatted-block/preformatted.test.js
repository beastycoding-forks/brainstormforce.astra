import {createNewPost,insertBlock} from '@wordpress/e2e-test-utils';

describe( 'Preformatted', () => {
	beforeEach( async () => {
		await createNewPost();
	} );
	it( 'should preserve white space when merging', async () => {
		await insertBlock( 'Preformatted' );
		await page.keyboard.type( '1' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( '2' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.press( 'ArrowDown' );
		await page.keyboard.type( '3' );
		await page.keyboard.press( 'ArrowLeft' );
		await page.keyboard.press( 'Backspace' );
		await page.waitForSelector( '.block-editor-block-list__block' );
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'margin-top',
		} ).cssValueToBe( `15px` );
		await expect( {
			selector: '.edit-post-visual-editor pre',
			property: 'margin-bottom',
		} ).cssValueToBe( `24px` );
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor pre.wp-block',
			property: 'padding-left',
		} ).cssValueToBe( `20px` );
		await expect( {
			selector: '.edit-post-visual-editor pre',
			property: 'padding-top',
		} ).cssValueToBe( `24px` );
		await expect( {
			selector: '.edit-post-visual-editor pre',
			property: 'padding-bottom',
		} ).cssValueToBe( `24px` );
	} );
} );
