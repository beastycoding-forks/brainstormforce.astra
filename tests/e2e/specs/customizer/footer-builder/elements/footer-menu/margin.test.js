import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { createNewFooterMenu } from '../../../../../utils/create-footer-menu';
describe( 'Footer builder footer menu option in the customizer', () => {
	it( 'footer menu margin should apply correctly', async () => {
		await createNewFooterMenu();
		const footerMenuMargin = {
			'section-footer-menu-margin': {
				desktop: {
					top: '80',
					right: '80',
					bottom: '80',
					left: '80',
				},
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				mobile: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
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
		await setCustomize( footerMenuMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].desktop.top }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].desktop.right }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].desktop.bottom }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].desktop.left }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].tablet.top }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].tablet.right }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].tablet.bottom }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].tablet.left }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#astra-footer-menu' );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].mobile.top }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].mobile.right }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].mobile.bottom }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '#astra-footer-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ footerMenuMargin[ 'section-footer-menu-margin' ].mobile.left }${ footerMenuMargin[ 'section-footer-menu-margin' ][ 'mobile-unit' ] }` );
	} );
} );
