import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Below footer inner element layout setting in customizer', () => {
	it( 'stack layout should apply correctly', async () => {
		const innerelemetLayout = {
			'hbb-stack': {
				desktop: 'stack',
				tablet: 'stack',
				mobile: 'stack',
			},
		};
		await setCustomize( innerelemetLayout );
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

	it( 'inline layout should apply correctly', async () => {
		const innerelemetLayout = {
			'hbb-stack': {
				desktop: 'inline',
				tablet: 'inline',
				mobile: 'inline',
			},
		};
		await setCustomize( innerelemetLayout );
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
