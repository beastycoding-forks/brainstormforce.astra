import {
	createURL,
} from '@wordpress/e2e-test-utils';

import { setCustomize } from '../../../../utils/customize';

describe( 'Global typography H1 settings in the customizer', () => {
	it( 'heading 1 font family settings should be applied correctly', async () => {
		const enableNotice = {
			'_customize-input-woocommerce_demo_store': 'yes',

		};
		await setCustomize( enableNotice );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'p.demo_store, .woocommerce-store-notice' );
		await expect( {
			selector: 'p.demo_store, .woocommerce-store-notice h1',
			property: '',
		} ).cssValueToBe( `${ enableNotice.woocommerce_demo_store }` );
	} );
} );
