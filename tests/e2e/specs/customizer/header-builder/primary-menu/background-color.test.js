import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu background color should apply correctly', async () => {
		const primaryMenuBgColor = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(247, 252, 233)',
				},
			},
		};
		await setCustomize( primaryMenuBgColor );
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
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-color' ] }` );
	} );

	it( 'primary menu active background color should apply correctly', async () => {
		const primaryMenuBgColor = {
			'header-menu1-a-bg-color-responsive': {
				desktop: {
					'background-color': 'rgb(228, 246, 242)',
				},
			},
		};
		await setCustomize( primaryMenuBgColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .menu-item.current-menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-1 .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-a-bg-color-responsive' ].desktop[ 'background-color' ] }` );
	} );
} );

