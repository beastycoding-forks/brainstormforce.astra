import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'List in gutenberg editor', () => {
<<<<<<< HEAD
	it( 'assert default width of the list in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test List' } );
		await page.click( '[aria-label="Settings"]' );
=======
	it( 'assert wide width of the list in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test List',
		} );
>>>>>>> e0b606b09168b5e6fbd13623b2329ac97dc0f101
		await insertBlock( 'List' );
		await page.keyboard.type( 'one' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( 'two' );
<<<<<<< HEAD
		await page.waitForSelector( '.wp-block-list' );
		await expect( {
			selector: '.wp-block-list',
			property: 'width',
		} ).cssValueToBe( `1256px` );
=======
		await page.waitForSelector(
			'.editor-styles-wrapper > .block-editor-block-list__layout',
		);
		await expect( {
			selector:
				'.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'width',
		} ).cssValueToBe( `1119px` );
>>>>>>> e0b606b09168b5e6fbd13623b2329ac97dc0f101
	} );
} );
