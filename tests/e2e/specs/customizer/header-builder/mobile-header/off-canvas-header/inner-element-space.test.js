import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { createSubmenu } from '../../../../../utils/create-menu';
describe( 'Off canvas full-screen header type popup padding setting in the customizer', () => {
	it( 'padding should apply correctly', async () => {
		const innerElementSpace = {
			'header-mobile-items': {
				popup: {
					popup_content: {
						0: 'mobile-menu',
						1: 'button-1',
						2: 'search',
					},
				},
				primary: {
					primary_right: {
						0: 'mobile-trigger',
					},
				},
			},
			'off-canvas-inner-spacing': 9,
			'mobile-header-type': 'full-width',
		};
		await setCustomize( innerElementSpace );
		await createSubmenu();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-content > *' );
		await expect( {
			selector: '.ast-mobile-popup-content > *',
			property: 'padding-bottom',
		} ).cssValueToBe(
			`${ innerElementSpace[ 'off-canvas-inner-spacing' ] + 'px' }`,
		);
	} );
} );
