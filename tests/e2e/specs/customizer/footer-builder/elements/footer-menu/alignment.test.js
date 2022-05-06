import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Add footer menu alignment', () => {
	it( 'footer menu center alignment should be added properly', async () => {
		await createNewFooterMenu();
		//center alignment for desktop, tablet and mobile
		const footerMenuAlignment = {
			'footer-menu-alignment': {
				desktop: 'center',
				tablet: 'center',
				mobile: 'center',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].desktop }` );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].tablet }` );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].mobile }` );
	} );
	it( 'footer menu left alignment should be added properly', async () => {
		const footerMenuAlignment = {
			'footer-menu-alignment': {
				desktop: 'flex-start',
				tablet: 'flex-start',
				mobile: 'flex-start',
			},
		};
		await setCustomize( footerMenuAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].desktop }` );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].tablet }` );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].mobile }` );
	} );
	it( 'footer menu right alignment should be added properly', async () => {
		const footerMenuAlignment = {
			'footer-menu-alignment': {
				desktop: 'flex-end',
				tablet: 'flex-end',
				mobile: 'flex-end',
			},
		};
		await setCustomize( footerMenuAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].desktop }` );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].tablet }` );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].mobile }` );
	} );
} );
