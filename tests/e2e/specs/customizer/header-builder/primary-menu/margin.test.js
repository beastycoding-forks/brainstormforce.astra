import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu margin should be apply correctly', async () => {
		await createNewMenu();
		const primaryMenuMargin = {
			'section-hb-menu-1-margin': {
				desktop: {
					top: '90',
					right: '90',
					bottom: '90',
					left: '90',
				},
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				mobile: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'menu-1',
					},
				},
			},
		};
		await setCustomize( primaryMenuMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].desktop.top }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].desktop.right }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].desktop.bottom }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].desktop.left }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].tablet.top }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].tablet.right }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].tablet.bottom }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].tablet.left }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].mobile.top }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].mobile.right }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].mobile.bottom }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu, .ast-header-break-point .ast-builder-menu-1 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].mobile.left }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'mobile-unit' ] }` );
	} );
} );
