import { insertBlock, createNewPost, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Heading in gutenberg editor', () => {
	it( 'assert width of the heading in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Heading',
		} );
		await insertBlock( 'Heading' );
		await page.keyboard.type( 'Gutenberg Heading Test' );
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click(
			'[aria-label="Align"] button:nth-child(1)',
		);
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'max-width',
		} ).cssValueToBe( `1256px` );
	} );
} );
