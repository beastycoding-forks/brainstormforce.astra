import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../../utils/publish-post';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off canvas full-screen header type popup padding setting in the customizer', () => {
	it( 'padding should apply correctly', async () => {
		const innerElementSpace = {
			'header-mobile-items': {
				popup: {
					popup_content: {
						0: 'account',
						1: 'social-icons-1',
						2: 'search',
					},
				},
			},
			'off-canvas-inner-spacing': '9',
			'mobile-header-type': 'full-width',
		};
		await setCustomize( innerElementSpace );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( {
				postType: 'post',
				title: 'sample-page',
			} );
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
			property: 'padding-top',
		} ).cssValueToBe(
			`${ innerElementSpace[ 'off-canvas-inner-spacing' ] + 'px' }`,
		);
	} );
} );
