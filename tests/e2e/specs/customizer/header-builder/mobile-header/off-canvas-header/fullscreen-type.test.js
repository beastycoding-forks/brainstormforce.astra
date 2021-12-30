import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas header type and content alignment settings in the customizer', () => {
	it( 'off canvas header align left for tablet should apply correctly', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'flex-start',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-left',
		} );
		await setBrowserViewport( 'medium' );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-start .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-start .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );
	it( 'off canvas header align left for mobile should apply correctly', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'flex-start',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-left',
		} );
		await setBrowserViewport( 'small' );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-start .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-start .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );

	it( 'off canvas header align center for tablet should apply correctly for mobile mode', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'center',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-center',
		} );
		await setBrowserViewport( 'medium' );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-center .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-center .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );
	it( 'off canvas header align center for mobile should apply correctly for mobile mode', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'center',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-center',
		} );
		await setBrowserViewport( 'small' );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-center .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-center .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );
	it( 'off canvas header align Right for tablet apply correctly for mobile mode', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'flex-end',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-right',
		} );
		await setBrowserViewport( 'medium' );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-end .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-end .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );
	it( 'off canvas header align Right for mobile apply correctly for mobile mode', async () => {
		const offCanvasGeneralSetting = {
			'mobile-header-type': 'full-width',
			'header-offcanvas-content-alignment': 'flex-end',
		};
		await setCustomize( offCanvasGeneralSetting );
		await createNewPost( {
			postType: 'page',
			title: 'align-right',
		} );
		await setBrowserViewport( 'small' );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.content-align-flex-end .ast-builder-layout-element' );
		await expect( {
			selector: '.content-align-flex-end .ast-builder-layout-element',
			property: 'justify-content',
		} ).cssValueToBe( `${ offCanvasGeneralSetting[ 'header-offcanvas-content-alignment' ] }` );
	} );
} );
