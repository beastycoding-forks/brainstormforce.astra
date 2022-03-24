import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'Verse in gutenberg editor', () => {
	it( 'assert default width of the verse block in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test-sverse' } );
		await page.click( '[aria-label="Settings"]' );
		await insertBlock( 'Verse' );
		//default width for verse block
		await page.waitForSelector( '.wp-block-verse' );
		await expect( {
			selector: '.wp-block-verse',
			property: 'width',
		} ).cssValueToBe( `910px` );
	} );
} );
