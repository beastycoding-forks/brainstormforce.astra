import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Add footer menu spacing', () => {
	it( 'footer menu spacing should be added properly', async () => {
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
		const footerMenuSpacing = {
			'footer-main-menu-spacing': {
				desktop: {
					top: '100',
					right: '100',
					bottom: '100',
					left: '100',
				},
				'desktop-unit': 'px',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		//for tablet view
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		//for mobile view
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
	} );
} );
