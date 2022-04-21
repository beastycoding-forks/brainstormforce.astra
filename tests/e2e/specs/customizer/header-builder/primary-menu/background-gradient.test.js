import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Primary menu background gradient color settings in the customizer', () => {
	it( 'background gradient color should apply correctly', async () => {
		await createNewMenu();
		const primaryMenuGradient = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(155, 81, 224) 47%, rgb(179, 169, 67) 60%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(195, 221, 236) 0%, rgb(155, 81, 224) 100%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(162, 242, 168) 0%, rgb(229, 200, 201) 100%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};
		await setCustomize( primaryMenuGradient );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ primaryMenuGradient[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await page.click(
			'.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle',
		);
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ primaryMenuGradient[ 'header-menu1-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await page.click(
			'.ast-mobile-header-wrap .ast-button-wrap .menu-toggle.main-header-menu-toggle',
		);
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ primaryMenuGradient[ 'header-menu1-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
