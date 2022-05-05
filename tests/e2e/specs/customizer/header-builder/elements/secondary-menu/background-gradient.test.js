import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { createSecondaryMenu } from '../../../../../utils/create-secondary-menu';
describe( 'Secondary menu backgeound gradient setting in customizer', () => {
	it( 'background gradient should apply correctly', async () => {
		await createSecondaryMenu();
		const secondaryMenuBggradient = {
			'header-menu2-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(236, 208, 206) 30%, rgb(239, 17, 65) 100%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(242, 237, 237) 30%, rgb(14, 13, 13) 100%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
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
		await setCustomize( secondaryMenuBggradient );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-2 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ secondaryMenuBggradient[ 'header-menu2-bg-obj-responsive' ].desktop[ 'background-color' ] }` );
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-builder-menu-2 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ secondaryMenuBggradient[ 'header-menu2-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-builder-menu-2 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ secondaryMenuBggradient[ 'header-menu2-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
