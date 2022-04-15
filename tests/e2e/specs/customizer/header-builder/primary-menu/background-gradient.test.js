import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu background gradient color settings in the customizer', () => {
	it( 'background gradient color should apply correctly', async () => {
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
			},
		};
		await setCustomize( primaryMenuGradient );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ primaryMenuGradient[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-color' ] }` );
	} );
} );
