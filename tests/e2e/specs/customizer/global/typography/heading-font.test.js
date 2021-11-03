import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
describe( 'Global Typography settings in the customizer', () => {
	it( 'body typography should be applied correctly', async () => {
		const headingFontSize = {
			'font-size-h1': {
				desktop: '50',
				tablet: '30',
				mobile: '20',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},

		};

		await setCustomize( headingFontSize );

		await expect( {
			selector: '.site-header .site-description',
			property: 'font-size',
		} ).cssValueToBe(
			`${ headingFontSize[ 'font-size-h1' ].desktop }${ headingFontSize[ 'font-size-h1' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );

		await expect( {
			selector: '.site-header .site-description',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h1' ].tablet,
			) }${ headingFontSize[ 'font-size-h1' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );

		await expect( {
			selector: '.site-header .site-description',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h1' ].mobile,
			) }${ headingFontSize[ 'font-size-h1' ][ 'mobile-unit' ] }`,
		);
	} );
} );
