import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../../utils/publish-post';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Off canvas flyout header type settings in the customizer', () => {
	it( 'flyout header alignment right for mobile should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'flex-end',
		};
		await setCustomize( flyoutAlignment );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'sample-page' } );
			await createNewPost( { postType: 'page', title: 'test-page' } );
			ppStatus = await publishPost();
		}
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

	it( 'flyout header alignment center for mobile should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'center',
		};
		await setCustomize( flyoutAlignment );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'sample-page' } );
			await createNewPost( { postType: 'page', title: 'test-page' } );
			ppStatus = await publishPost();
		}
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

	it( 'flyout header alignment left for mobile should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'flex-start',
		};
		await setCustomize( flyoutAlignment );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'sample-page' } );
			await createNewPost( { postType: 'page', title: 'test-page' } );
			ppStatus = await publishPost();
		}
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

	it( 'flyout header alignment right for tablet should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'flex-end',
		};
		await setCustomize( flyoutAlignment );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'sample-page' } );
			await createNewPost( { postType: 'page', title: 'test-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-end .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-end .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ flyoutAlignment[ 'header-offcanvas-content-alignment' ] }` );
	} );

	it( 'flyout header alignment center for tablet should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'center',
		};
		await setCustomize( flyoutAlignment );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'sample-page' } );
			await createNewPost( { postType: 'page', title: 'test-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-center .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-center .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ flyoutAlignment[ 'header-offcanvas-content-alignment' ] }` );
	} );

	it( 'flyout header alignment left for tablet should apply correctly', async () => {
		const flyoutAlignment = {
			'mobile-header-type': 'off-canvas',
			'header-offcanvas-content-alignment': 'flex-start',
		};
		await setCustomize( flyoutAlignment );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'sample-page' } );
			await createNewPost( { postType: 'page', title: 'test-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-start .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-start .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ flyoutAlignment[ 'header-offcanvas-content-alignment' ] }` );
	} );
} );
