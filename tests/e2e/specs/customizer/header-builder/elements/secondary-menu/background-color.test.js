import { createURL } from '@wordpress/e2e-test-utils';
import { createSecondaryMenu } from '../../../../../utils/create-secondary-menu';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Secondary menu settings in the customizer', () => {
	it( 'background normal color should apply correctly', async () => {
		await createSecondaryMenu();
		const secondaryMenuBgColor = {
			'header-menu2-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(216, 241, 221)',
					'background-repeat': 'repeat',
					'background-position]': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'color',
				},
				tablet: {
					'background-color': 'rgb(241, 222, 222)',
					'background-repeat': 'repeat',
					'background-position]': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'color',
				},
				mobile: {
					'background-color': 'rgb(251, 249, 219)',
					'background-repeat': 'repeat',
					'background-position]': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'color',
				},
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
		await setCustomize( secondaryMenuBgColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-2 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ secondaryMenuBgColor[ 'header-menu2-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ secondaryMenuBgColor[ 'header-menu2-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ secondaryMenuBgColor[ 'header-menu2-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
