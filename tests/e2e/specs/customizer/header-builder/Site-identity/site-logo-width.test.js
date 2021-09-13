import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/set-customize';

describe( 'Site Logo width settings in the customizer', () => {
	it( 'site logo width should apply corectly', async () => {
		const siteLogo = {
			'site-logo-responsive': {
				desktop: '102',
				tablet: '',
				mobile: '',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			}
		};

		await setCustomize( siteLogo );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( 'header .custom-logo-link img' );

		await expect( {
			selector: 'header .custom-logo-link img',
			property: 'max-width',
		} ).cssValueToBe(
			`${ siteLogo[ 'site-logo-responsive' ].desktop }${ siteLogo[ 'site-logo-responsive' ].desktop[ 'desktop-unit' ] }`
		)

	} );
} );
