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
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'width',
		} ).cssValueToBe( `974.906px` );
	} );

	it( 'assert padding of the heading in the block editor', async () => {
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );

	it( 'assert margin of the heading in the block editor', async () => {
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-bottom',
		} ).cssValueToBe( `24.900px` );
		await page.waitForSelector( '#editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__content > div.edit-post-visual-editor > div.edit-post-visual-editor__content-area > div > div.editor-styles-wrapper.block-editor-writing-flow > div.block-editor-block-list__layout.is-root-container > div.wp-block' );
		await expect( {
			selector: '.wp-block-heading',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
	} );
} );
