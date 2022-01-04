import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Add secondary menu color settings for tablet view', () => {
	it( 'secondary menu color settings should be added properly in tablet view', async () => {
		const secondaryMenuFontColor = {
			'header-menu2-color-responsive': {
				tablet: 'rgb(0, 0, 0)',
			},
			'header-menu2-a-color-responsive': {
				tablet: 'rgb(183, 1, 129)',
			},
			'header-mobile-items': {
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
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-mobile-header .main-navigation a' );
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ secondaryMenuFontColor[ 'header-menu2-color-responsive' ].tablet }`,
		);
		await page.click( '#ast-hf-menu-2 .main-header-menu .menu-item .menu-link' );
		await page.waitForSelector( '#ast-mobile-header' );
		await expect( {
			selector: '#secondary_menu-site-navigation #ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ secondaryMenuFontColor[ 'header-menu2-a-color-responsive' ].tablet }`,
		);
	} );
} );
