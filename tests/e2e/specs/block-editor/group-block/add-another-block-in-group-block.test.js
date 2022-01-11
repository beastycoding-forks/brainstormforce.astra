import { searchForBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'group in gutenberg editor', () => {
	it( 'add other blocks in group block and assert width', async () => {
		await createNewPost( { postType: 'post', title: 'test group' } );
		await searchForBlock( 'Group' );
		await page.click( '.editor-block-list-item-group' );
		await page.click( '.block-editor-button-block-appender' );
		await page.click( '.editor-block-list-item-paragraph' );
		await page.keyboard.type( 'Group Block with a Paragraph' );
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'width',
		} ).cssValueToBe( `1119px` );
	} );
} );
