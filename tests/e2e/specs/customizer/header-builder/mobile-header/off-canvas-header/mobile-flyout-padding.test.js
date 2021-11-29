import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas flyout header type settings in the customizer', () => {
	it( 'flyout popup padding should apply correctly', async () => {
		const flyoutPadding = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-padding': {
				mobile: {
					top: '65',
					right: '65',
					bottom: '65',
					left: '65',
				},
				'mobile-unit': 'px',

			},
		};
		await setCustomize( flyoutPadding );
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
			`${ flyoutPadding[ 'off-canvas-padding' ].mobile.top }${ flyoutPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ flyoutPadding[ 'off-canvas-padding' ].mobile.right }${ flyoutPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ flyoutPadding[ 'off-canvas-padding' ].mobile.bottom }${ flyoutPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ flyoutPadding[ 'off-canvas-padding' ].mobile.left }${ flyoutPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);
	} );
} );