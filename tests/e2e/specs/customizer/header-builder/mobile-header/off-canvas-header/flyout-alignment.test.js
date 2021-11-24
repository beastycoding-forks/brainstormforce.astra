import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas flyout header type settings in the customizer', () => {
	it( 'flyout header alignment type should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'center',
		};
		await setCustomize( flyoutAlignment );
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
		await page.waitForSelector( '.ast-builder-menu .main-navigation > ul' );
		await expect( {
			selector: '.ast-builder-menu .main-navigation > ul',
			property: 'align-self',
		} ).cssValueToBe( `${ flyoutAlignment[ 'header-offcanvas-content-alignment' ] }` );
	} );
} );

