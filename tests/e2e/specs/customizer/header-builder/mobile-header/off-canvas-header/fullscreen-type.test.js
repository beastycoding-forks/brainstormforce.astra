import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas full-screen header type and content alignment settings in the customizer', () => {
	it( 'off canvas header setting should apply correctly', async () => {
		const offCanvasHeader = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'center',
		};
		await setCustomize( offCanvasHeader );

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

		await page.waitForSelector( '.ast-builder-menu .main-navigation > ul' );
		await expect( {
			selector: '.ast-builder-menu .main-navigation > ul',
			property: 'align-self',
		} ).cssValueToBe( `${ offCanvasHeader[ 'header-offcanvas-content-alignment' ] }` );
	} );
} );
