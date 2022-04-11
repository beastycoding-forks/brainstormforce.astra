import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../../utils/publish-post';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off canvas flyout header type settings in the customizer', () => {
	it( 'flyout inner element spacing should apply correctly', async () => {
		const flyoutSpacing = {
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
		await setCustomize( flyoutSpacing );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'sample-page' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'page', title: 'test-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-content > *' );
		await expect( {
			selector: '.ast-mobile-popup-content > *',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ flyoutSpacing[ 'off-canvas-inner-spacing' ] }` );
	} );
} );
