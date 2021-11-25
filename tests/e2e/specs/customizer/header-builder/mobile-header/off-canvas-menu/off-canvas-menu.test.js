import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas menu design settings in the customizer', () => {
	it( 'off canvas menu design settings should apply corectly for after header', async () => {
		const offCanvasMenuDesign = {
			'customize-control-astra-settings-mobile-header-type': 'dropdown',
			'astra-settings[header-mobile-menu-color-responsive]': {
				tablet: 'rgb(211, 83, 83)',
				mobile: 'rgb(211, 83, 83)',
			},
			// 'header-mobile-menu-h-color-responsive': {
			// 	tablet: 'rgb(2, 7, 100)',
			// 	mobile: 'rgb(2, 7, 100)',
			// },
			'astra-settings[header-mobile-menu-a-color-responsive]': {
				tablet: 'rgb(23, 46, 207)',
				mobile: 'rgb(23, 46, 207)',
			},
			'astra-settings[header-mobile-menu-bg-obj-responsive]': {
				tablet: 'rgb(199, 156, 156)',
				mobile: 'rgb(199, 156, 156)',
			},
			// 'header-mobile-menu-h-bg-color-responsive': {
			// 	tablet: 'rgb(25, 7, 0)',
			// 	mobile: 'rgb(25, 7, 0)',
			// },
			'astra-settings[header-mobile-menu-a-bg-color-responsive]': {
				tablet: 'rgb(51, 24, 24)',
				mobile: 'rgb(51, 24, 24)',
			},
			//'customize-control-header-mobile-menu-font-family': 'Segoe UI',
			'customize-control-header-mobile-menu-font-size': {
				tablet: 30,
				mobile: 20,
			},
			'customize-control-header-mobile-menu-font-weight': 900,
			'customize-control-header-mobile-menu-text-transform': 'uppercase',
			'customize-control-header-mobile-menu-line-height': 1,
			'customize-control-astra-settings-header-mobile-menu-menu-spacing': {
				tablet: {
					top: 5,
					right: 5,
					bottom: 5,
					left: 5,
				},
				mobile: {
					top: 5,
					right: 5,
					bottom: 5,
					left: 5,
				},
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'customize-control-astra-settings-section-header-mobile-menu-margin': {
				tablet: {
					top: 5,
					right: 5,
					bottom: 5,
					left: 5,
				},
				mobile: {
					top: 5,
					right: 5,
					bottom: 5,
					left: 5,
				},
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( offCanvasMenuDesign );
		await createNewPost( {
			postType: 'page',
			title: 'mobile header',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'off canvas menu',
		} );
		await publishPost();
		await page.goto( createURL( '/off-canvas-menu' ), {
			waitUntil: 'networkidle0',
		} );

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'astra-settings[header-mobile-menu-color-responsive]' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'astra-settings[header-mobile-menu-color-responsive]' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'astra-settings[header-mobile-menu-a-color-responsive]' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'astra-settings[header-mobile-menu-a-color-responsive]' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'astra-settings[header-mobile-menu-bg-obj-responsive]' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'astra-settings[header-mobile-menu-bg-obj-responsive]' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'astra-settings[header-mobile-menu-a-bg-color-responsive]' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'astra-settings[header-mobile-menu-a-bg-color-responsive]' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		// await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		// await expect( {
		// 	selector: '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link',
		// 	property: 'font-family',
		// } ).cssValueToBe(
		// 	`${ offCanvasMenuDesign[ 'customize-control-header-mobile-menu-font-family' ] }`,
		// );

		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation',
			property: 'font-size',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-header-mobile-menu-font-size' ].tablet + 'px' }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation',
			property: 'font-size',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-header-mobile-menu-font-size' ].mobile + 'px' }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation',
			property: 'font-weight',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-header-mobile-menu-font-weight' ] }`,
		);

		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link',
			property: 'line-height',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-header-mobile-menu-text-transform' ] }`,
		);

		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ].tablet.top }${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ].tablet.right }${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ].tablet.bottom }${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ].tablet.left }${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await page.click( '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ].mobile.top }${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ].mobile.right }${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ].mobile.bottom }${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ].mobile.left }${ offCanvasMenuDesign[ 'customize-control-astra-settings-header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }`,
		);

		await setBrowserViewport( 'medium ' );
		await page.click( '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ].tablet.top }${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ].tablet.right }${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ].tablet.bottom }${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ].tablet.left }${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await page.click( '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ].mobile.top }${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ].mobile.right }${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ].mobile.bottom }${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ].mobile.left }${ offCanvasMenuDesign[ 'customize-control-astra-settings-section-header-mobile-menu-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );

