import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Above header height setting in customizer', () => {
	it( 'height should apply correctly', async () => {
		const aboveheaderHeight = {
			'hba-header-height': {
				desktop: 50,
				tablet: 40,
				mobile: 40,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},

		};
		await setCustomize( aboveheaderHeight );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'site-above-header-wrap' );
		await expect( {
			selector: 'site-above-header-wrap',
			property: 'min-height',
		} ).cssValueToBe( `${ aboveheaderHeight[ 'hba-header-height' ].desktop }${ aboveheaderHeight[ 'hba-header-height' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );

		await expect( {
			selector: '.ast-mobile-header-wrap .ast-above-header-bar',
			property: 'min-height',
		} ).cssValueToBe( `${ aboveheaderHeight[ 'hba-header-height' ].tablet }${ aboveheaderHeight[ 'hba-header-height' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );

		await expect( {
			selector: '.ast-mobile-header-wrap .ast-above-header-bar',
			property: 'min-height',
		} ).cssValueToBe( `${ aboveheaderHeight[ 'hba-header-height' ].mobile }${ aboveheaderHeight[ 'hba-header-height' ][ 'mobile-unit' ] }`,
		);
	} );
} );
