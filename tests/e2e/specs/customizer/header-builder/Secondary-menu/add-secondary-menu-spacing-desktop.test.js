import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Add secondary menu spacing for desktop view', () => {
	it( 'secondary menu spacing should be added properly in desktop view', async () => {
		const secondaryMenuSpacing = {
			'header-menu2-menu-spacing': {
				desktop: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				'desktop-unit': 'px',
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',
					},
				},
			},
		};
		await setCustomize( secondaryMenuSpacing );
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
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].desktop.top }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].desktop.right }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].desktop.left }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].desktop.bottom }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'desktop-unit' ] }`,
		);
	} );
} );
