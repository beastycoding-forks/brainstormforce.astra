import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Below footer width setting in customizer', () => {
	it( 'full width should apply correctly', async () => {
		const BelowfooterWidth = {
			'hbb-footer-layout-width': 'full',
		};
		await setCustomize( BelowfooterWidth );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( '.site-below-footer-wrap' );
		await expect( {
			selector: '.site-below-footer-wrap',
			property: '',
		} ).cssValueToBe( ``,
		);
	} );

	it( 'content width should apply correctly', async () => {
		const BelowfooterWidth = {
			'hbb-footer-layout-width': 'content',
		};
		await setCustomize( BelowfooterWidth );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( '.site-below-footer-wrap' );
		await expect( {
			selector: '.site-below-footer-wrap',
			property: '',
		} ).cssValueToBe( ``,
		);
	} );
} );
