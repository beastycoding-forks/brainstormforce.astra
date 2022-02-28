import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'html2 block settings in the customizer', () => {
	it( 'footer html2 link color for desktop should apply correctly', async () => {
		const html2LinkColor = {
			'footer-html-2': '<a href="https://wpastra.com/">HTML2 link color</a>',
			'footer-html-2link-color': {
				desktop: 'rgb(11, 82, 96)',
				tablet: 'rgb(119, 124, 3)',
				mobile: 'rgb(82, 27, 3)',	
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'html-2',

					},
				},
			},
			'footer-mobile-items': {
				primary: {
					primary_2: {
						0: 'html-2',

					},
				},
			},
		};
		await setCustomize( html2LinkColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.footer-widget-area[data-section="section-fb-html-2"] .ast-builder-html-element a' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-fb-html-2"] .ast-builder-html-element a',
			property: 'color',
		} ).cssValueToBe( `${ html2LinkColor[ 'footer-html-2link-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-fb-html-2"] .ast-builder-html-element a',
			property: 'color',
		} ).cssValueToBe( `${ html2LinkColor[ 'footer-html-2link-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.footer-widget-area[data-section="section-fb-html-2"] .ast-builder-html-element a',
			property: 'color',
		} ).cssValueToBe( `${ html2LinkColor[ 'footer-html-2link-color' ].mobile }` );
	} );
} );
