import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../../utils/publish-post';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Secondary menu settings in the customizer', () => {
	it( 'secondary menu font should apply correctly', async () => {
		const secondaryMenuFont = {
			'header-menu2-font-family': 'Raleway, sans-serif',
			'header-menu2-font-weight': '400',
			'header-menu2-text-transform': 'uppercase',
			'header-menu2-line-height': '1.2',
			'header-menu2-font-size': {
				desktop: 50,
				'desktop-unit': 'px',
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
		await setCustomize( secondaryMenuFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'menu-background-image' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'font-family',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-family' ] }` );

		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'font-weight',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-weight' ] }` );

		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'text-transform',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-text-transform' ] }` );

		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'line-height',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-line-height' ] }` );

		await expect( {
			selector: '.ast-builder-menu-2 .menu-item > .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-size' ].desktop }${ secondaryMenuFont[ 'header-menu2-font-size' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '#ast-hf-menu-2 .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-size' ].tablet }${ secondaryMenuFont[ 'header-menu2-font-size' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '#ast-hf-menu-2 .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-size' ].mobile }${ secondaryMenuFont[ 'header-menu2-font-size' ][ 'mobile-unit' ] }` );
	} );
} );
