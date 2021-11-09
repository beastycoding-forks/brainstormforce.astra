import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';

describe( 'Global heading settings in the customizer', () => {
	it( 'heading font settings should be applied correctly', async () => {
		const globaltypographyPreset1 = {
			'body-font-family': "'Open Sans', sans-serif",
			'body-font-variant': '400',
			'body-font-weight': '400',
			'body-text-transform': 'default',
			'body-line-height': 1.7,
			'para-margin-bottom': 1.68,
			'headings-font-family': 'Playfair Display, Georgia, serif',
			'headings-font-variant': '700',
			'headings-font-weight': '700',
			'headings-text-transform': 'Inherit',
			'headings-line-height': '1.2px',
			'line-height-h1': '1.2px',
			'font-family-h1': 'Inherit, Helvetica, Arial, sans-serif',
			'font-weight-h1': '800',
			'text-transform-h1': 'uppercase',
			'line-height-h2': 1.2,
			'line-height-h3': 1.4,
			'line-height-h4': 1.2,
			'line-height-h5': 1.2,
			'line-height-h6': 1.2,
			'font-size-body': {
				desktop: '16',
				tablet: '16',
				mobile: '16',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};

		await setCustomize( globaltypographyPreset1 );

		await createNewPost( { postType: 'post', title: 'preset1' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-content' );

		await expect( {
			selector: '.entry-content p',
			property: 'font-size',
		} ).cssValueToBe(
			`${ globaltypographyPreset1[ 'font-size-body' ].desktop }${ globaltypographyPreset1[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.entry-content p',
			property: 'font-family',
		} ).cssValueToBe( `${ globaltypographyPreset1[ 'body-font-family' ] }` );
	} );

	it( 'body typography and heading typography combinations for site title', async () => {
		const globalTypegraphy = {
			'body-font-family': "'Open Sans', sans-serif",
			'body-font-weight': '400',
			'headings-font-family': 'inherit',
			'headings-font-weight': '400',
		};

		await setCustomize( globalTypegraphy );
		await page.goto( createURL( 'preset1' ), { waitUntil: 'networkidle0' } );
		await page.waitForSelector( '.entry-content' );

		await expect( {
			selector: '.site-title a',
			property: 'font-family',
		} ).cssValueToBe( `${ globalTypegraphy[ 'body-font-family' ] }` );
	} );
} );
