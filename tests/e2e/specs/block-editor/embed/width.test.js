import { insertBlock, createNewPost, clickBlockToolbarButton } from '@wordpress/e2e-test-utils';
describe( 'Embed in gutenberg editor', () => {
	it( 'assert wide width of the Embed in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'test Embed',
		} );
		await insertBlock( 'Embed' );
		await page.keyboard.type( 'Embed Block' );

		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			// eslint-disable-next-line @wordpress/no-global-active-element
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click(
			'#editor > div.popover-slot > div > div > div > div > button:nth-child(4)',
		);
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'width',
		} ).cssValueToBe( `1119px` );
	} );
	it( 'assert padding of the Embed in the block editor', async () => {
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'padding-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );

	it( 'assert margin of the embed in the block editor', async () => {
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'margin-bottom',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.editor-styles-wrapper > .block-editor-block-list__layout' );
		await expect( {
			selector: '.editor-styles-wrapper > .block-editor-block-list__layout',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
	} );
} );
