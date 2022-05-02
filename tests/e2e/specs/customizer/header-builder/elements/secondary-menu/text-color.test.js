import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../../utils/publish-post';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Secondary mneu setting in the customizer', () => {
	it( 'secondary menu text color settings should apply correctly', async () => {
		const secondaryMenuTextColor = {
			'header-menu2-color-responsive': {
				desktop: 'rgb(126, 3, 145)',
				tablet: 'rgb(100, 54, 2)',
				mobile: 'rgb(144, 5, 23)',
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
		await setCustomize( secondaryMenuTextColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'menu-text-color' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-2 .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ secondaryMenuTextColor[ 'header-menu2-color-responsive' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ secondaryMenuTextColor[ 'header-menu2-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ secondaryMenuTextColor[ 'header-menu2-color-responsive' ].mobile }` );
	} );

	it( 'secondary menu active text color settings should apply correctly', async () => {
		const secondaryMenuTextColor = {
			'header-menu2-a-color-responsive': {
				desktop: 'rgb(126, 3, 145)',
				tablet: 'rgb(100, 54, 2)',
				mobile: 'rgb(0, 106, 16)',
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
		await setCustomize( secondaryMenuTextColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'menu-text-color' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/menu-text-color' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-2 .menu-item.current-menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-2 .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ secondaryMenuTextColor[ 'header-menu2-a-color-responsive' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-builder-menu-2 .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ secondaryMenuTextColor[ 'header-menu2-a-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-builder-menu-2 .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ secondaryMenuTextColor[ 'header-menu2-a-color-responsive' ].mobile }` );
	} );
} );
