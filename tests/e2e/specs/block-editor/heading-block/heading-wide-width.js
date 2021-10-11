import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'Heading in gutenberg editor', () => {
	it( 'assert wide width of the heading in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Heading',
		} );
		await insertBlock( 'Heading' );
		await page.keyboard.type( 'Heading Block' );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'max-width',
		} ).cssValueToBe( `1200px` );
	} );
} );
