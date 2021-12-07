import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas full-screen header type popup padding setting in the customizer', () => {
	it( 'padding should apply correctly', async () => {
		const innerElementSpace = {
			'mobile-header-type': 'full-width',
			'header-mobile-items': {
				popup: {
					popup_content: {
						0: 'account',
						1: 'social-icons-1',
					},
				},
			},
			'header-mobile-popup-items': {
				popup: {
					popup_content: {
						0: 'account',
						1: 'social-icons-1',
					},
				},
			},
			'off-canvas-inner-spacing': '40',
		};
		await setCustomize( innerElementSpace );
		await createNewPost( {
			postType: 'page',
			title: 'sample-page',
		} );
		await publishPost();
		// await createNewPost( {
		// 	postType: 'page',
		// 	title: 'test-page',
		// } );
		// await publishPost();
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
