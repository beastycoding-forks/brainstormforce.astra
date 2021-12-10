import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography preset 1 settings in the customizer', () => {
	it( 'body font style for preset 1 should be applied correctly', async () => {
		const globalTypographyPreset1 = {
			'typography-presets': 'Preset1',
			'body-font-family': "'Open Sans,sans-serif'",
			'body-font-weight': '400',
			'body-text-transform': 'uppercase',
			'body-line-height': '25px',
			'font-size-body': {
				desktop: '30',
				tablet: '20',
				mobile: '16',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};

		await setCustomize( globalTypographyPreset1 );

		await createNewPost( { postType: 'post', title: 'preset1' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe(
			`${ globalTypographyPreset1[ 'body-font-family' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'body-font-weight' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'body-text-transform' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'body-line-height' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ globalTypographyPreset1[ 'font-size-body' ].desktop }${ globalTypographyPreset1[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'font-size-body' ].tablet }${ globalTypographyPreset1[ 'font-size-body' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'font-size-body' ].mobile }${ globalTypographyPreset1[ 'font-size-body' ][ 'mobile-unit' ] }`,
		);
	} );
	it( 'heading font style for preset 1 should be applied correctly', async () => {
		const globalTypographyPreset1 = {
			'headings-font-family': "'Playfair Display,Georgia,serif'",
			'headings-font-weight': '700',
			'headings-text-transform': 'none',
			'headings-line-height': '45px',
		};
		await setCustomize( globalTypographyPreset1 );

		await createNewPost( { postType: 'post', title: 'preset1' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-content h1' );
		await expect( {
			selector: '.entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'headings-font-family' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'headings-font-weight' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'headings-text-transform' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ globalTypographyPreset1[ 'headings-line-height' ] }`,
		);
	} );
} );
