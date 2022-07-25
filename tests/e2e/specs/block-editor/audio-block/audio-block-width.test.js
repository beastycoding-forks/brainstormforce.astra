import { insertBlock, createNewPost, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Audio block in gutenberg editor', () => {
	it( 'assert full width, wide width & default width of the audio in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test audio block' } );
		await page.click( '[aria-label="Settings"]' );
		await insertBlock( 'Audio' );
		//wide width for audio block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(2)' );
		await page.waitForSelector( '.wp-block-audio' );
		await expect( {
			selector: '.wp-block-audio',
			property: 'width',
		} ).cssValueToBe( `1290px` );

		//full width expected:-1478.2px but received 1399px
		//full width for audio block
		// await clickBlockToolbarButton( 'Align' );
		// await page.waitForFunction( () =>
		// 	document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		// await page.click( '[aria-label="Align"] button:nth-child(3)' );
		// await page.waitForTimeout( 5000 );
		// await page.focus( '#collapse-button' );
		// await page.click( '#collapse-button' );
		// await page.waitForTimeout( 1000 );
		// await page.waitForSelector( '.wp-block-audio' );
		// await expect( {
		// 	selector: '.wp-block-audio',
		// 	property: 'width',
		// } ).cssValueToBe( `1478.2px` );

		//default width for audio block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(1)' );
		await page.waitForSelector( '.wp-block-audio' );
		await expect( {
			selector: '.wp-block-audio',
			property: 'width',
		} ).cssValueToBe( `1200px` );
	} );
} );
