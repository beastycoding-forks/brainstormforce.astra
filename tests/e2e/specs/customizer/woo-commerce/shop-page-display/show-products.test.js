import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Shop page display etting under the customizer', () => {
	it( 'should set the shop pages display', async () => {
		const shopPageDisplay = {
			'_customize-input-woocommerce_shop_page_display': 'Show categories',
		};
		await setCustomize( shopPageDisplay );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.product-category>a' );
		await expect( {
			selector: '.product-category>a',
			property: 'display',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should set the shop pages display as show products', async () => {
		const shopPageDisplay = {
			'_customize-input-woocommerce_shop_page_display': 'Show products',
		};
		await setCustomize( shopPageDisplay );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products' );
		await expect( {
			selector: '.woocommerce ul.products',
			property: 'display',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should set the shop pages display as show categories & products', async () => {
		const shopPageDisplay = {
			'_customize-input-woocommerce_shop_page_display': 'Show categories & products',
		};
		await setCustomize( shopPageDisplay );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products' );
		await expect( {
			selector: '.woocommerce ul.products',
			property: 'list-style',
		} ).cssValueToBe( `inline-block` );
	} );
} );
