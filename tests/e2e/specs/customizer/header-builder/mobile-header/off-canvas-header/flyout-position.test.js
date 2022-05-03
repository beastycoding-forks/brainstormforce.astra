import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../../utils/publish-post';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off canvas flyout header type settings in the customizer', () => {
	it( 'flyout position for tablet should apply correctly', async () => {
		const flyoutPosition = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-slide': 'left',
		};
		await setCustomize( flyoutPosition );
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
		await page.waitForSelector( '.ast-mobile-popup-drawer.ast-mobile-popup-left .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.ast-mobile-popup-left .ast-mobile-popup-inner',
			property: 'left',
		} ).cssValueToBe( '0px' );
	} );

	it( 'flyout position for mobile should apply correctly', async () => {
		const flyoutPosition = {
			'mobile-header-type': 'off-canvas',
			'off-canvas-slide': 'left',
		};
		await setCustomize( flyoutPosition );
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
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-mobile-popup-drawer.ast-mobile-popup-left .ast-mobile-popup-inner' );
		await expect( {
			selector: '.ast-mobile-popup-drawer.ast-mobile-popup-left .ast-mobile-popup-inner',
			property: 'left',
		} ).cssValueToBe( '0px' );
	} );
} );
