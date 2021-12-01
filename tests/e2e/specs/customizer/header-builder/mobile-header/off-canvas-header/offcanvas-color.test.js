import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off-Canvas header background color & close icon color setting in the customizer', () => {
	it( 'header background color & close icon color for tablet should apply correctly', async () => {
		const offCanvasColor = {
			'mobile-header-type': 'full-width',
			'off-canvas-background': {
				'background-color': 'rgb(255, 242, 242)',
			},
			'off-canvas-close-color': 'rgb(21, 21, 21)',
		};
		await setCustomize( offCanvasColor );

		await createNewPost( {
			postType: 'page',
			title: 'sample-page',
		} );
		await publishPost();

		await createNewPost( {
			postType: 'page',
			title: 'QA',
		} );
		await publishPost();

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner',
			property: 'background-color',
		} ).cssValueToBe( `${ offCanvasColor[ 'off-canvas-background' ][ 'background-color' ] }` );
		//close icon color
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .menu-toggle-close' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .menu-toggle-close',
			property: 'color',
		} ).cssValueToBe( `${ offCanvasColor[ 'off-canvas-close-color' ] }` );
	} );

	//popup padding
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
