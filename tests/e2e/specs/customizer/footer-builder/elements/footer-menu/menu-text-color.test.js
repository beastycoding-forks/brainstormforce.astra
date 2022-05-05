import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer builder footer menu option in the customizer', () => {
	it( 'footer menu spacing should apply properly', async () => {
		await createNewFooterMenu();
		const footerMenuTextColor = {
			'footer-menu-color-responsive': {
				desktop: 'rgb(126, 3, 145)',
				tablet: 'rgb(100, 54, 2)',
				mobile: 'rgb(144, 5, 23)',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuTextColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu .menu-item > a' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'color',
		} ).cssValueToBe( `${ footerMenuTextColor[ 'footer-menu-color-responsive' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'color',
		} ).cssValueToBe( `${ footerMenuTextColor[ 'footer-menu-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu .menu-item > a',
			property: 'color',
		} ).cssValueToBe( `${ footerMenuTextColor[ 'footer-menu-color-responsive' ].mobile }` );
	} );
} );