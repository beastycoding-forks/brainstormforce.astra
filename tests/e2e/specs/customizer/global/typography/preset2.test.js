import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography preset-2 style in the customizer', () => {
	it( 'body styling should be applied correctly', async () => {
		const globaltypographyPreset2 = {
			'typography-presets': 'Preset2',
			'body-font-family': "'Lora,serif'",
			'body-font-weight': '400',
			'body-text-transform': 'capitalize',
			'body-line-height': '25px',
			'font-size-body': {
				desktop: '16',
				tablet: '16',
				mobile: '16',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};

		await setCustomize( globaltypographyPreset2 );

		await createNewPost( { postType: 'post', title: 'preset2' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset2' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe(
			`${ globaltypographyPreset2[ 'body-font-family' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'body-font-weight' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'body-text-transform' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'body-line-height' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ globaltypographyPreset2[ 'font-size-body' ].desktop }${ globaltypographyPreset2[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'font-size-body' ].tablet }${ globaltypographyPreset2[ 'font-size-body' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'font-size-body' ].mobile }${ globaltypographyPreset2[ 'font-size-body' ][ 'mobile-unit' ] }`,
		);
	} );
	it( 'heading style should be applied correctly', async () => {
		const globaltypographyPreset = {
			'headings-font-family': "'Lato,sans-serif'",
			'headings-font-weight': '700',
			'headings-text-transform': 'capitalize',
			'headings-line-height': '20px',
		};

		await setCustomize( globaltypographyPreset );

		await createNewPost( { postType: 'post', title: 'preset2' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset2' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1, .entry-content h1' );
		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ globaltypographyPreset[ 'headings-font-family' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ globaltypographyPreset[ 'headings-font-weight' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ globaltypographyPreset[ 'headings-text-transform' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ globaltypographyPreset[ 'headings-line-height' ] }`,
		);
	} );
} );
