import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Product per page display setting from customizer', () => {
	it( 'should set number of product to be displayed on pages', async () => {
		const productPerPage = {
			'customize-control-default-input-73': 3,
		};
		await setCustomize( productPerPage );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products:not(.elementor-grid).columns-3' );
		await expect( {
			selector: '.woocommerce ul.products:not(.elementor-grid).columns-3',
			property: 'grid-template-columns',
		} ).cssValueToBe( `repeat(3,minmax(0,1fr))` );
	} );
} );
//responsive test case
