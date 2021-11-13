import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Add secondary menu spacing for mobile view', () => {
	it( 'secondary menu spacing should be added properly in mobile view', async () => {
		const secondaryMenuSpacing = {
			'header-menu2-menu-spacing': {
				mobile: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				'mobile-unit': 'px',
			},
			'header-mobile-items': {
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
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-mobile-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].mobile.top }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].mobile.right }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].mobile.left }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].mobile.bottom }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'mobile-unit' ] }`,
		);
	} );
} );
