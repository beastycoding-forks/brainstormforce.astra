import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'Heading in gutenberg editor', () => {
	it( 'assert margin of the heading in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Heading',
		} );
		await insertBlock( 'Heading' );
		await page.keyboard.type( 'Gutenberg Heading Test' );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.editor-styles-wrapper h2',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.editor-styles-wrapper h2',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.editor-styles-wrapper h2',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.editor-styles-wrapper h2',
			property: 'margin-bottom',
		} ).cssValueToBe( `24.9px` );
	} );
	it( 'assert padding property of the heading in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Heading',
		} );
		await insertBlock( 'Heading' );
		await page.keyboard.type( 'Gutenberg Heading Test' );
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
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading ',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading ',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );
} );
