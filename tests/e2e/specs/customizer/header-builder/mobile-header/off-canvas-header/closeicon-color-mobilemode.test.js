import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off-Canvas header close icon color setting for mobile in the customizer', () => {
	it( 'close icon color for Off-Canvas header should apply correctly', async () => {
		const closeIconColorMobileMode = {
			'mobile-header-type': 'full-width',
			'off-canvas-close-color': 'rgb(204, 4, 14)',

		};
		await setCustomize( closeIconColorMobileMode );

		await createNewPost( {
			postType: 'page',
			title: 'sample-page',
		} );
		await publishPost();

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .menu-toggle-close' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .menu-toggle-close',
			property: 'color',
		} ).cssValueToBe( `${ closeIconColorMobileMode[ 'off-canvas-close-color' ] }` );
	} );
} );
