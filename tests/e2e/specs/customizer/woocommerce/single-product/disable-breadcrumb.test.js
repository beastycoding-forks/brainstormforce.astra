import {
	createURL,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { wooCommercePage } from '../../../../utils/product-page';
describe( 'disable breadcrumb on single product page', () => {
	it( 'breadcrumb should be disable on single product page', async () => {
		const disableBreadcrumbs = {
			'single-product-breadcrumb-disable': 1,
		};
		await setCustomize( disableBreadcrumbs );
		await wooCommercePage();
		await page.goto( createURL( '/product/album' ), {
			waitUntil: 'networkidle0',
		} );
		const breadcrumbClassPresent = await page.evaluate( () => {
			return !! document.querySelector( '.woocommerce-breadcrumb' ); // !! converts anything to boolean
		} );
		if ( breadcrumbClassPresent ) { 
			console.log( 'Ture' );
		} else {
			console.log( 'False' );
		}
		await expect( breadcrumbClassPresent ).toBe( 'false' );
	} );
} );
