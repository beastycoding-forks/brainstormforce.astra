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

		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.block-editor-block-list__layout',
			property: 'width',
		} ).cssValueToBe( `910px` );
	} );
	it( 'assert margin property of the paragraph in the block editor', async () => {
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'margin-top',
		} ).cssValueToBe( `28px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'margin-right',
		} ).cssValueToBe( `104.5px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'margin-bottom',
		} ).cssValueToBe( `28px` );
	} );
	it( 'assert padding property of the paragraph in the block editor', async () => {
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.edit-post-visual-editor p',
			property: 'padding',
		} ).cssValueToBe( `5px` );
	} );
} );
