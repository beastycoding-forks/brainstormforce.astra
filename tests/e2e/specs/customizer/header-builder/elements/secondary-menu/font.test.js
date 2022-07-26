import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { createSecondaryMenu } from '../../../../../utils/create-menu2';
describe( 'Secondary menu settings in the customizer', () => {
	it( 'secondary menu font should apply correctly', async () => {
		await createSecondaryMenu();
		const secondaryMenuFont = {
			'header-menu2-font-family': 'Raleway, sans-serif',
			'header-menu2-font-weight': '400',
			'header-menu2-text-transform': 'uppercase',
			'header-menu2-line-height': '1.2',
			'header-menu2-font-size': {
				desktop: 55,
				tablet: 45,
				mobile: 35,
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
		await setCustomize( secondaryMenuFont );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-2' );
		await expect( {
			selector: '.ast-builder-menu-2',
			property: 'font-family',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-family' ] }` );

		await expect( {
			selector: '.ast-builder-menu-2',
			property: 'font-weight',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-weight' ] }` );

		await expect( {
			selector: '.ast-builder-menu-2',
			property: 'text-transform',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-text-transform' ] }` );

		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'line-height',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-line-height' ] * secondaryMenuFont[ 'header-menu2-font-size' ].desktop }` + 'px' );

		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-size' ].desktop }${ secondaryMenuFont[ 'header-menu2-font-size' ][ 'desktop-unit' ] }` );
	} );
} );
