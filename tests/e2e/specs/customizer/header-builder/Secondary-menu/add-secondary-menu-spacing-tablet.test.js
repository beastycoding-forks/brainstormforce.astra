import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Add secondary menu spacing for tablet view', () => {
	it( 'secondary menu spacing should be added properly in tablet view', async () => {
		const secondaryMenuSpacing = {
			'header-menu2-menu-spacing': {
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				'tablet-unit': 'px',
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
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-mobile-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].tablet.top }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].tablet.right }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].tablet.left }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ].tablet.bottom }${ secondaryMenuSpacing[ 'header-menu2-menu-spacing' ][ 'tablet-unit' ] }`,
		);
	} );
} );
