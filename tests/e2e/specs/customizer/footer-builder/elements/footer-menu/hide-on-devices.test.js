import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer menu hide on devices setting in customizer', () => {
	it( 'should be hide on desktop mode', async () => {
		await createNewFooterMenu();
		const hideOnDesktop = {
			'section-footer-menu-hide-desktop': 1,
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( hideOnDesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.footer-widget-area[data-section="section-footer-menu"]' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'should hide on tablet', async () => {
		await createNewFooterMenu();
		const hideOnTablet = {
			'section-footer-menu-hide-tablet': 1,
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( hideOnTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-header-break-point .footer-widget-area[data-section="section-footer-menu"]' );
		await expect( {
			selector: '.ast-header-break-point .footer-widget-area[data-section="section-footer-menu"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'should hide on mobile', async () => {
		await createNewFooterMenu();
		const hideOnMobile = {
			'section-footer-menu-hide-mobile': 1,
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( hideOnMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-header-break-point .footer-widget-area[data-section="section-footer-menu"]' );
		await expect( {
			selector: '.ast-header-break-point .footer-widget-area[data-section="section-footer-menu"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );
} );
