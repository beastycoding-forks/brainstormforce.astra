import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { wooCommercePage } from '../../../../utils/product-page';
describe( 'enable cross sells on cart page', () => {
	it( 'cross sells should be disable on single product', async () => {
		const enablecrossSells = {
			'enable-cart-upsells': 1,
		};
		await setCustomize( enablecrossSells );
		await wooCommercePage();
		await page.goto( createURL( '/cart' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products' );
		const Cart = await page.$eval( '.woocommerce ul.products', ( element ) => element.getAttribute( 'cross-sells' ) );
		await expect( Cart ).toBeNull( );
	} );
} );
