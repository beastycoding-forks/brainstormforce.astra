import { insertBlock, createNewPost, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Pullquote in gutenberg editor', () => {
	it( 'assert wide and full width of the pullquote in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test Pullquote' } );
		await page.click( '[aria-label="Settings"]' );
		await insertBlock( 'Pullquote' );
		await page.keyboard.type( 'Testing full, wide and default width' );
		//wide width for pullquote block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(3)' );
		await page.waitForSelector( '.wp-block-pullquote' );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'width',
		} ).cssValueToBe( `1200px` );

		//full width for pullquote block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(4)' );
		await page.waitForSelector( '.wp-block-pullquote' );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'width',
		} ).cssValueToBe( `1399px` );

		//default width for pullquote block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(4)' );
		await page.waitForSelector( '.wp-block-pullquote' );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'width',
		} ).cssValueToBe( `1256px` );
	} );
} );
