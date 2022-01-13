import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'List in gutenberg editor', () => {
	it( 'assert default width of the list in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test List' } );
		await page.click( '[aria-label="Settings"]' );
		await insertBlock( 'List' );
		await page.keyboard.type( 'one' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( 'two' );
		await page.waitForSelector( '.wp-block-list' );
		await expect( {
			selector: '.wp-block-list',
			property: 'width',
		} ).cssValueToBe( `1256px` );
	} );
} );
