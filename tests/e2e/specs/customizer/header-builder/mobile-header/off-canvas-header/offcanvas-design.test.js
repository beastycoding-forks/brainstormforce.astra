import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../utils/publish-post';
describe( 'Off-Canvas header background color & close icon color setting in the customizer', () => {
	it( 'header background color & close icon color for tablet should apply correctly', async () => {
		const offCanvasColor = {
			'mobile-header-type': 'full-width',
			'off-canvas-background': {
				'background-color': 'rgb(250, 245, 245)',
			},
			'off-canvas-close-color': 'rgb(115, 2, 2)',
		};
		await setCustomize( offCanvasColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( {
				postType: 'page',
				title: 'QA',
			} );
			ppStatus = await publishPost();
		}
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
	it( 'padding should apply correctly for tablet', async () => {
		const fullScreenPopupPadding = {
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
		await setCustomize( fullScreenPopupPadding );
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
			`${ fullScreenPopupPadding[ 'off-canvas-padding' ].tablet.top }${ fullScreenPopupPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ fullScreenPopupPadding[ 'off-canvas-padding' ].tablet.right }${ fullScreenPopupPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ fullScreenPopupPadding[ 'off-canvas-padding' ].tablet.bottom }${ fullScreenPopupPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ fullScreenPopupPadding[ 'off-canvas-padding' ].tablet.left }${ fullScreenPopupPadding[ 'off-canvas-padding' ][ 'tablet-unit' ] }`,
		);
	} );
	it( 'header design settings for mobile should apply correctly', async () => {
		const offCanvasColor = {
			'mobile-header-type': 'full-width',
			'off-canvas-background': {
				'background-color': 'rgb(249, 245, 255)',
			},
			'off-canvas-close-color': 'rgb(21, 21, 21)',
		};
		await setCustomize( offCanvasColor );

		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( {
				postType: 'page',
				title: 'Test',
			} );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
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
	it( 'padding should apply correctly for mobile mode', async () => {
		const fullscreenPopupPadding = {
			'mobile-header-type': 'full-width',
			'off-canvas-padding': {
				mobile: {
					top: '50',
					right: '40',
					bottom: '65',
					left: '40',
				},
				'mobile-unit': 'px',

			},
		};
		await setCustomize( fullscreenPopupPadding );
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
			`${ fullscreenPopupPadding[ 'off-canvas-padding' ].mobile.top }${ fullscreenPopupPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ fullscreenPopupPadding[ 'off-canvas-padding' ].mobile.right }${ fullscreenPopupPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ fullscreenPopupPadding[ 'off-canvas-padding' ].mobile.bottom }${ fullscreenPopupPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);

		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-content',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ fullscreenPopupPadding[ 'off-canvas-padding' ].mobile.left }${ fullscreenPopupPadding[ 'off-canvas-padding' ][ 'mobile-unit' ] }`,
		);
	} );
} );
