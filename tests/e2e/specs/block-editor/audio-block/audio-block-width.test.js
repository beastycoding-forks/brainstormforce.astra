import { insertBlock, createNewPost, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Audio block in gutenberg editor', () => {
	it( 'assert full and width of the audio in the block editor', async () => {
		await createNewPost( { postType: 'post', title: 'test audio block' } );
		await page.click( '[aria-label="Settings"]' );
		await insertBlock( 'Audio' );
		//wide width for pullquotaudio block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(4)' );
		await page.waitForSelector( '.wp-block-audio' );
		await expect( {
			selector: '.wp-block-audio',
			property: 'width',
		} ).cssValueToBe( `1200px` );

		//full width for audio block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(5)' );
		await page.waitForSelector( '.wp-block-audio' );
		await expect( {
			selector: '.wp-block-audio',
			property: 'width',
		} ).cssValueToBe( `1399px` );

		//default width for audio block
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(5)' );
		await page.waitForSelector( '.wp-block-audio' );
		await page.waitForSelector( '.wp-block-audio' );
		await expect( {
			selector: '.wp-block-audio',
			property: 'width',
		} ).cssValueToBe( `1256px` );
	} );
} );
