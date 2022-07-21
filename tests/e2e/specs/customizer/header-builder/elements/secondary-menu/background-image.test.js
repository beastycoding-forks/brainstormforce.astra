import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { createSecondaryMenu } from '../../../../../utils/create-menu2';
describe( 'Secondary menu settings in the customizer', () => {
	it( 'background image should apply correctly', async () => {
		await createSecondaryMenu();
		const secondaryMenuBgImage = {
			'header-menu2-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/04/2626264f36443b827.24646863-220x300.jpg',
					'background-repeat': 'repeat',
					'background-position]': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/04/2966264f298b6e007.81903590-300x200.jpg',
					'background-repeat': 'repeat',
					'background-position]': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/04/276262a8d1470467.39785232-300x200.jpeg',
					'background-repeat': 'repeat',
					'background-position]': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'image',
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
		await setCustomize( secondaryMenuBgImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-2 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ secondaryMenuBgImage[ 'header-menu2-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ secondaryMenuBgImage[ 'header-menu2-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ secondaryMenuBgImage[ 'header-menu2-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }` );
	} );
} );
