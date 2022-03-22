import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Category display setting under the customizer', () => {
	it( 'should set the Category display a show products', async () => {
		const categoryDisplay = {
			'_customize-input-woocommerce_shop_page_display': 'Show categories & products',
			'_customize-input-woocommerce_category_archive_display': 'Show products',
		};
		await setCustomize( categoryDisplay );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.product-category>a' );
		await expect( {
			selector: '.product-category>a',
			property: 'display',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should set the category display as Show subcategories', async () => {
		const categoryDisplay = {
			'_customize-input-woocommerce_shop_page_display': 'Show categories & products',
			'_customize-input-woocommerce_category_archive_display': 'Show subcategories',
		};
		await setCustomize( categoryDisplay );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products' );
		await expect( {
			selector: '.woocommerce ul.products',
			property: 'display',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should set the category display as Show subcategories & products', async () => {
		const categoryDisplay = {
			'_customize-input-woocommerce_shop_page_display': 'Show categories & products',
			'_customize-input-woocommerce_category_archive_display': 'Show subcategories & products',
		};
		await setCustomize( categoryDisplay );
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
