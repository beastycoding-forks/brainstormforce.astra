import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas header type popup padding for mobile mode in the customizer', () => {
	it( 'padding should apply correctly', async () => {
		const mobileModePopupPadding = {
			'mobile-header-type': 'full-width',
			'off-canvas-padding': {
				mobile: {
					top: '65',
					right: '40',
					bottom: '65',
					left: '40',
				},
				'mobile-unit': 'px',

			},
		};
		await setCustomize( mobileModePopupPadding );
		await createNewPost( {
			postType: 'page',
			title: 'sample-page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'test-page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await setBrowserViewport( 'small' );

		await page.click( '.main-header-menu-toggle' );

		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-content' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ mobileModePopupPadding[ 'off-canvas-padding' ].mobile.top }${ mobileModePopupPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ mobileModePopupPadding[ 'off-canvas-padding' ].mobile.right }${ mobileModePopupPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ mobileModePopupPadding[ 'off-canvas-padding' ].mobile.bottom }${ mobileModePopupPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ mobileModePopupPadding[ 'off-canvas-padding' ].mobile.left }${ mobileModePopupPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);
	} );
} );
