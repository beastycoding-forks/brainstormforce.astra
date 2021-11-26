import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas full-screen header type popup padding setting in the customizer', () => {
	it( 'padding should apply correctly', async () => {
		const fullscreenPopupPadding = {
			'mobile-header-type': 'full-width',
			'off-canvas-padding': {
				tablet: {
					top: '65',
					right: '40',
					bottom: '65',
					left: '40',
				},
				'tablet-unit': 'px',

			},
		};
		await setCustomize( fullscreenPopupPadding );
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
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-content' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ fullscreenPopupPadding[ 'off-canvas-padding' ].tablet.top }${ fullscreenPopupPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ fullscreenPopupPadding[ 'off-canvas-padding' ].tablet.right }${ fullscreenPopupPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ fullscreenPopupPadding[ 'off-canvas-padding' ].tablet.bottom }${ fullscreenPopupPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ fullscreenPopupPadding[ 'off-canvas-padding' ].tablet.left }${ fullscreenPopupPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);
	} );
} );
