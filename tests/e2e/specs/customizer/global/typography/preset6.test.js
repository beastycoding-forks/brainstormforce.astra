import { createURL, createNewPost, setPostContent } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography settings in the customizer', () => {
	it( 'preset 6 settings should be applied correctly', async () => {
		const presetFont = {
			'body-font-family': "'Work Sans', sans-serif",
			'font-size-body': {
				desktop: '17',
				tablet: '20',
				mobile: '15',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( presetFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'preset6' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/preset6' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe( `${ presetFont[ 'body-font-family' ] }` );
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ presetFont[ 'body-font-weight' ] }` );
		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ presetFont[ 'body-text-transform' ] }` );
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ presetFont[ 'body-line-height' ] }` );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ presetFont[ 'font-size-body' ].desktop }${ presetFont[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].tablet }${ presetFont[ 'font-size-body' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].mobile }${ presetFont[ 'font-size-body' ][ 'mobile-unit' ] }` );
	} );

	it( 'heading style should be applied correctly', async () => {
		const globalTypographyPreset6 = {
			'headings-font-family': "'Barlow Semi Condensed,sans-serif'",
			'headings-font-weight': '600',
			'headings-text-transform': 'uppercase',
			'headings-line-height': '40px',
		};
		await setCustomize( globalTypographyPreset6 );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'preset6' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( 'preset6' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1, .entry-content h1' );
		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ globalTypographyPreset6[ 'headings-font-family' ] }` );
		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalTypographyPreset6[ 'headings-font-weight' ] }` );
		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalTypographyPreset6[ 'headings-text-transform' ] }` );
		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ globalTypographyPreset6[ 'headings-line-height' ] }` );
	} );
} );