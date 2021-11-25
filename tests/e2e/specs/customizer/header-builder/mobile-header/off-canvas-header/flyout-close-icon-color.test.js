import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas flyout header type settings in the customizer', () => {
	it( 'flyout close icon color type should apply correctly', async () => {
		const closeiconColor = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-close-color': 'rgb(118, 29, 120 )',
		};
		await setCustomize( closeiconColor );
		await createNewPost( {
			postType: 'page',
			title: 'sample-page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'test-page',
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
		} ).cssValueToBe( `${ closeiconColor[ 'off-canvas-close-color' ] }` );
	} );
} );