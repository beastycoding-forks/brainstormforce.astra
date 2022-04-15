import { createNewPost, insertBlock, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Column block in gutenberg editor', () => {
	it( 'add other blocks in column block and assert width', async () => {
		await createNewPost( { postType: 'post', title: 'test columns' } );
		await page.click( '[aria-label="Settings"]' );
		await insertBlock( 'Columns' );
		await page.click( '[aria-label="One column"]' );
		await page.click( '.block-editor-button-block-appender' );
		await page.click( '.editor-block-list-item-paragraph' );
		await page.keyboard.type( 'Columns Block with a Paragraph' );
		await clickBlockToolbarButton( 'Select Column' );
		await clickBlockToolbarButton( 'Select Columns' );
		//Set wide width for the column block with paragraph.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(1)' );
		await page.waitForSelector( '.wp-block-columns' );
		await expect( {
			selector: '.wp-block-columns',
			property: 'width',
		} ).cssValueToBe( `1200px` );

		//Set full width for the column block with paragraph.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(2)' );
		await page.waitForSelector( '.wp-block-columns' );
		await expect( {
			selector: '.wp-block-columns',
			property: 'width',
		} ).cssValueToBe( `1399px` );

		//Set full default for the column block with paragraph.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(2)' );
		await page.waitForSelector( '.wp-block-columns' );
		await expect( {
			selector: '.wp-block-columns',
			property: 'width',
		} ).cssValueToBe( `910px` );
	} );
} );
