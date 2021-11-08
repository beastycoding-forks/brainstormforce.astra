import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { createNewPost, createURL, publishPost } from '@wordpress/e2e-test-utils';
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
		await createNewPost( {
			postType: 'post',
			title: 'heading-test',
			content: 'Heading Font Size',
		} );
		await publishPost();

		await page.goto( createURL( 'heading-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1, .entry-content h1' );
		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ headingFontSize[ 'font-size-h1' ].desktop }${ headingFontSize[ 'font-size-h1' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );

		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize[ headingFontSize[ 'font-size-h1' ].tablet ] }) }${ headingFontSize[ 'font-size-h1' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );

		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h1' ].mobile,
			) }${ headingFontSize[ 'font-size-h1' ][ 'mobile-unit' ] }`,
		);
	} );
} );
