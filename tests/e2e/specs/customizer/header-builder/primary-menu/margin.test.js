import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu margin should be apply correctly', async () => {
		const primaryMenuMargin = {
			'section-hb-menu-1-margin': {
				desktop: {
					top: '90',
					right: '90',
					bottom: '90',
					left: '90',
				},
				'desktop-unit': 'px',
			},
		};
		await setCustomize( primaryMenuMargin );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].desktop.top }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].desktop.right }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].desktop.bottom }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ primaryMenuMargin[ 'section-hb-menu-1-margin' ].desktop.left }${ primaryMenuMargin[ 'section-hb-menu-1-margin' ][ 'desktop-unit' ] }` );
	} );
} );
