import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas menu design settings in the customizer', () => {
	it( 'off canvas menu design settings should apply corectly for after header', async () => {
		const offCanvasMenuDesign = {
			'header-mobile-menu-color-responsive': {
				desktop: 'rgb(10, 10, 10)',
				tablet: 'rgb(10, 10, 10)',
				mobile: 'rgb(10, 10, 10)',
			},
			'header-mobile-menu-a-color-responsive': {
				desktop: 'rgb(23, 46, 207)',
				tablet: 'rgb(23, 46, 207)',
				mobile: 'rgb(23, 46, 207)',
			},
			'header-mobile-menu-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(254, 113, 213)',
				},
				tablet: {
					'background-color': 'rgb(254, 113, 213)',
				},
				mobile: {
					'background-color': 'rgb(254, 113, 213)',
				},
			},
			'header-mobile-menu-a-bg-color-responsive': {
				desktop: 'rgb(255, 255, 255)',
				tablet: 'rgb(255, 255, 255)',
				mobile: 'rgb(255, 255, 255)',
			},
			'header-mobile-menu-menu-spacing': {
				desktop: {
					top: 5,
					right: 5,
					bottom: 5,
					left: 5,
				},
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
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'section-header-mobile-menu-margin': {
				desktop: {
					top: 5,
					right: 5,
					bottom: 5,
					left: 5,
				},
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
				'desktop-unit': 'px',
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
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-color-responsive' ].tablet }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-a-color-responsive' ].tablet }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-builder-menu-mobile .main-navigation .main-header-menu .sub-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-a-bg-color-responsive' ].tablet }`,
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
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.right }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.bottom }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].tablet.left }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ].tablet.top }${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ].tablet.right }${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ].tablet.bottom }${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ].tablet.left }${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await page.click( '.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-color-responsive' ].mobile }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-a-color-responsive' ].mobile }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-builder-menu-mobile .main-navigation .main-header-menu .sub-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-a-bg-color-responsive' ].mobile }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].mobile.top }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].mobile.right }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].mobile.bottom }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ].mobile.left }${ offCanvasMenuDesign[ 'header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ].mobile.top }${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe(
			`${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ].mobile.right }${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ][ 'mobile-unit' ] }`,
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
			`${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ].mobile.left }${ offCanvasMenuDesign[ 'section-header-mobile-menu-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );

