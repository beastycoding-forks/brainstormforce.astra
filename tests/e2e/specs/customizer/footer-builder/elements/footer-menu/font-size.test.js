import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer builder footer menu option in the customizer', () => {
	it( 'footer menu font size should apply correctly', async () => {
		await createNewFooterMenu();
		const footerMenuFontSize = {
			'footer-menu-font-size': {
				desktop: 30,
				tablet: 20,
				mobile: 15,
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
		await setCustomize( footerMenuFontSize );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'font-size',
		} ).cssValueToBe( `${ footerMenuFontSize[ 'footer-menu-font-size' ].desktop }${ footerMenuFontSize[ 'footer-menu-font-size' ][ 'desktop-unit' ] }` );
	} );
} );
