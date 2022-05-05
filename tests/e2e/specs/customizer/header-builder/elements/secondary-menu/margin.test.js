import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { createSecondaryMenu } from '../../../../../utils/create-secondary-menu';
describe( 'Secondary menu setting in the customizer for', () => {
	it( 'secondary menu margin should apply correctly', async () => {
		await createSecondaryMenu();
		const secondaryMenuMargin = {
			'section-hb-menu-2-margin': {
				desktop: {
					top: '80',
					right: '80',
					bottom: '80',
					left: '80',
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
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',
					},
				},
			},
			'header-mobile-items': {
				above: {
					above_left: {
						0: 'menu-2',
					},
				},
			},
		};
		await setCustomize( secondaryMenuMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-2 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].desktop.top }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].desktop.right }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].desktop.left }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].desktop.bottom }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].tablet.top }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].tablet.right }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].tablet.left }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].tablet.bottom }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].mobile.top }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].mobile.right }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].mobile.left }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu, .ast-header-break-point .ast-builder-menu-2 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].mobile.bottom }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'mobile-unit' ] }` );
	} );
} );
