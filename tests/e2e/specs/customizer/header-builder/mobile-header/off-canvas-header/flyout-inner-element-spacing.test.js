import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas flyout header type settings in the customizer', () => {
	it( 'flyout inner element spacing should apply correctly', async () => {
		const flyoutPSpacing = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-inner-spacing': 20,
			'header-mobile-popup-items': {
				popup: {
					popup_content: {
						0: 'button-1',
					},
				},
			},
		};
		await setCustomize( flyoutPSpacing );
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
		await page.waitForSelector( '.ast-mobile-header-content' );
		await expect( {
			selector: '.ast-mobile-header-content',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ flyoutPSpacing[ 'off-canvas-inner-spacing' ] }` );
	} );
} );
