import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off-Canvas header background color setting in the customizer', () => {
	it( 'header background color for Off-Canvas should apply correctly', async () => {
		const offCanvasColor = {
			'mobile-header-type': 'full-width',
			'off-canvas-background': {
				'background-color': 'rgb(248, 248, 248)',
			},
		};
		await setCustomize( offCanvasColor );

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
		} ).cssValueToBe( `${ offCanvasColor[ 'off-canvas-background' ][ 'background-color' ] }` );
	} );
} );
