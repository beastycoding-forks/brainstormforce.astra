import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
//import { wooCommercePage } from '../../../../utils/product-pages';
describe( 'Enable store notice for WooCommmerce', () => {
	it( 'should be enablethe store notice on page', async () => {
		const enableStoreNotice = {
			'customize-control-woocommerce_demo_store': 'true',

		};
		//await wooCommercePage();
		await setCustomize( enableStoreNotice );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.demo_store' );
		await expect( {
			selector: '.demo_store',
			property: '',
		} ).cssValueToBe( `` );
		//} ).cssValueToBe( `${ enableStoreNotice[ 'shop-archive-max-width' ] + 'px' }` );
	} );
} );
