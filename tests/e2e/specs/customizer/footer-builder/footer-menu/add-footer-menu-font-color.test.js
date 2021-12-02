import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Add footer menu color settings', () => {
	it( 'footer menu color settings should be added properly', async () => {
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
		const footerMenuFontColor = {
			'footer-menu-color-responsive': {
				desktop: 'rgb(0, 0, 0)',
			},
			'footer-menu-a-color-responsive': {
				desktop: 'rgb(183, 1, 129)',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuFontColor );
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		//normal color test case
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ footerMenuFontColor[ 'footer-menu-color-responsive' ].desktop }`,
		);
		//active color test case
		await page.click( '#astra-footer-menu .menu-link' );
		await page.waitForSelector( '.site-footer' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ footerMenuFontColor[ 'footer-menu-a-color-responsive' ].desktop }`,
		);
	} );
} );
