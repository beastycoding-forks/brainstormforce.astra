import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'List in gutenberg editor', () => {
	it( 'assert wide width of the list in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test audio block' } );
		await insertBlock( 'Audio' );
		await page.waitForSelector( '.components-placeholder.components-placeholder' );
		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'width',
		} ).cssValueToBe( `1119px` );
	} );
} );
