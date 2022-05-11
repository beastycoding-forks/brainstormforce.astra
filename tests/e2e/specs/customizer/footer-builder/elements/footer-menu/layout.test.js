import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer builder footer menu option in the customizer', () => {
	it( 'footer menu stack layout should apply properly', async () => {
		await createNewFooterMenu();
		const footerMenuLayout = {
			'footer-menu-layout': {
				desktop: 'vertical',
				tablet: 'vertical',
				mobile: 'vertical',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuLayout );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.footer-nav-wrap .astra-footer-vertical-menu' );
		await expect( {
			selector: '.footer-nav-wrap .astra-footer-vertical-menu',
			property: 'display',
		} ).cssValueToBe( `grid` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.footer-nav-wrap .astra-footer-vertical-menu' );
		await expect( {
			selector: '.footer-nav-wrap .astra-footer-vertical-menu',
			property: 'display',
		} ).cssValueToBe( `grid` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.footer-nav-wrap .astra-footer-vertical-menu' );
		await expect( {
			selector: '.footer-nav-wrap .astra-footer-vertical-menu',
			property: 'display',
		} ).cssValueToBe( `grid` );
	} );

	it( 'footer menu inline layout should apply properly', async () => {
		await createNewFooterMenu();
		const footerMenuLayout = {
			'footer-menu-layout': {
				desktop: 'horizontal',
				tablet: 'horizontal',
				mobile: 'horizontal',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuLayout );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-flex' );
		await expect( {
			selector: '.ast-flex',
			property: 'display',
		} ).cssValueToBe( `flex` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-flex' );
		await expect( {
			selector: '.ast-flex',
			property: 'display',
		} ).cssValueToBe( `flex` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-flex' );
		await expect( {
			selector: '.ast-flex',
			property: 'display',
		} ).cssValueToBe( `flex` );
	} );
} );
