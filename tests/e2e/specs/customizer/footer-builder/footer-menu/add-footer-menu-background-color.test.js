import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Footer menu background normal color settings in the customizer for desktop', () => {
	//test case for normal color setting
	it( 'footer menu background normal color should apply corectly in desktop', async () => {
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
		const footerMenuBackgroundColor = {
			'footer-menu-color-responsive': {
				desktop: 'rgb(255, 255, 255)',
			},
			'footer-menu-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(167, 1, 118)',
				},
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuBackgroundColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColor[ 'footer-menu-color-responsive' ].desktop }`,
		);
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColor[ 'footer-menu-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
	} );
	//test case for active color setting
	it( 'footer menu background active color should apply corectly in desktop', async () => {
		const footerMenuBackgroundColor = {
			'footer-menu-a-bg-color-responsive': {
				desktop: 'rgb(0, 0, 255)',
			},
		};
		await setCustomize( footerMenuBackgroundColor );
		await page.click( '#astra-footer-menu .menu-link' );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item.current-menu-item a',
			property: 'background-color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColor[ 'footer-menu-a-bg-color-responsive' ].desktop }`,
		);
	} );
} );
describe( 'Footer menu background normal color settings in the customizer for tablet', () => {
	//test case for normal color setting
	it( 'footer menu background normal color should apply corectly in tablet', async () => {
		const footerMenuBackgroundColorTablet = {
			'footer-menu-color-responsive': {
				tablet: 'rgb(0, 0, 0)',
			},
			'footer-menu-bg-obj-responsive': {
				tablet: {
					'background-color': 'rgb(148, 148, 255)',
				},
			},
		};
		await setCustomize( footerMenuBackgroundColorTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColorTablet[ 'footer-menu-color-responsive' ].tablet }`,
		);
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColorTablet[ 'footer-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
	} );
	//test case for active color setting
	it( 'footer menu background active color should apply corectly in desktop', async () => {
		const footerMenuBackgroundColorTablet = {
			'footer-menu-a-bg-color-responsive': {
				tablet: 'rgb(207, 255, 148)',
			},
		};
		await setCustomize( footerMenuBackgroundColorTablet );
		await page.click( '#astra-footer-menu .menu-link' );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item.current-menu-item a',
			property: 'background-color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColorTablet[ 'footer-menu-a-bg-color-responsive' ].tablet }`,
		);
	} );
} );
describe( 'Footer menu background normal color settings in the customizer for mobile', () => {
	//test case for normal color setting
	it( 'footer menu background normal color should apply corectly in mobile', async () => {
		const footerMenuBackgroundColorMobile = {
			'footer-menu-color-responsive': {
				mobile: 'rgb(128, 35, 35)',
			},
			'footer-menu-bg-obj-responsive': {
				mobile: {
					'background-color': 'rgb(240, 240, 240)',
				},
			},
		};
		await setCustomize( footerMenuBackgroundColorMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColorMobile[ 'footer-menu-color-responsive' ].mobile }`,
		);
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColorMobile[ 'footer-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
	//test case for active color setting
	it( 'footer menu background active color should apply corectly in desktop', async () => {
		const footerMenuBackgroundColorMobile = {
			'footer-menu-a-bg-color-responsive': {
				mobile: 'rgb(240, 214, 240)',
			},
		};
		await setCustomize( footerMenuBackgroundColorMobile );
		await page.click( '#astra-footer-menu .menu-link' );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item.current-menu-item a',
			property: 'background-color',
		} ).cssValueToBe(
			`${ footerMenuBackgroundColorMobile[ 'footer-menu-a-bg-color-responsive' ].mobile }`,
		);
	} );
} );
