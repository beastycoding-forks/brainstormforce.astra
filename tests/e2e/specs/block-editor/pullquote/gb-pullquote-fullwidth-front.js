/**
 * WordPress dependencies
 */
import {
	insertBlock,
	createNewPost,
	clickBlockToolbarButton,
	publishPost,
	createURL,
} from '@wordpress/e2e-test-utils';

describe( 'Pullquote in gutenberg editor', () => {
	it( 'test of the pullquote on the front end', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Gutenberg Pullquote',
		} );
		await insertBlock( 'Pullquote' );
		await page.keyboard.type( 'Jack of all trades' );
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			// eslint-disable-next-line @wordpress/no-global-active-element
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click( '[aria-label="Align"] button:nth-child(4)' );
		await publishPost();
		await page.goto( createURL( '/test-gutenberg-pullquote' ), {
			waitUntil: 'networkidle0',
		} );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'width',
		} ).cssValueToBe( `265.25px` );
		// to test the padding
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'padding-top',
		} ).cssValueToBe( `45px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'padding-bottom',
		} ).cssValueToBe( `45px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'padding-left',
		} ).cssValueToBe( `45px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'padding-right',
		} ).cssValueToBe( `45px` );
		//to test the margin
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'margin-top',
		} ).cssValueToBe( `30px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'margin-bottom',
		} ).cssValueToBe( `30px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'margin-left',
		} ).cssValueToBe( `30px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'margin-right',
		} ).cssValueToBe( `30px` );
	} );
} );
