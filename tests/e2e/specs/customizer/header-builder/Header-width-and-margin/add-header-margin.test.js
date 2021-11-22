import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../utils/customize';
describe( 'Header margin settings in the customizer', () => {
	it( 'header margin settings should be applied correctly in desktop view', async () => {
		const headerWidthAndMargin = {
			'section-header-builder-layout-margin': {
				desktop: {
					top: '150',
					right: '150',
					bottom: '150',
					left: '150',
				},
				'desktop-unit': 'px',
			},
		};
		await setCustomize( headerWidthAndMargin );
		await createNewPost( {
			postType: 'page',
			title: 'Home',
			content: 'This is a home page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#page' );
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].desktop.top }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].desktop.right }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].desktop.left }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].desktop.bottom }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'desktop-unit' ] }`,
		);
	} );
	it( 'header margin settings should be applied correctly in mobile view', async () => {
		const headerWidthAndMargin = {
			'section-header-builder-layout-margin': {
				mobile: {
					top: '150',
					right: '150',
					bottom: '150',
					left: '150',
				},
				'mobile-unit': 'px',
			},
		};
		await setCustomize( headerWidthAndMargin );
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.top }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.right }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.left }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].mobile.bottom }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'mobile-unit' ] }`,
		);
	} );
	it( 'header margin settings should be applied correctly in tablet view', async () => {
		const headerWidthAndMargin = {
			'section-header-builder-layout-margin': {
				tablet: {
					top: '150',
					right: '150',
					bottom: '150',
					left: '150',
				},
				'tablet-unit': 'px',
			},
		};
		await setCustomize( headerWidthAndMargin );
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.top }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.right }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.left }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '.ast-hfb-header .site-header',
			property: 'margin',
		} ).cssValueToBe( `${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ].tablet.bottom }${ headerWidthAndMargin[ 'section-header-builder-layout-margin' ][ 'tablet-unit' ] }`,
		);
	} );
} );
