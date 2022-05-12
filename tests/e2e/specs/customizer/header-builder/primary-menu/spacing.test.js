import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { createNewMenu } from '../../../../utils/create-menu';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu spacing should be apply correctly', async () => {
		await createNewMenu();
		const primaryMenuSpacing = {
			'header-menu1-menu-spacing': {
				desktop: {
					top: '90',
					right: '90',
					bottom: '90',
					left: '90',
				},
				tablet: {
					top: '90',
					right: '90',
					bottom: '90',
					left: '90',
				},
				mobile: {
					top: '90',
					right: '90',
					bottom: '90',
					left: '90',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'menu-1',
					},
				},
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

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].tablet.top }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].tablet.right }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].tablet.bottom }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].tablet.left }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].mobile.top }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].mobile.right }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].mobile.bottom }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ].mobile.left }${ primaryMenuSpacing[ 'header-menu1-menu-spacing' ][ 'mobile-unit' ] }` );
	} );
} );
