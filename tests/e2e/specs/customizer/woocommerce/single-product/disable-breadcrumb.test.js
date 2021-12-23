/* eslint-disable no-console */
import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { wooCommercePage } from '../../../../utils/product-page';
describe( 'disable breadcrumb on single product page', () => {
	it( 'breadcrumb should be disable on single product', async () => {
		const disableBreadcrumb = {
			'single-product-breadcrumb-disable': 1,
		};
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
			console.log( 'True' );
		} else {
			console.log( 'False' );
		}
		await expect( breadcrumbClass ).toBe( false );
	} );
	it( 'breadcrumb should be enabled on single product', async () => {
		const enableBreadcrumb = {
			'single-product-breadcrumb-disable': 0,
		};
		await setCustomize( enableBreadcrumb );
		await page.goto( createURL( '/product/album' ), {
			waitUntil: 'networkidle0',
		} );
		const breadcrumbClass = await page.evaluate( () => {
			// !! converts to boolean value
			return !! document.querySelector( '.woocommerce-breadcrumb' );
		} );
		if ( breadcrumbClass ) {
			// eslint-disable-next-line no-console
			console.log( 'True' );
		} else {
			console.log( 'False' );
		}
		await expect( breadcrumbClass ).toBe( true );
	} );
} );
