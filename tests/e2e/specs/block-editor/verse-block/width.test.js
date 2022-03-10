import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'verse in gutenberg editor', () => {
	it( 'assert default width of the verse in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test verse' } );
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
