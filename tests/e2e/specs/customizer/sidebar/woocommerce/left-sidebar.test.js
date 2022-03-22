import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Sidebar setting for WooCommerce', () => {
	it( 'should set sidebar as a left for WooCommerce', async () => {
		const wooSidebar = {
			'customize-control-astra-settings-site-sidebar-width': '30%',
			'customize-control-astra-settings-woocommerce-sidebar-layout': 'Left Sidebar',
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
	it( 'should set sidebar as a right for WooCommerce', async () => {
		const wooSidebar = {
			'customize-control-astra-settings-site-sidebar-width': '40%',
			'customize-control-astra-settings-woocommerce-sidebar-layout': 'Right Sidebar',
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
	it( 'should set sidebar as a default for WooCommerce', async () => {
		const wooSidebar = {
			'customize-control-astra-settings-site-sidebar-width': '45%',
			'customize-control-astra-settings-woocommerce-sidebar-layout': 'Default',
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
			'customize-control-astra-settings-woocommerce-sidebar-layout': 'No Sidebar',
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
