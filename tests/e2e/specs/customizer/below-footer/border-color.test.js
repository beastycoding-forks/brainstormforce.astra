import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../utils/scroll-to-element';

describe( 'Below footer border top color setting in customizer', () => {
	it( 'border top color should apply correctly', async () => {
		const topborderColor = {
			'hbb-footer-top-border-color': 'rgb(75, 79, 88)',
		};
		await setCustomize( topborderColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await setBrowserViewport( 'large' );

		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'border-top-color',
		} ).cssValueToBe( `${ topborderColor[ 'hbb-footer-top-border-color' ] }`,
		);
	} );
} );
