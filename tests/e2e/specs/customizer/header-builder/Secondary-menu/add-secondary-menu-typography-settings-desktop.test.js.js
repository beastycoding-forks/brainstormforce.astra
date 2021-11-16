import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Add secondary menu typography settings for desktop view', () => {
	it( 'secondary menu typography settings should be added properly in desktop view', async () => {
		const secondaryMenuFont = {
			'header-menu2-font-family': 'Raleway, sans-serif',
			'header-menu2-font-size': {
				desktop: 50,
				'desktop-unit': 'px',
			},
			'header-menu2-font-weight': '800',
			'header-menu2-text-transform': 'lowercase',
			'header-menu2-line-height': '500px',
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',
					},
				},
			},
		};
		await setCustomize( secondaryMenuFont );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'font-family',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-family' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ secondaryMenuFont[ 'header-menu2-font-size' ].desktop }${ secondaryMenuFont[ 'header-menu2-font-size' ][ 'desktop-unit' ] }`,
		);
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'font-weight',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-font-weight' ] }`,
		);
		await page.waitForSelector( '#ast-desktop-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'text-transform',
		} ).cssValueToBe( `${ secondaryMenuFont[ 'header-menu2-text-transform' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .menu-item .menu-link',
			property: 'line-height',
		} ).cssValueToBe(
			`${ secondaryMenuFont[ 'header-menu2-line-height' ] }`,
		);
	} );
} );
