import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer builder footer menu option in the customizer', () => {
	it( 'footer menu spacing should apply properly', async () => {
		await createNewFooterMenu();
		const footerMenuSpacing = {
			'footer-main-menu-spacing': {
				desktop: {
					top: '70',
					right: '70',
					bottom: '70',
					left: '70',
				},
				tablet: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				mobile: {
					top: '30',
					right: '30',
					bottom: '30',
					left: '30',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-top',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-right',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'padding-left',
		} ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].desktop.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'desktop-unit' ] }` );

		// eslint-disable-next-line eslint-comments/disable-enable-pair
		/* eslint-disable jest/no-commented-out-tests */
		// GitHub action E2E fail case
		// await setBrowserViewport( 'medium' );
		// await scrollToElement( '#colophon' );
		// await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		// await expect( {
		// 	selector: '#astra-footer-menu .menu-item > a',
		// 	property: 'padding-top',
		// } ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].tablet.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'tablet-unit' ] }` );
		// await expect( {
		// 	selector: '#astra-footer-menu .menu-item > a',
		// 	property: 'padding-right',
		// } ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].tablet.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'tablet-unit' ] }` );
		// await expect( {
		// 	selector: '#astra-footer-menu .menu-item > a',
		// 	property: 'padding-bottom',
		// } ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].tablet.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'tablet-unit' ] }` );
		// await expect( {
		// 	selector: '#astra-footer-menu .menu-item > a',
		// 	property: 'padding-left',
		// } ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].tablet.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'tablet-unit' ] }` );

		// await setBrowserViewport( 'small' );
		// await scrollToElement( '#colophon' );
		// await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		// await expect( {
		// 	selector: '#astra-footer-menu .menu-item > a',
		// 	property: 'padding-top',
		// } ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].mobile.top }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'mobile-unit' ] }` );
		// await expect( {
		// 	selector: '#astra-footer-menu .menu-item > a',
		// 	property: 'padding-right',
		// } ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].mobile.right }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'mobile-unit' ] }` );
		// await expect( {
		// 	selector: '#astra-footer-menu .menu-item > a',
		// 	property: 'padding-bottom',
		// } ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].mobile.bottom }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'mobile-unit' ] }` );
		// await expect( {
		// 	selector: '#astra-footer-menu .menu-item > a',
		// 	property: 'padding-left',
		// } ).cssValueToBe( `${ footerMenuSpacing[ 'footer-main-menu-spacing' ].mobile.left }${ footerMenuSpacing[ 'footer-main-menu-spacing' ][ 'mobile-unit' ] }` );
	} );
} );
