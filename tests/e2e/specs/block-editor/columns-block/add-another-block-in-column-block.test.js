import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';
describe( 'columns in gutenberg editor', () => {
	it( 'add other blocks in column block and assert width', async () => {
		await createNewPost( { postType: 'post', title: 'test columns' } );
		await insertBlock( 'Columns' );
		await page.click( '[aria-label="One column"]' );
		await page.click( '.block-editor-button-block-appender' );
		await page.click( '.editor-block-list-item-paragraph' );
		await page.keyboard.type( 'Columns Block with a Paragraph' );
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'width',
		} ).cssValueToBe( `1119px` );
	} );
} );
