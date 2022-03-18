import { createURL, activatePlugin, createNewPost, publishPost, trashAllPosts } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { wooProductPages } from '../../../../utils/product-pages';
describe( 'setting shop archive width from customizer', () => {
	beforeAll( async () => {
		await activatePlugin( 'woocommerce' );
		await trashAllPosts();
		await trashAllPosts( 'page' );
		await page.setDefaultNavigationTimeout( 10000 );
		//await page.setDefaultTimeout( 10000 );
	} );
	it( 'default width for shop archive should apply', async () => {
		const shopArchiveWidth = {
			'shop-archive-width': 'custom',
			'shop-archive-max-width': 1240,
		};

		await wooProductPages();
		await setCustomize( shopArchiveWidth );
		await page.goto( createURL( 'Shop' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-woo-shop-archive .site-content > .ast-container' );
		await expect( {
			selector: '.ast-woo-shop-archive .site-content > .ast-container',
			property: 'max-width',
		} ).cssValueToBe( `${ shopArchiveWidth[ 'shop-archive-max-width' ] + 'px' }` );
	} );
} );

