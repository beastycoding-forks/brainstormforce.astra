import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'verse in gutenberg editor', () => {
	it( 'assert wide width of the verse in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test verse',
		} );
		await insertBlock( 'Verse' );
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'width',
		} ).cssValueToBe( `1119px` );
	} );
	it( 'assert padding of the verse in the block editor', async () => {
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'padding-left',
		} ).cssValueToBe( `20px` );
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'padding-right',
		} ).cssValueToBe( `5px` );
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'padding-top',
		} ).cssValueToBe( `5px` );
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'padding-bottom',
		} ).cssValueToBe( `5px` );
	} );

	it( 'assert margin of the verse in the block editor', async () => {
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'margin-top',
		} ).cssValueToBe( `28px` );
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'margin-bottom',
		} ).cssValueToBe( `28px` );
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
	} );
} );
