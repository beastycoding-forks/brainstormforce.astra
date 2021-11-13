import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
//import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Add secondary menu margin for tablet view', () => {
	it( 'secondary menu margin should be added properly in tablet view', async () => {
		const secondaryMenuMargin = {
			'section-hb-menu-2-margin': {
				tablet: {
					top: '100',
					right: '100',
					bottom: '100',
					left: '100',
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
		await setCustomize( secondaryMenuMargin );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page - desktop',
			content: 'This is simple test page for desktop view',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		//for tablet view
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '#ast-mobile-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].tablet.top }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].tablet.right }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].tablet.left }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].tablet.bottom }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'tablet-unit' ] }`,
		);
	} );
} );
