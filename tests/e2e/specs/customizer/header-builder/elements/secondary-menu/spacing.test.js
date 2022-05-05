import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { createSecondaryMenu } from '../../../../../utils/create-secondary-menu';
describe( 'Secondary menu spacing in the customizer', () => {
	it( 'spacing option should apply correctly', async () => {
		await createSecondaryMenu();
		const secondaryMenuSpacing = {
			'header-menu2-menu-spacing': {
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
				primary: {
					primary_center: {
						0: 'menu-2',
					},
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'menu-2',
					},
				},
			},
		};
		await setCustomize( secondaryMenuSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-2 .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].desktop.top }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].desktop.right }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].desktop.left }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].desktop.bottom }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].tablet.top }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].tablet.right }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].tablet.left }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].tablet.bottom }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].mobile.top }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].mobile.right }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].mobile.left }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].mobile.bottom }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'mobile-unit' ] }` );
	} );
} );
