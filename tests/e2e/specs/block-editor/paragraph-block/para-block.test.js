import {
	createNewPost,
	insertBlock,
} from '@wordpress/e2e-test-utils';

describe( 'Paragraph in gutenberg editor', () => {
	it( 'assert alignment property of the paragraph in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test para',
		} );

		await insertBlock( 'Paragraph' );
		await page.keyboard.type( 'para' );

		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'max-width',
		} ).cssValueToBe( `1200px` );
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'margin-bottom',
		} ).cssValueToBe( `26.25px` );
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'padding',
		} ).cssValueToBe( `0px` );
	} );
} );
