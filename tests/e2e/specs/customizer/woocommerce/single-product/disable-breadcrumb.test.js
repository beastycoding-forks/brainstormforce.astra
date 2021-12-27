// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { wooCommercePage } from '../../../../utils/product-page';
describe( 'disable breadcrumb on single product page', () => {
	it( 'breadcrumb should be disable on single product', async () => {
		const disableBreadcrumb = {
			'single-product-breadcrumb-disable': 1,
		};
		let loadClass = null;
		await setCustomize( disableBreadcrumb );
		await wooCommercePage();
		await page.goto( createURL( '/product/album' ), {
			waitUntil: 'networkidle0',
		} );
		const breadcrumbClass = await page.evaluate( () => {
			// !! converts to boolean value
			return !! document.querySelector( '.woocommerce-breadcrumb' );
		} );
		if ( breadcrumbClass ) {
			console.log( loadClass );
		} else {
			loadClass = 'Breadcrumb_Disabled';
		}
		console.log( loadClass );
		await expect( loadClass ).toBe( 'Breadcrumb_Disabled' );
	} );
	it( 'breadcrumb should be enabled on single product', async () => {
		const enableBreadcrumb = {
			'single-product-breadcrumb-disable': 0,
		};
		let loadClass = null;
		await setCustomize( enableBreadcrumb );
		await page.goto( createURL( '/product/album' ), {
			waitUntil: 'networkidle0',
		} );
		const breadcrumbClass = await page.evaluate( () => {
			// !! converts to boolean value
			return !! document.querySelector( '.woocommerce-breadcrumb' );
		} );
		if ( breadcrumbClass ) {
			loadClass = 'Breadcrumb_Enabled';
		} else {
			console.log( loadClass );
		}
		console.log( loadClass );
		await expect( loadClass ).toBe( 'Breadcrumb_Enabled' );
	} );
} );
