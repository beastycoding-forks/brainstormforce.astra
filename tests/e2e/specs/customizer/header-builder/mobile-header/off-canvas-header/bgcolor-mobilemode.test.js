import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off-Canvas header background color setting for mobile mode in the customizer', () => {
	it( 'header background color should apply correctly', async () => {
		const offCanvasColorMobileMode = {
			'mobile-header-type': 'full-width',
			'off-canvas-background': {
				'background-color': 'rgb(255, 242, 242)',
			},
		};
		await setCustomize( offCanvasColorMobileMode );

		await createNewPost( {
			postType: 'page',
			title: 'testing',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner',
			property: 'background-color',
		} ).cssValueToBe( `${ offCanvasColorMobileMode[ 'off-canvas-background' ][ 'background-color' ] }` );
	} );
} );
