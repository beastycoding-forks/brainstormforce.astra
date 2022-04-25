import { createURL, activatePlugin } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
//import { wooProductPages } from '../../../../utils/woocommerce-pages';
import { importProducts } from '../../../../utils/wc-sample-data';
describe( 'setting shop archive width from customizer', () => {
	it( 'default width for shop archive should apply', async () => {
		await importProducts();
		//await wooProductPages();
		const shopArchiveWidth = {
			'shop-archive-width': 'custom',
			'shop-archive-max-width': 1240,
		};

		await setCustomize( shopArchiveWidth );
		await page.goto( createURL( 'shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-woo-shop-archive' );
		await expect( {
			selector: '.ast-woo-shop-archive',
			property: 'max-width',
		} ).cssValueToBe( `${ shopArchiveWidth[ 'shop-archive-max-width' ] + 'px' }` );
	} );
} );

