import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Add footer menu spacing', () => {
	it( 'footer menu spacing should be added properly', async () => {
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
		await createNewPost( {
			postType: 'page',
			title: 'footer Page',
		} );
		await publishPost();
		await setCustomize( footerMenuSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }`,
		);
	} );
	it( 'footer menu spacing for tablet should be added properly', async () => {
		const footerMenuSpacing = {
			'footer-main-menu-spacing': {
				tablet: {
					top: '100',
					right: '100',
					bottom: '100',
					left: '100',
				},
				'tablet-unit': 'px',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'menu',
					},
				},
			},
		};
		await createNewPost( {
			postType: 'page',
			title: 'footer Page',
		} );
		await publishPost();
		await setCustomize( footerMenuSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].tablet.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].tablet.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].tablet.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].tablet.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'tablet-unit' ] }`,
		);
	} );
	it( 'footer menu spacing for mobile should be added properly', async () => {
		const footerMenuSpacing = {
			'footer-main-menu-spacing': {
				mobile: {
					top: '100',
					right: '100',
					bottom: '100',
					left: '100',
				},
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
		await createNewPost( {
			postType: 'page',
			title: 'footer Page',
		} );
		await publishPost();
		await setCustomize( footerMenuSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].mobile.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].mobile.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].mobile.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].mobile.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'mobile-unit' ] }`,
		);
	} );
} );
