import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Sidebar setting for single product', () => {
	it( 'should set sidebar as a left', async () => {
		const wooSidebar = {
			'customize-control-astra-settings-site-sidebar-width': '30%',
			'customize-control-astra-settings-single-product-sidebar-layout': 'Left Sidebar',
		};
		await setCustomize( wooSidebar );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `${ wooSidebar[ 'customize-control-astra-settings-site-sidebar-width' ] }` );
	} );
	it( 'should set sidebar as a right', async () => {
		const wooSidebar = {
			'customize-control-astra-settings-site-sidebar-width': '40%',
			'customize-control-astra-settings-single-product-sidebar-layout': 'Right Sidebar',
		};
		await setCustomize( wooSidebar );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `${ wooSidebar[ 'customize-control-astra-settings-site-sidebar-width' ] }` );
	} );
	it( 'should set sidebar as a default', async () => {
		const wooSidebar = {
			'customize-control-astra-settings-site-sidebar-width': '45%',
			'customize-control-astra-settings-single-product-sidebar-layout': 'Default',
		};
		await setCustomize( wooSidebar );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `${ wooSidebar[ 'customize-control-astra-settings-site-sidebar-width' ] }` );
	} );
	it( 'should set sidebar as a no sidebar', async () => {
		const wooSidebar = {
			'customize-control-astra-settings-site-sidebar-width': '50%',
			'customize-control-astra-settings-single-product-sidebar-layout': 'No Sidebar',
		};
		await setCustomize( wooSidebar );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `${ wooSidebar[ 'customize-control-astra-settings-site-sidebar-width' ] }` );
	} );
} );
