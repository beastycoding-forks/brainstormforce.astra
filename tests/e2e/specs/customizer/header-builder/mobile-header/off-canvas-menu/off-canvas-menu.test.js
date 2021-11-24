import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas menu design settings in the customizer', () => {
	it( 'off canvas menu design settings should apply corectly for after header', async () => {
		const offCanvasMenuDesign = {
			'header-mobile-menu-color-responsive': {
				tablet: 'rgb(25, 7, 0)',
				mobile: 'rgb(25, 7, 0)',
			},
			// 'header-mobile-menu-h-color-responsive': {
			// 	tablet: 'rgb(2, 7, 100)',
			// 	mobile: 'rgb(2, 7, 100)',
			// },
			'header-mobile-menu-a-color-responsive': {
				tablet: 'rgb(252, 252, 252)',
				mobile: 'rgb(252, 252, 252)',
			},
			'header-mobile-menu-bg-obj-responsive': {
				tablet: 'rgb(25, 7, 0)',
				mobile: 'rgb(25, 7, 0)',
			},
			// 'header-mobile-menu-h-bg-color-responsive': {
			// 	tablet: 'rgb(25, 7, 0)',
			// 	mobile: 'rgb(25, 7, 0)',
			// },
			'header-mobile-menu-a-bg-color-responsive': {
				tablet: 'rgb(25, 7, 0)',
				mobile: 'rgb(25, 7, 0)',
			},
			'header-mobile-menu-font-family': 'Raleway',
			'header-mobile-menu-font-size': {
				tablet: 30,
				mobile: 20,
			},
			'header-mobile-menu-font-weight': 900,
			'header-mobile-menu-text-transform': 'uppercase',
			'header-mobile-menu-line-height': 1,
			'header-mobile-menu-menu-spacing': {
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
			'section-header-mobile-menu-margin': {
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
			`${ offCanvasMenuDesign[ 'header-mobile-menu-color-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-color-responsive' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-a-color-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-a-color-responsive' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-bg-obj-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-bg-obj-responsive' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-a-bg-color-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-a-bg-color-responsive' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link',
			property: 'font-family',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-font-family' ] }`,
		);

		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation',
			property: 'font-size',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-font-size' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation',
			property: 'font-size',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-font-size' ].mobile }`,
		);

		await setBrowserViewport( 'medium' );
		await page.click( '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation',
			property: 'font-weight',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-font-weight' ] }`,
		);

		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link',
			property: 'line-height',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-text-transform' ] }`,
		);

		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.top }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.right }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.bottom }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.left }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await page.click( '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.top }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.right }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.bottom }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.left }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium ' );
		await page.click( '.ast-builder-menu-mobile .main-navigation .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.top }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.right }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.bottom }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.left }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'desktop-unit' ] }`,
		);
	} );
} );

