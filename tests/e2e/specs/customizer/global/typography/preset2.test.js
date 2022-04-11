import {
	createURL,
	createNewPost,
	setPostContent,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography preset-2 style in the customizer', () => {
	it( 'body styling should be applied correctly', async () => {
		const globalTypographyPreset2 = {
			'typography-presets': 'Preset2',
			'body-font-family': "'Lora,serif'",
			'body-font-weight': '400',
			'body-text-transform': 'capitalize',
			'body-line-height': '25px',
			'font-size-body': {
				desktop: '16',
				tablet: '15',
				mobile: '10',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};

		await setCustomize( globalTypographyPreset2 );

		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'preset2' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( 'preset2' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe(
			`${ globalTypographyPreset2[ 'body-font-family' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalTypographyPreset2[ 'body-font-weight' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalTypographyPreset2[ 'body-text-transform' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ globalTypographyPreset2[ 'body-line-height' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ globalTypographyPreset2[ 'font-size-body' ].desktop }${ globalTypographyPreset2[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ globalTypographyPreset2[ 'font-size-body' ].tablet }${ globalTypographyPreset2[ 'font-size-body' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ globalTypographyPreset2[ 'font-size-body' ].mobile }${ globalTypographyPreset2[ 'font-size-body' ][ 'mobile-unit' ] }`,
		);
	} );
	it( 'heading style should be applied correctly', async () => {
		const globalTypographyPreset = {
			'headings-font-family': "'Lato,sans-serif'",
			'headings-font-weight': '700',
			'headings-text-transform': 'capitalize',
			'headings-line-height': '20px',
		};

		await setCustomize( globalTypographyPreset );

		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'preset2' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( 'preset2' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1, .entry-content h1' );
		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ globalTypographyPreset[ 'headings-font-family' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ globalTypographyPreset[ 'headings-font-weight' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ globalTypographyPreset[ 'headings-text-transform' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ globalTypographyPreset[ 'headings-line-height' ] }`,
		);
	} );
} );
