import {
	createNewPost,
	insertBlock,
} from '@wordpress/e2e-test-utils';

describe( 'Paragraph in gutenberg editor', () => {
	it( 'assert width property of the paragraph in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test para',
		} );

		await insertBlock( 'Paragraph' );
		await page.keyboard.type( 'paragraph' );

		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'width',
		} ).cssValueToBe( `975.235px` );
	} );
	it( 'assert margin property of the paragraph in the block editor', async () => {	
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
	} );
	it( 'assert padding property of the paragraph in the block editor', async () => {
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'padding',
		} ).cssValueToBe( `0px` );
	} );
} );
