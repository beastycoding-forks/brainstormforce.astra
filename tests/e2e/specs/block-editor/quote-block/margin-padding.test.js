import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';

describe( 'Quote block in gutenberg block editor', () => {
	it( 'padding, margin, default width should apply properly of the quote in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Quote',
		} );
		await insertBlock( 'Quote' );
		await page.keyboard.type( '> A quote' );

		await page.waitForSelector( '.edit-post-visual-editor blockquote' );
		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'width',
		} ).cssValueToBe( `974.906px` );

		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'padding-left',
		} ).cssValueToBe( `19.8px` );

		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'padding-right',
		} ).cssValueToBe( `19.8px` );

		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'padding-top',
		} ).cssValueToBe( `19.8px` );

		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'padding-bottom',
		} ).cssValueToBe( `19.8px` );

		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );

		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );

		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'margin-top',
		} ).cssValueToBe( `24.75px` );

		await expect( {
			selector: '.edit-post-visual-editor blockquote',
			property: 'margin-bottom',
		} ).cssValueToBe( `24.75px` );
	} );
} );
