import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas header background color and close icon color settings in the customizer', () => {
	it( 'color setting for Off canvas should apply correctly', async () => {
		const offcanvasColor = {
			'mobile-header-type': 'full-width',
			'off-canvas-background': {
				'background-color': 'rgb(234, 238, 180)',
			},
		};
		await setCustomize( offcanvasColor );

		await createNewPost( {
			postType: 'page',
			title: 'sample-page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'QA',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.active .ast-mobile-popup-inner',
			property: 'background-color',
		} ).cssValueToBe( `${ offcanvasColor[ 'off-canvas-background' ][ 'background-color' ] }` );
	} );
} );
