import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas header type and content alignment settings in the customizer', () => {
	it( 'off canvas header general setting should apply correctly', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'flex-start',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-left',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-start .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-start .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-start .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-start .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );
	it( 'off canvas header content alignment as center should apply correctly for mobile mode', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'center',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-center',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-center .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-center .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-center .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-center .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );
	it( 'off canvas header content alignment as Right apply correctly for mobile mode', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'flex-end',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-right',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-end .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-end .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-end .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-end .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );
} );
