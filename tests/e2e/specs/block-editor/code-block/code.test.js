import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'Code in gutenberg editor', () => {
	beforeEach( async () => {
		await createNewPost();
	} );
	it( 'assert default width, padding and margin of the code in the block editor', async () => {
		await insertBlock( 'Code' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( '<?php' );
		await page.waitForSelector( '.block-editor-block-list__block' );
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'width',
		} ).cssValueToBe( `974.906px` );
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
