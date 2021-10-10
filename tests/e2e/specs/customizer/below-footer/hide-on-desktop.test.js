import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Below footer hide on desktop setting in customizer', () => {
	it( 'hide on desktop should apply correctly', async () => {
		const hideondesktop = {
			'section-below-footer-builder-hide-desktop': 'none',
		};
		await setCustomize( hideondesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );

		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `${ hideondesktop[ 'section-below-footer-builder-hide-desktop' ] }` );
	} );

	it( 'hide on tablet should apply correctly', async () => {
		const hideontablet = {
			'section-below-footer-builder-hide-tablet': 'none',
		};
		await setCustomize( hideontablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `${ hideontablet[ 'section-below-footer-builder-hide-tablet' ] }` );
	} );

	it( 'hide on mobile should apply correctly', async () => {
		const hideonmobile = {
			'section-below-footer-builder-hide-mobile': 'none',
		};
		await setCustomize( hideonmobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: ' .site-below-footer-wrap[data-section="section-below-footer-builder"] ',
			property: 'display',
		} ).cssValueToBe( `${ hideonmobile[ 'section-below-footer-builder-hide-mobile' ] }` );
	} );
} );
