import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Shop column setting for woocommerce from customizer', () => {
	it( 'should set column count for shop product', async () => {
		const shopColumns = {
			'inspector-input-control-0': 3,
		};
		await setCustomize( shopColumns );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce-page ul.products:not(.elementor-grid).columns-3' );
		await expect( {
			selector: '.woocommerce-page ul.products:not(.elementor-grid).columns-3',
			property: 'grid-template-columns',
		} ).cssValueToBe( `repeat(3,minmax(0,1fr))` );
	} );
} );
//responsive test case
