/**
 * WordPress dependencies
 */
import {
	insertBlock,
	createNewPost,
	clickBlockToolbarButton,
} from '@wordpress/e2e-test-utils';

describe( 'Separator in gutenberg editor', () => {
	it( 'test separartor in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test separator',
		} );
		await insertBlock( 'Separator' );
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			// eslint-disable-next-line @wordpress/no-global-active-element
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click( '[aria-label="Align"] button:nth-child(2)' );
		//to test width of separator
		await expect( {
			selector: '.wp-block',
			property: 'width',
		} ).cssValueToBe( `1119px` );
	} );
} );
