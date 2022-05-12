import { createURL } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
describe( 'Primary menu settings in the customizer', () => {
	it( 'background image should apply correctly', async () => {
		await createNewMenu();
		const primaryMenuImage = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/03/96622a0f432e6904.41498035-300x169.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/96622a0f432e6904.41498035-300x169.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/96622a0f432e6904.41498035-300x169.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
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
		await setCustomize( primaryMenuImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-menu1-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-menu1-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }` );
	} );
} );
