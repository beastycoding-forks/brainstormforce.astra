import { searchForBlock, createNewPost, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Grounp block in gutenberg editor', () => {
	it( 'add other blocks in group block and assert width', async () => {
		await createNewPost( { postType: 'post', title: 'test group' } );
		await page.click( '[aria-label="Settings"]' );
		await searchForBlock( 'Group' );
		await page.click( '.editor-block-list-item-group' );
		await page.click( '.block-editor-button-block-appender' );
		await page.click( '.editor-block-list-item-paragraph' );
		await page.keyboard.type( 'Group Block with a Paragraph' );
		// Set wide width for the group block with paragraph.
		await clickBlockToolbarButton( 'Select Group' );
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(1)' );
		await page.waitForSelector( '.wp-block-group' );
		await expect( {
			selector: '.wp-block-group',
			property: 'width',
		} ).cssValueToBe( `1200px` );

		// Set full width for the group block with paragraph.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(2)' );
		await page.waitForSelector( '.wp-block-group' );
		await expect( {
			selector: '.wp-block-group',
			property: 'width',
		} ).cssValueToBe( `1399px` );

		// Set default width for the group block with paragraph.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(2)' );
		await page.waitForSelector( '.wp-block-group' );
		await expect( {
			selector: '.wp-block-group',
			property: 'width',
		} ).cssValueToBe( `910px` );
	} );
} );
