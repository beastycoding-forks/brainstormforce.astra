import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
import { createNewMenu } from '../../../../utils/create-menu';
describe( 'Primary menu settings in the customizer', () => {
	it( 'background image should apply corectly', async () => {
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
					'background-image': '',
					'background-repeat': '',
					'background-position': '',
					'background-size': '',
					'background-attachment': '',
					'background-type': '',
				},
				mobile: {
					'background-image': '',
					'background-repeat': '',
					'background-position': '',
					'background-size': '',
					'background-attachment': '',
					'background-type': '',
				},
			},
		};
		await setCustomize( primaryMenuImage );
		await createNewMenu();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );
	} );
} );

