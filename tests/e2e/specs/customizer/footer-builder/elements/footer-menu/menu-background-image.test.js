import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer menu background image settings in the customizer', () => {
	it( 'footer menu backgeound image should apply correctly', async () => {
		await createNewFooterMenu();
		const footerMenuBackgroundImage = {
			'footer-menu-bg-obj-responsive': {
				desktop: {
					'background-color': 'https://pd.w.org/2022/03/3146230b053848c21.81950886-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/3146230b053848c21.81950886-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-color': 'https://pd.w.org/2022/03/6462309002a5de46.79671062-300x200.jpg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				'footer-desktop-items': {
					primary: {
						primary_2: {
							0: 'menu',
						},
					},
				},
			},
		};
		await setCustomize( footerMenuBackgroundImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe( `url("${ footerMenuBackgroundImage[ 'footer-menu-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe( `url("${ footerMenuBackgroundImage[ 'footer-menu-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'background-color',
		} ).cssValueToBe( `url("${ footerMenuBackgroundImage[ 'footer-menu-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }` );
	} );
} );
