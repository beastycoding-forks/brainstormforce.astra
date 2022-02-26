import { insertBlock, createNewPost, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Embed in gutenberg editor', () => {
	it( 'assert wide, full and default width of the Embed in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test Embed' } );
		await page.click( '[aria-label="Settings"]' );
		await insertBlock( 'Embed' );
		//wide width for Embeds block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(4)' );
		await page.waitForSelector( '.wp-block-embed' );
		await expect( {
			selector: '.wp-block-embed',
			property: 'width',
		} ).cssValueToBe( `1200px` );

		//full width for Embeds block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(5)' );
		await page.waitForSelector( '.wp-block-embed' );
		await expect( {
			selector: '.wp-block-embed',
			property: 'width',
		} ).cssValueToBe( `1399px` );

		//default width for Embeds block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(5)' );
		await page.waitForSelector( '.wp-block-embed' );
		await expect( {
			selector: '.wp-block-embed',
			property: 'width',
		} ).cssValueToBe( `1256px` );
	} );
} );
