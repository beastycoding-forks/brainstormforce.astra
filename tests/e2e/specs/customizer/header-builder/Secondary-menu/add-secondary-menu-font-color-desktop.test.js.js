import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Add secondary menu color settings for desktop view', () => {
	it( 'secondary menu color settings should be added properly in desktop view', async () => {
		const secondaryMenuFontColor = {
			'header-menu2-color-responsive': {
				desktop: 'rgb(0, 0, 0)',
			},
			'header-menu2-a-color-responsive': {
				desktop: 'rgb(183, 1, 129)',
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',
					},
				},
			},
		};
		await setCustomize( secondaryMenuFontColor );
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
			selector: '.ast-builder-menu-2 .main-header-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ secondaryMenuFontColor[ 'header-menu2-color-responsive' ].desktop }`,
		);
		await page.click( '.menu-link' );
		await page.waitForSelector( '#ast-desktop-header' );
		await expect( {
			selector: '#secondary_menu-site-navigation #ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ secondaryMenuFontColor[ 'header-menu2-a-color-responsive' ].desktop }`,
		);
	} );
} );
