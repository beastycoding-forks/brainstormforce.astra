import { insertBlock, createNewPost, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Heading in gutenberg editor', () => {
	it( 'assert wide width of the heading in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Heading',
		} );
		await insertBlock( 'Heading' );
		await page.keyboard.type( 'Heading Block' );

		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			// eslint-disable-next-line @wordpress/no-global-active-element
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click(
			'[aria-label="Align"] button:nth-child(1)',
		);
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'width',
		} ).cssValueToBe( `1119px` );
	} );
	it( 'assert padding of the heading in the block editor', async () => {
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading', 
			property: 'padding-right', 
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );

	it( 'assert margin of the heading in the block editor', async () => {
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-bottom',
		} ).cssValueToBe( `24.900px` );
		await page.waitForSelector( '.block-editor-block-list__layout' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
	} );
} );
