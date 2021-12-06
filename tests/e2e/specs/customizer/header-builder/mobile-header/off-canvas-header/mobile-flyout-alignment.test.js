import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas flyout header type settings in the customizer', () => {
	it( 'flyout header alignment right type should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'flex-end',
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
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-end .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-end .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ flyoutAlignment[ 'header-offcanvas-content-alignment' ] }` );
	} );

	it( 'flyout header alignment center type should apply correctly', async () => {
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
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-center .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-center .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ flyoutAlignment[ 'header-offcanvas-content-alignment' ] }` );
	} );

	it( 'flyout header alignment left type should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'flex-start',
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
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-start .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-start .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ flyoutAlignment[ 'header-offcanvas-content-alignment' ] }` );
	} );

} );