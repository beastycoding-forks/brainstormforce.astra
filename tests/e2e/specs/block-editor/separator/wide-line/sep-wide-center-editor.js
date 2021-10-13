/**
 * WordPress dependencies
 */
import {
	insertBlock,
	createNewPost,
	clickBlockToolbarButton,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';

describe( 'Separator in gutenberg editor', () => {
	it( 'test separartor in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test separator',
		} );
		await insertBlock( 'Separator' );
		await openDocumentSettingsSidebar();
		await page.click( '.block-editor-block-styles__item.is-active .block-editor-block-styles__item-preview' );
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			// eslint-disable-next-line @wordpress/no-global-active-element
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click( '[aria-label="Align"] button:nth-child(1)' );
		//to test width of separator
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'max-width',
		} ).cssValueToBe( `1200px` );
	} );
} );
