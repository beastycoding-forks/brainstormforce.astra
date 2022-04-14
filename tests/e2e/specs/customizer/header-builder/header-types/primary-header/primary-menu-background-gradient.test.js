import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../../utils/publish-post';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Primary menu background gradient color settings in the customizer', () => {
	it( 'background gradient color should apply correctly', async () => {
		const menuGradient = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};
		await setCustomize( menuGradient );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe(
			`${ menuGradient[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
	} );
	it( 'background gradient color for mobile and tablet should apply correctly', async () => {
		const menuGradient = {
			'header-mobile-menu-bg-obj-responsive': {
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
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
		};
		await setCustomize( menuGradient );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( ' .main-header-menu' );
		await expect( {
			selector: '.main-header-menu',
			property: 'background-image',
		} ).cssValueToBe(
			`${ menuGradient[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.main-header-menu' );
		await expect( {
			selector: '.main-header-menu',
			property: 'background-image',
		} ).cssValueToBe(
			`${ menuGradient[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
} );
