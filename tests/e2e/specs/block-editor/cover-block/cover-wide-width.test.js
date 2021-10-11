import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'Cover in gutenberg editor', () => {
	it( 'assert wide width of the cover in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Cover',
		} );
		await insertBlock( 'Cover' );
		await page.keyboard.type( 'Cover Block' );

		await page.waitForSelector( '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *' );
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'max-width',
		} ).cssValueToBe( `1200px` );
	} );

	it( 'assert padding of the cover in the block editor', async () => {
		await page.waitForSelector( '.components-placeholder.components-placeholder' );
		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'padding-left',
		} ).cssValueToBe( `15px` );

		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'padding-right',
		} ).cssValueToBe( `15px` );

		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'padding-top',
		} ).cssValueToBe( `15px` );

		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'padding-bottom',
		} ).cssValueToBe( `15px` );
	} );

	it( 'assert margin of the cover in the block editor', async () => {
		await page.waitForSelector( '.components-placeholder.components-placeholder' );
		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );

		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );

		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'margin-bottom',
		} ).cssValueToBe( `0px` );

		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
	} );
} );
