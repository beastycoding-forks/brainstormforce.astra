import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'social icons in the customizer', () => {
	it( 'icon radius should apply correctly', async () => {
		const socialIconRadius = {
			'footer-social-1-radius-fields': {
				desktop: {
					bottom: '20',
					left: '19',
					right: '18',
					top: '17',
				},
				tablet: {
					bottom: '15',
					left: '14',
					right: '13',
					top: '12',
				},
				mobile: {
					bottom: '10',
					left: '9',
					right: '8',
					top: '7',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconRadius );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].desktop.top }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].desktop.right }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].desktop.bottom }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].desktop.left }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].tablet.top }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].tablet.right }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].tablet.bottom }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].tablet.left }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].mobile.top }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].mobile.right }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].mobile.bottom }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius-fields' ].mobile.left }${ socialIconRadius[ 'footer-social-1-radius-fields' ][ 'mobile-unit' ] }` );
	} );
} );
