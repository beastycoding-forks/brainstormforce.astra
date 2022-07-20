import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/footer-menu';
describe( 'Footer menu background color settings in the customizer', () => {
	it( 'footer menu background color should apply correctly', async () => {
		await createNewFooterMenu();
		const footerMenuBackgroundColor = {
			'footer-menu-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(75, 79, 88)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'color',
				},
				tablet: {
					'background-color': 'rgb(255, 249, 239)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'color',
				},
				mobile: {
					'background-color': 'rgb(249, 240, 255)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'color',
				},
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'menu',
					},
				},
			},
		};
		await setCustomize( footerMenuBackgroundColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ footerMenuBackgroundColor[ 'footer-menu-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ footerMenuBackgroundColor[ 'footer-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ footerMenuBackgroundColor[ 'footer-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
