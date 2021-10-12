/**
 * WordPress dependencies
 */
import {
	insertBlock,
	createNewPost,
	clickBlockToolbarButton,
} from '@wordpress/e2e-test-utils';

describe( 'Pullquote in gutenberg editor', () => {
	it( 'test of the pullquote in the block editor', async () => {
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
		await page.click( '[aria-label="Align"] button:nth-child(1)' );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'width',
		} ).cssValueToBe( `300.672px` );
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
		} ).cssValueToBe( `20px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'padding-right',
		} ).cssValueToBe( `20px` );
		//to test the margin
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'margin-bottom',
		} ).cssValueToBe( `15px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-pullquote',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
	} );
} );
