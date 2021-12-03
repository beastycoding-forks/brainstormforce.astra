import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Add footer menu color settings in desktop view', () => {
	it( 'footer menu color settings should be added properly in desktop view', async () => {
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'Sub Test Page',
			content: 'This is simple sub test page',
		} );
		await publishPost();
		await page.goto( createURL( '/wp-admin/nav-menus.php' ), {
			waitUntil: 'networkidle0',
		} );
		await scrollToElement( '#nav-menu-footer' );
		if ( await page.$( '.menu-delete' ) ) {
			await page.click( '.menu-delete' );
		}
		await page.focus( '#menu-name' );
		await page.type( '#menu-name', 'Menu' );
		await page.focus( '#locations-footer_menu' );
		await page.click( '#locations-footer_menu' );
		await page.click( '#save_menu_footer' );
		await page.waitForSelector( '.accordion-section-content ' );
		await page.focus( '#page-tab' );
		await page.click( '#page-tab' );
		await page.click( '#submit-posttype-page' );
		await scrollToElement( '#nav-menu-footer' );
		await page.waitForSelector( '.publishing-action' );
		await page.focus( '#save_menu_footer' );
		await page.click( '#save_menu_footer' );
		const footerMenuFontSize = {
			'footer-menu-font-size': {
				desktop: 50,
				tablet: 32,
				mobile: 16,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuFontSize );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		//font size of the footer menu
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ footerMenuFontSize[ 'footer-menu-font-size' ].desktop }${ footerMenuFontSize[ 'footer-menu-font-size' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ footerMenuFontSize[ 'footer-menu-font-size' ].tablet }${ footerMenuFontSize[ 'footer-menu-font-size' ][ 'tablet-unit' ] }`,
		);
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ footerMenuFontSize[ 'footer-menu-font-size' ].mobile }${ footerMenuFontSize[ 'footer-menu-font-size' ][ 'mobile-unit' ] }`,
		);
	} );
} );
