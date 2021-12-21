import {
	createURL, createNewPost, publishPost,
} from '@wordpress/e2e-test-utils';

import { setCustomize } from '../../../../utils/customize';

describe( 'Global typography H1 settings in the customizer', () => {
	it( 'heading 1 font family settings should be applied correctly', async () => {
		const enableNotice = {
			woocommerce_demo_store: 'yes',

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
