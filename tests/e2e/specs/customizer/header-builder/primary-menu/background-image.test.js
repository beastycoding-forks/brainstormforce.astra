import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
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
					'background-image': 'https://pd.w.org/2022/03/359622bb65ece8859.46427938-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/4136228f92e073825.69069021-rotated.jpg',
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
		await createNewMenu();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu .sub-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu .sub-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu .sub-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-menu1-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu .sub-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-menu1-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }` );
	} );
} );

