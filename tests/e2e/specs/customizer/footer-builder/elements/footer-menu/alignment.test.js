import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer menu settings in the customizer', () => {
	it( 'footer menu left alignment should apply correctly', async () => {
		await createNewFooterMenu();
		const footerMenuAlignment = {
			'footer-menu-alignment': {
				desktop: 'flex-start',
				tablet: 'center',
				mobile: 'flex-end',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu#astra-footer-menu' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu#astra-footer-menu' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].desktop }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu#astra-footer-menu' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-footer-menu"] .astra-footer-horizontal-menu',
			property: 'justify-content',
		} ).cssValueToBe( `${ footerMenuAlignment[ 'footer-menu-alignment' ].desktop }` );
	} );
} );