import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off-Canvas header close icon color setting in the customizer', () => {
	it( 'close icon color for Off-Canvas header should apply correctly', async () => {
		const closeIconColor = {
			'mobile-header-type': 'full-width',
			'off-canvas-close-color': 'rgb(173, 0, 0)',

		};
		await setCustomize( closeIconColor );

		await createNewPost( {
			postType: 'page',
			title: 'sample-page',
		} );
		await publishPost();

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .menu-toggle-close' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .menu-toggle-close',
			property: 'color',
		} ).cssValueToBe( `${ closeIconColor[ 'off-canvas-close-color' ] }` );
	} );
} );
