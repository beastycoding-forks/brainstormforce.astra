import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'Audio block in gutenberg editor', () => {
	it( 'assert width of the audio in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test audio block' } );
		await insertBlock( 'Audio' );
		await page.waitForSelector( '.components-placeholder.components-placeholder' );
		await expect( {
			selector: '.components-placeholder.components-placeholder',
			property: 'width',
		} ).cssValueToBe( `1119px` );
	} );
} );
