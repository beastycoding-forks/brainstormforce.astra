import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu spacing should be apply correctly', async () => {
		const primaryMenuSpacing = {
			'header-menu1-menu-spacing': {
				desktop: {
					top: '90',
					right: '90',
					bottom: '90',
					left: '90',
				},
				'desktop-unit': 'px',
			},
		};
		await setCustomize( primaryMenuSpacing );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-1 .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].desktop.top }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].desktop.right }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].desktop.bottom }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1 .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].desktop.left }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'desktop-unit' ] }` );
	} );
} );
