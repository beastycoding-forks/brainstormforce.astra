import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu background color should apply correctly', async () => {
		await createNewMenu();
		const primaryMenuBgColor = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(216, 241, 221)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'color',
				},
				tablet: {
					'background-color': 'rgb(241, 222, 222)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'color',
				},
				mobile: {
					'background-color': 'rgb(251, 249, 219)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'color',
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'menu-1',
					},
				},
			},
		};
		await setCustomize( primaryMenuBgColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
