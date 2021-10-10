import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Below footer border size setting in customizer', () => {
	it( 'top border size should apply correctly', async () => {
		const topborderSize = {
			'hbb-footer-separator': '50',

		};
		await setCustomize( topborderSize );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'border-top-width',
		} ).cssValueToBe( `${ topborderSize[ 'hbb-footer-separator' ] + 'px' }`,
		);
	} );
} );
