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
			property: 'width',
		} ).cssValueToBe( `975.235px` );
	} );

	it( 'assert padding of the heading in the block editor', async () => {
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-left',
		} ).cssValueToBe( `20px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-right',
		} ).cssValueToBe( `20px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );

	it( 'assert margin of the heading in the block editor', async () => {
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-bottom',
		} ).cssValueToBe( `24.9px` );
		await page.waitForSelector( '.edit-post-visual-editor .wp-block-heading' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
	} );
} );
