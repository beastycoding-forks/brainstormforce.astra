import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'Heading in gutenberg editor', () => {
	it( 'heading should display', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Heading',
		} );
		await insertBlock( 'Heading' );
		await page.keyboard.type( 'Gutenberg Heading Test' );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'max-width',
		} ).cssValueToBe( `1200px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.editor-styles-wrapper h2',
			property: 'margin-top',
		} ).cssValueToBe( `24.9px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.editor-styles-wrapper h2',
			property: 'margin-bottom',
		} ).cssValueToBe( `24.9px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading ',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
	} );
} );
