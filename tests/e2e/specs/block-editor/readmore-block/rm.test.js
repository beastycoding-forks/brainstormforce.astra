import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'Gutenberg More block in the gutenberg editor', () => {
	it( 'assert default width of the More block in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'Readmore',
		} );
		await insertBlock( 'More' );
		await page.waitForSelector( '.block-editor-block-list__block[data-type="core/more"]' );
		await expect( {
			selector: '.wp-block-more',
			property: 'width',
		} ).cssValueToBe( `974.9px` );
	} );
} );
