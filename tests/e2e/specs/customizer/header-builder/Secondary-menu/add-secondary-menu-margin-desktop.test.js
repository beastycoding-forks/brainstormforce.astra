import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
//import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Add secondary menu margin for desktop view', () => {
	it( 'secondary menu margin should be added properly in desktop view', async () => {
		const secondaryMenuMargin = {
			'section-hb-menu-2-margin': {
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
		await setCustomize( secondaryMenuMargin );
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
			property: 'margin-top',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].desktop.top }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].desktop.right }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].desktop.left }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].desktop.bottom }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'desktop-unit' ] }`,
		);
	} );
} );
