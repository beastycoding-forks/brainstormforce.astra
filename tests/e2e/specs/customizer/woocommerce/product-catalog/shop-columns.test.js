import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { productpage } from '../../../../utils/product-pages';
describe( 'setting shop archive width from customizer', () => {
	it( 'default width for shop archive should apply', async () => {
		const shopColumns = {
			'shop-grids': {
				desktop: 3,
				tablet: 3,
				mobile: 2,
			},
		};
		await setCustomize( shopColumns );
		await productpage();
		await page.goto( createURL( '/shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.woocommerce ul.products.columns-3, .woocommerce-page ul.products.columns-3' );
		await expect( {
			selector: '.woocommerce ul.products.columns-3, .woocommerce-page ul.products.columns-3',
			property: 'grid-template-columns',
		} ).cssValueToBe(
			`${ shopColumns[ 'shop-grids' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.woocommerce ul.products.columns-3, .woocommerce-page ul.products.columns-3',
			property: 'grid-template-columns',
		} ).cssValueToBe(
			`${ shopColumns[ 'shop-grids' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.woocommerce ul.products.columns-3, .woocommerce-page ul.products.columns-3',
			property: 'grid-template-columns',
		} ).cssValueToBe(
			`${ shopColumns[ 'shop-grids' ].mobile }` );
	} );
} );
