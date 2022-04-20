import { createNewPost, insertBlock, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Column block in gutenberg editor', () => {
	it( 'add other blocks in column block and assert width', async () => {
		await createNewPost( { postType: 'post', title: 'test columns' } );
		const css = 'body div#adminmenumain, body .interface-interface-skeleton__sidebar {display: none;} body #wpcontent, body #wpfooter {margin-left: 0;}	body .interface-interface-skeleton { left: 0!important}',
			head = document.head || document.getElementsByTagName( 'head' )[ 0 ],
			style = document.createElement( 'style' );
		head.appendChild( style );
		style.type = 'text/css';
		if ( style.styleSheet ) {
			// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild( document.createTextNode( css ) );
		}
		await insertBlock( 'Columns' );
		await page.click( '[aria-label="One column"]' );
		await page.click( '.block-editor-button-block-appender' );
		await page.click( '.editor-block-list-item-paragraph' );
		await page.keyboard.type( 'Columns Block with a Paragraph' );
		await clickBlockToolbarButton( 'Select Column' );
		await clickBlockToolbarButton( 'Select Columns' );
		//Set default width for the column block with paragraph.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(1)' );
		await page.waitForSelector( '.wp-block-columns' );
		await expect( {
			selector: '.wp-block-columns',
			property: 'width',
		} ).cssValueToBe( `910px` );

		//Set wide width for the column block with paragraph.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(2)' );
		await page.waitForSelector( '.wp-block-columns' );
		await expect( {
			selector: '.wp-block-columns',
			property: 'width',
		} ).cssValueToBe( `1200px` );

		//Set full default for the column block with paragraph.
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains( 'components-dropdown-menu__menu-item' ) );
		await page.click( '[aria-label="Align"] button:nth-child(3)' );
		await page.waitForSelector( '.wp-block-columns' );
		await expect( {
			selector: '.wp-block-columns',
			property: 'width',
		} ).cssValueToBe( `1559px` );
	} );
} );
