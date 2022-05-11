import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer menu background gradient settings in the customizer', () => {
	it( 'footer menu backgeound gradient should apply correctly', async () => {
		await createNewFooterMenu();
		const footerMenuBackgroundgradient = {
			'footer-menu-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(114, 192, 121) 46%, rgb(155, 81, 224) 100%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(189, 48, 135) 41%, rgb(155, 81, 224) 53%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 33%, rgb(168, 224, 81) 73%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
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
		await setCustomize( footerMenuBackgroundgradient );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ footerMenuBackgroundgradient[ 'footer-menu-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ footerMenuBackgroundgradient[ 'footer-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ footerMenuBackgroundgradient[ 'footer-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
