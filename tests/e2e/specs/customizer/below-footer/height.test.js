import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Below footer height setting in customizer', () => {
	it( 'height should apply correctly', async () => {
		const BelowfooterHeight = {
			'hbb-footer-height': '200',
		};
		await setCustomize( BelowfooterHeight );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'min-height',
		} ).cssValueToBe( `${ BelowfooterHeight[ 'hbb-footer-height' ] + 'px' }`,
		);
	} );
} );
