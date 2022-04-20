import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off canvas flyout header type settings in the customizer', () => {
	it( 'flyout header background color for tablet should apply correctly', async () => {
		const flyoutBgColor = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-background': {
				'background-color': 'rgb(238, 249, 200)',
			},
		};
		await setCustomize( flyoutBgColor );
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
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner',
			property: 'background-color',
		} ).cssValueToBe( `${ flyoutBgColor[ 'off-canvas-background' ][ 'background-color' ] }` );
	} );

	it( 'flyout header background color for mobile should apply correctly', async () => {
		const flyoutBgColor = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-background': {
				'background-color': 'rgb(238, 249, 200)',
			},
		};
		await setCustomize( flyoutBgColor );
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
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner',
			property: 'background-color',
		} ).cssValueToBe( `${ flyoutBgColor[ 'off-canvas-background' ][ 'background-color' ] }` );
	} );

	it( 'flyout popup padding for mobile should apply correctly', async () => {
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

	it( 'flyout popup padding for tablet should apply correctly', async () => {
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

	it( 'flyout close icon color should apply correctly', async () => {
		const closeiconColor = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-close-color': 'rgb(118, 29, 120)',
		};
		await setCustomize( closeiconColor );
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
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .menu-toggle-close' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .menu-toggle-close',
			property: 'color',
		} ).cssValueToBe( `${ closeiconColor[ 'off-canvas-close-color' ] }` );
	} );
} );
