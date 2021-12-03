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
describe( 'Add footer menu color settings in tablet view', () => {
	it( 'footer menu color settings should be added properly in tablet view', async () => {
		const footerMenuFontColorTablet = {
			'footer-menu-color-responsive': {
				tablet: 'rgb(0, 0, 255)',
			},
			'footer-menu-a-color-responsive': {
				tablet: 'rgb(0, 0, 0)',
			},
		};
		await setCustomize( footerMenuFontColorTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		//normal color test case
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ footerMenuFontColorTablet[ 'footer-menu-color-responsive' ].tablet }`,
		);
		//active color test case
		await page.click( '#astra-footer-menu .menu-link' );
		await page.waitForSelector( '.site-footer' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ footerMenuFontColorTablet[ 'footer-menu-a-color-responsive' ].tablet }`,
		);
	} );
} );
describe( 'Add footer menu color settings in mobile view', () => {
	it( 'footer menu color settings should be added properly in mobile view', async () => {
		const footerMenuFontColorMobile = {
			'footer-menu-color-responsive': {
				mobile: 'rgb(0, 0, 0)',
			},
			'footer-menu-a-color-responsive': {
				mobile: 'rgb(0, 0, 255)',
			},
		};
		await setCustomize( footerMenuFontColorMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		//normal color test case
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ footerMenuFontColorMobile[ 'footer-menu-color-responsive' ].mobile }`,
		);
		//active color test case
		await page.click( '#astra-footer-menu .menu-link' );
		await page.waitForSelector( '.site-footer' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ footerMenuFontColorMobile[ 'footer-menu-a-color-responsive' ].mobile }`,
		);
	} );
} );

