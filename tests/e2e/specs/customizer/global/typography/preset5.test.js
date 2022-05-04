import { createURL, createNewPost, setPostContent } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography preset-5 style in the customizer', () => {
	it( 'body style should be applied correctly', async () => {
		const globalTypographyPreset5 = {
			'typography-presets': 'Preset5',
			'body-font-family': "'Roboto,sans-serif'",
			'body-font-weight': '400',
			'body-text-transform': 'lowercase',
			'body-line-height': '25px',
			'font-size-body': {
				desktop: '17',
				tablet: '20',
				mobile: '15',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( globalTypographyPreset5 );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'preset-5' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/preset-5' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe( `${ globalTypographyPreset5[ 'body-font-family' ] }` );
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalTypographyPreset5[ 'body-font-weight' ] }` );
		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalTypographyPreset5[ 'body-text-transform' ] }` );
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ globalTypographyPreset5[ 'body-line-height' ] }` );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ globalTypographyPreset5[ 'font-size-body' ].desktop }${ globalTypographyPreset5[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ globalTypographyPreset5[ 'font-size-body' ].tablet }${ globalTypographyPreset5[ 'font-size-body' ][ 'tablet-unit' ] }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ globalTypographyPreset5[ 'font-size-body' ].mobile }${ globalTypographyPreset5[ 'font-size-body' ][ 'mobile-unit' ] }`,
		);
	} );

	it( 'heading style should be applied correctly', async () => {
		const globalTypographyPreset5 = {
			'headings-font-family': "'Barlow Semi Condensed,sans-serif'",
			'headings-font-weight': '600',
			'headings-text-transform': 'uppercase',
			'headings-line-height': '40px',
		};
		await setCustomize( globalTypographyPreset5 );
		await page.goto( createURL( 'preset-5' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6' );
		await expect( {
			selector: 'h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'font-family',
		} ).cssValueToBe( `${ globalTypographyPreset5[ 'headings-font-family' ] }` );
		await expect( {
			selector: 'h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalTypographyPreset5[ 'headings-font-weight' ] }` );
		await expect( {
			selector: 'h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalTypographyPreset5[ 'headings-text-transform' ] }` );
		await expect( {
			selector: 'h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'line-height',
		} ).cssValueToBe( `${ globalTypographyPreset5[ 'headings-line-height' ] }` );
	} );
} );
