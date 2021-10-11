/**
 * WordPress dependencies
 */
import {
	insertBlock,
	createNewPost,
	clickBlockToolbarButton,
	publishPost,
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
		await page.click( '[aria-label="Align"] button:nth-child(4)' );
		await publishPost();
		await expect( {
			selector: 'blockquote',
			property: 'width',
		} ).cssValueToBe( `194.672px` );
		// to test the padding
		await expect( {
			selector: 'blockquote',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: 'blockquote',
			property: 'padding-bottom',
		} ).cssValueToBe( `19.8px` );
		await expect( {
			selector: 'blockquote',
			property: 'padding-left',
		} ).cssValueToBe( `19.8px` );
		await expect( {
			selector: 'blockquote',
			property: 'padding-right',
		} ).cssValueToBe( `19.8px` );
		//to test the margin
		await expect( {
			selector: 'blockquote',
			property: 'margin-top',
		} ).cssValueToBe( `24.75px` );
		await expect( {
			selector: 'blockquote',
			property: 'margin-bottom',
		} ).cssValueToBe( `24.75px` );
		await expect( {
			selector: 'blockquote',
			property: 'margin-left',
		} ).cssValueToBe( `49.5px` );
		await expect( {
			selector: 'blockquote',
			property: 'margin-right',
		} ).cssValueToBe( `16.5px` );
	} );
} );
