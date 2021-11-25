import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas flyout header type settings in the customizer', () => {
	it( 'flyout popup padding should apply correctly', async () => {
		const flyoutPadding = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-padding': {
				tablet: {
					top: '65',
					right: '65',
					bottom: '65',
					left: '65',
				},
				'tablet-unit': 'px',

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
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-content' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ flyoutPadding[ 'off-canvas-padding' ].tablet.top }${ flyoutPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ flyoutPadding[ 'off-canvas-padding' ].tablet.right }${ flyoutPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ flyoutPadding[ 'off-canvas-padding' ].tablet.bottom }${ flyoutPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ flyoutPadding[ 'off-canvas-padding' ].tablet.left }${ flyoutPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);
	} );
} );
