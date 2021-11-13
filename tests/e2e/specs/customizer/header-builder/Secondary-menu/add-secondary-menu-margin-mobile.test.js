import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Add secondary menu margin for mobile view', () => {
	it( 'secondary menu margin should be added properly in mobile view', async () => {
		const secondaryMenuMargin = {
			'section-hb-menu-2-margin': {
				mobile: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
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
		//for mobile view
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-mobile-header .main-navigation a' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].mobile.top }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].mobile.right }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].mobile.left }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ].mobile.bottom }${ secondaryMenuMargin[ 'section-hb-menu-2-margin' ][ 'mobile-unit' ] }`,
		);
	} );
} );
