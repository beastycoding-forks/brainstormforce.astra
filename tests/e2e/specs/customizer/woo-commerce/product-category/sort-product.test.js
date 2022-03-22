import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Sort the products by multiple options from customizer', () => {
	it( 'should sort the product by default', async () => {
		const sortProduct = {
			'_customize-input-woocommerce_default_catalog_orderby': 'Default sorting (custom ordering + name)',
		};
		await setCustomize( sortProduct );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.product-category>a' );
		await expect( {
			selector: '.product-category>a',
			property: 'display',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should sort the product by popularity', async () => {
		const sortProduct = {
			'_customize-input-woocommerce_default_catalog_orderby': 'Popularity (sales)',
		};
		await setCustomize( sortProduct );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products' );
		await expect( {
			selector: '.woocommerce ul.products',
			property: 'display',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should sort the product by average rating', async () => {
		const sortProduct = {
			'_customize-input-woocommerce_default_catalog_orderby': 'Average rating',
		};
		await setCustomize( sortProduct );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products' );
		await expect( {
			selector: '.woocommerce ul.products',
			property: 'list-style',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should sort the product by most recent', async () => {
		const sortProduct = {
			'_customize-input-woocommerce_default_catalog_orderby': 'Sort by most recent',
		};
		await setCustomize( sortProduct );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products' );
		await expect( {
			selector: '.woocommerce ul.products',
			property: 'list-style',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should sort the product by ascending order', async () => {
		const sortProduct = {
			'_customize-input-woocommerce_default_catalog_orderby': 'Sort by price (asc)',
		};
		await setCustomize( sortProduct );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products' );
		await expect( {
			selector: '.woocommerce ul.products',
			property: 'list-style',
		} ).cssValueToBe( `inline-block` );
	} );
	it( 'should sort the product by descending order', async () => {
		const sortProduct = {
			'_customize-input-woocommerce_default_catalog_orderby': 'Sort by price (desc)',
		};
		await setCustomize( sortProduct );
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
