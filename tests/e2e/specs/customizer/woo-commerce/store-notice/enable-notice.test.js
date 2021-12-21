import {
	createURL, createNewPost, publishPost,
} from '@wordpress/e2e-test-utils';

import { setCustomize } from '../../../../utils/customize';

describe( 'enable store notice of woo commerce', () => {
	it( 'store notice should be enable', async () => {
		const enableNotice = {
			woocommerce_demo_store: '',

		};
		await setCustomize( enableNotice );
		await createNewPost( { postType: 'page', title: 'storenotice' } );
		await publishPost();
		await page.goto( createURL( 'storenotice' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'p.demo_store, .woocommerce-store-notice' );

		await expect( {
			selector: 'p.demo_store, .woocommerce-store-notice',
			property: 'position',
		} ).cssValueToBe( `${ 'woocommerce_demo_store' }` );
	} );
} );
